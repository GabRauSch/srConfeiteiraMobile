import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from '../styles/screen.Home';
import Card from "../components/Card";
import { HorizontalLine } from "../components/HorizontalLine";
import { User } from "../types/User";
import { RootState } from "../store";
import { connect } from "react-redux";
import { getAnalytics } from "../services/Analytics";
import { FormatTransform, formatTransform } from "../util/transform";
import { Order } from "../types/Order";
import { getAllOrdersByUserId } from "../services/Orders";
import { OrderPayments } from "../types/OrderPayments";
import { deletePayments, getByOrderId, getByUserId } from "../services/OrderPayments";
import { formatDate } from "date-fns";

type overViewData = {
    id: string,
    title: string,
    value: any,
    format: FormatTransform
}

type Props = {
    user: User,
    orders: Order[],
    payments: OrderPayments[]
}
type OrdersFormated = {
    count: number, 
    pending: number, 
    completed: number, 
    day: string
}

type Payments= {
    id: number, 
    name: string,
    dueDate: Date,
    value: number
}

const HomeScreen = ({ user, orders, payments }: Props) => {
    const [data, setData] = useState<overViewData[]>([]);
    const [loading, setLoading] = useState(true); 
    const [ordersList, setOrdersList] = useState<OrdersFormated[]>([]);
    const [paymentsList, setPaymentsList ] = useState([])

    useEffect(() => {
        console.log('payment', payments)
        const fetchData = async () => {
            try {
                const analytics = await getAnalytics(user.id);
                if (analytics.status === 200) setData(analytics.data);

                if(orders.length == 0){
                    const result = await getAllOrdersByUserId(user.id);
                    if(result.status !== 200) return 
                    const formattedOrders = formatOrders(result.data);
                    setOrdersList(formattedOrders)
                }

                if(payments.length == 0){
                    const payments = await getByUserId(user.id)
                    console.log('response', payments.data)
                    if(payments.status !== 200) return
                    setPaymentsList(payments.data); 
                }

            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [user.id]);

    useEffect(()=>{
        if(orders.length !== 0) setOrdersList(formatOrders(orders));
    }, [orders])


    const getDayDescription = (date: Date): string => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
    
        if (isSameDay(date, today)) {
            return 'Hoje';
        } else if (isSameDay(date, tomorrow)) {
            return 'Amanhã';
        } else if (date < today) {
            return 'Atrasado';
        } else {
            return date.toLocaleDateString('pt-BR');
        }
    };

    const isSameDay = (date1: Date, date2: Date): boolean => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };

    const formatOrders = (orders: Order[]): { count: number, pending: number, completed: number, day: string }[] => {
        const formattedOrders: { [day: string]: { count: number, pending: number, completed: number } } = {};
    
        orders.forEach(order => {
            const deliveryDay = new Date(order.deliveryDay);
            const day = getDayDescription(deliveryDay);
    
            if (!formattedOrders[day]) {
                formattedOrders[day] = {
                    count: 0,
                    pending: 0,
                    completed: 0
                };
            }
    
            formattedOrders[day].count++;
    
            if (order.status === 0) {
                formattedOrders[day].pending++;
            } else if (order.status === 1) {
                formattedOrders[day].completed++;
            }
        });
        const result = Object.keys(formattedOrders).map(day => ({
            count: formattedOrders[day].count,
            pending: formattedOrders[day].pending,
            completed: formattedOrders[day].completed,
            day
        }));
    
        return result;
    };
    

    const renderItem = ({ item }: { item: overViewData }) => (
        <Card title={item.title} value={formatTransform(item.value, item.format)}>
            <></>
        </Card>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.page}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.page}>
            <Text style={styles.title}>Próximos Pedidos</Text>
            <ScrollView horizontal={true} style={styles.daysDisplay}>
                <View style={styles.daysView}>
                {ordersList.map((el, key) => {
                    const orderComponents = [];

                    for (let i = 0; i < el.completed; i++) {
                        orderComponents.push(<View style={[styles.order, styles.finished]} key={`finished-${i}`} />);
                    }
                    for (let i = 0; i < el.pending; i++) {
                        orderComponents.push(<View style={[styles.order, styles.pendent]} key={`pending-${i}`} />);
                    }

                    return (
                        <View style={[styles.day, {borderLeftColor: el.day == 'Atrasado' ? '#c00' : '#fbfbfb'}]} key={key}>
                            <Text>{el.count} pedidos</Text>
                            <View style={styles.ordersArea}>
                                {orderComponents}
                            </View>
                            <Text style={styles.dayName}>{el.day}</Text>
                        </View>
                    );
                })}
                    
                </View>
            </ScrollView>
            <HorizontalLine />
            <View>
                <Text style={styles.title}>Resultados do mês</Text>
                <View style={styles.cardsDisplay}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.cardsDisplay}
                    />
                </View>
            </View>
            <HorizontalLine />
            <View>
                <Text style={styles.title}>Pagamentos pendentes</Text>
                <View style={styles.paymentsList}>
                    <View style={styles.orderPayment}>
                        <Text style={{flex: 2, textAlign: 'center'}}>Cliente</Text>
                        <Text style={{flex: 1, textAlign: 'center'}}>Data</Text>
                        <Text style={{flex: 1, textAlign: 'center'}}>Valor</Text>
                    </View>
                    {paymentsList.map((el: Payments, key)=>(
                        <View key={key} style={[styles.orderPayment, {borderLeftWidth: el.dueDate < new Date() ? 0 : 5}]}>
                            <Text style={{textAlign: 'center', flex: 2}}>{el.name}</Text>
                            <Text style={{textAlign: 'center', flex: 1}}>{formatDate(el.dueDate, 'dd/MM/yy')}</Text>
                            <Text style={{textAlign: 'center', flex: 1}}>R${el.value.toFixed(2).replace('.',',')}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
    orders: state.ordersReducer.orders,
    payments: state.paymentsReducer.payments
});

export default connect(mapStateToProps)(HomeScreen);
