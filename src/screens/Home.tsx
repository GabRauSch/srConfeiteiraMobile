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

type overViewData = {
    id: string,
    title: string,
    value: any,
    format: FormatTransform
}

type Props = {
    user: User,
    orders: Order[]
}
type OrdersFormated = {
    count: number, 
    pending: number, 
    completed: number, 
    day: string
}

const HomeScreen = ({ user, orders }: Props) => {
    const [data, setData] = useState<overViewData[]>([]);
    const [loading, setLoading] = useState(true); 
    const [ordersList, setOrdersList] = useState<OrdersFormated[]>([])

    useEffect(() => {
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
                    <View style={styles.orderPayment}>
                        <Text style={{textAlign: 'center', flex: 2}}>Julia Lancelote</Text>
                        <Text style={{textAlign: 'center', flex: 1}}>12/05/2023</Text>
                        <Text style={{textAlign: 'center', flex: 1}}>R$90,00</Text>
                    </View>
                    <View style={styles.orderPayment}>
                        <Text style={{textAlign: 'center', flex: 2}}>Julia Mesquita</Text>
                        <Text style={{textAlign: 'center', flex: 1}}>12/05/2023</Text>
                        <Text style={{textAlign: 'center', flex: 1}}>R$90,00</Text>
                    </View>
                    <View style={styles.orderPayment}>
                        <Text style={{textAlign: 'center', flex: 2}}>Alfredo Lancelote</Text>
                        <Text style={{textAlign: 'center', flex: 1}}>12/05/2023</Text>
                        <Text style={{textAlign: 'center', flex: 1}}>R$90,00</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
    orders: state.ordersReducer.orders
});

export default connect(mapStateToProps)(HomeScreen);
