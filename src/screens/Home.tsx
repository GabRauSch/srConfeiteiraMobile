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
import { COLORS } from "../styles/global";
import { Product } from "../types/Product";
import { Client } from "../types/Client";
import useOrders from "../hooks/useOrders";
import { useProducts } from "../hooks/useProducts";
import usePayments from "../hooks/usePayments";
import useClients from "../hooks/useClients";
import LoadingPage from "../components/LoadingPage";
import { mapOrderStatus } from "../util/mappers";

type overViewData = {
    id: string,
    title: string,
    value: any,
    format: FormatTransform,
    displayColor: string
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


type Props = {
    user: User,
    vision: boolean
}

const HomeScreen = ({ user, vision}: Props) => {
    const [data, setData] = useState<overViewData[]>([]);
    const [dataDisplay, setDataDisplay] = useState<overViewData[]>([]);
    const [loading, setLoading] = useState(true); 
    const [ordersList, setOrdersList] = useState<OrdersFormated[]>([]);
    const [paymentsList, setPaymentsList ] = useState([]);

    const orders = useOrders(user.id);
    const payments = usePayments(user.id);
    const products = useProducts(user.id);
    const clients = useClients(user.id)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const analytics = await getAnalytics(user.id);
                if (analytics.status === 200) {
                    setData(analytics.data);
                    setDataDisplay(analytics.data)
                };

                if(orders.length == 0){
                    const result = await getAllOrdersByUserId(user.id);
                    if(result.status !== 200) return 
                    const formattedOrders = formatOrders(result.data);
                    setOrdersList(formattedOrders)
                }

                if(payments.length == 0){
                    const payments = await getByUserId(user.id)
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
    }, [user.id, orders, products, clients]);

    useEffect(()=>{
        if(orders.length !== 0) setOrdersList(formatOrders(orders));
    }, [orders])

    useEffect(()=>{
        if(!vision){
            console.log(vision)
            setDataDisplay(data.map(el=>({...el, value: '-'})))
        } else{
            setDataDisplay(data)
        }
    }, [vision])

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
    
            if (order.status <= mapOrderStatus('open')) {
                formattedOrders[day].pending++;
            } else if (order.status >= mapOrderStatus('finished')) {
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

    if (loading) {
        return (
            <LoadingPage />
        );
      }

    const renderItem = ({ item }: { item: overViewData }) => (
        <Card title={item.title} value={formatTransform(item.value, item.format)} color={COLORS[item.displayColor]}>
            <></>
        </Card>
    );

    return (
        <SafeAreaView style={styles.page}>
            <Text style={styles.title}>Próximos Pedidos</Text>
            <ScrollView horizontal={true} style={styles.daysDisplay}>
                <View style={styles.daysView}>
                {ordersList.length > 0 ? (
                    ordersList.map((el, key) => {
                        const orderComponents: any[] = [];

                        for (let i = 0; i < Math.min(4, el.completed); i++) {
                            orderComponents.push(<View style={[styles.order, styles.finished]} key={`finished-${i}`} />);
                        }
                        for (let i = 0; i < Math.min(4, el.pending); i++) {
                            orderComponents.push(<View style={[styles.order, styles.pendent]} key={`pending-${i}`} />);
                        }
    
                        return (
                            <View style={[styles.day, {borderLeftColor: el.day == 'Atrasado' ? '#c00' : '#fbfbfb'}]} key={key}>
                                <Text style={{fontSize: 12}}>{el.count} pedidos</Text>
                                <View style={styles.ordersArea}>
                                    {orderComponents.slice(0, 8)}
                                </View>
                                <Text style={styles.dayName}>{el.day}</Text>
                            </View>
                        );
                    })
                ) : (
                    <Text style={{color: COLORS.grayScaleSecondary}}>Nenhum pedido</Text>
                )}
                    
                </View>
            </ScrollView>
            <HorizontalLine />
            <View>
                <Text style={styles.title}>Resultados do mês</Text>
                <View style={styles.cardsDisplay}>

                    <FlatList
                        data={dataDisplay}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={3}
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
                    {paymentsList.length > 0 ? (
                        paymentsList.map((el: Payments, key)=>(
                            <View key={key} style={[styles.orderPayment, {borderLeftWidth: el.dueDate < new Date() ? 0 : 5}]}>
                                <Text style={{textAlign: 'center', flex: 2}}>{el.name}</Text>
                                <Text style={{textAlign: 'center', flex: 1}}>{formatDate(el.dueDate, 'dd/MM/yy')}</Text>
                                <Text style={{textAlign: 'center', flex: 1}}>R${el.value.toFixed(2).replace('.',',')}</Text>
                            </View>
                        ))
                    ) : (
                        <View style={styles.orderPayment}>
                            <Text style={{textAlign: 'center', flex: 1, color: COLORS.grayScaleSecondary, fontStyle: 'italic'}}>Nenhum pagamento pendente</Text>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
    vision: state.visionReducer.vision
});

export default connect(mapStateToProps)(HomeScreen);
