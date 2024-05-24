import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../styles/screen.Orders";
import { HorizontalLine } from "../components/HorizontalLine";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Order, statusList } from "../types/Order";
import { formatDate, getTimeStringFromDate, getUniqueCategories, getUniqueData, getUniqueDaysFrom } from "../util/transform";
import { orderAggregated } from "../types/OrderAgreggated";
import { RootState } from "../store";
import { Dispatch } from "redux";
import { toggleVision } from "../reducers/visionReducer";
import { connect } from 'react-redux';
import { User } from "../types/User";
import { setOrders } from "../reducers/ordersReducer";
import { getAllOrdersByUserId } from "../services/Orders";
import { Product } from "../types/Product";
import { COLORS } from "../styles/global";


type Props = {
    vision: boolean,
    user: User,
    orders: Order[],
    setOrdersAction: (payload: any)=>void
}

const OrdersScreen = ({vision, user, orders, setOrdersAction}: Props)=>{
    const status = ["Abertos", "Entregues", "Recebidos"]
    const options = ["Todas", ...status, 'mais'];
    const [selectedStatus, setSelectedCategory] = useState<number>(1); 
    const [activeKey, setActiveKey] = useState(0);
    const [createOptionsDisplay, setCreateOptionsDisplay] = useState(false);
    const [ordersList, setOrdersList] = useState<Order[]>([]);
    const [days, setDays] = useState<any[]>([])

    useEffect(()=>{
        const handleGetData = async ()=>{
            const orders = await getAllOrdersByUserId(user.id as number);
            console.log(orders)
            setDays(getUniqueDaysFrom(orders, 'deliveryDay'));
            setOrdersList(orders);

            setOrdersAction(orders);            
        };
        handleGetData();
    }, [user.id])

    useEffect(()=>{
        setOrdersList(orders);
    }, [orders])
    
    const navigate = useNavigation() as any;

    const filteredStatus = selectedStatus 
        ? statusList.filter(status => status === selectedStatus) 
        : statusList;

    const handleStatusSelect = (option: string, key: number)=>{
        // if(option === 'mais') return navigate.navigate('listCategories')
        setSelectedCategory(option === "Todas" ? 0 : key -1);
        setActiveKey(key);
    }

    const handleNavigate = (url: string)=>{
        navigate.navigate(url) 
    }

    
    return (
        <ScrollView>
            {days.map((day: any, Dkey)=>(
                <React.Fragment key={Dkey}>
                    <Text style={{...styles.separator, 
                        color: day == 'em atraso' ? 'red' : COLORS.primary 
                    }}>Entrega {day}:</Text>
                    <View style={styles.ordersDisplay}>
                        {vision ? (
                            orderAggregated.filter(order=>order.deliveryString == day).map((agg, Akey)=>(
                                <TouchableOpacity style={styles.order} key={Akey} onPress={()=>handleNavigate('order')}>
                                    <View style={[styles.labelOrder, agg.status != 1 ? styles.closedOrder : styles.openOrder]}></View>
                                    <Text style={styles.name} onPress={()=>{console.log(vision)}}>{agg.productCategory}</Text>
                                    <View style={styles.unitsDisplay}>
                                        <View style={styles.listItem}>
                                            <Text style={styles.listItemText}>{agg.amount} unidades</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>  
                            ))) : (
                                ordersList.filter(order=> formatDate(order.deliveryDay) == day).slice(0, 2)
                                    .map((item, key)=>(

                                <TouchableOpacity 
                                    style={{...styles.order, backgroundColor: item.delay ? '#b00' : 'white'}} key={key} 
                                    onPress={()=>handleNavigate('ordersByProductCategory')}
                                >
                                    <View style={[styles.labelOrder, item.status != 1 ? styles.closedOrder : styles.openOrder]}></View>
                                    <Text style={{...styles.name, color: item.delay ? 'white' : 'black'}}>{item.client}</Text>
                                    <View style={styles.orderList}>
                                        {item.products.slice(0,3).map((product, Pkey)=>(
                                            <View style={styles.listItem} key={Pkey}>
                                                <Text style={styles.bullet}>-</Text>
                                                <Text style={styles.listItemText}>{product}</Text>
                                            </View>
                                        ))}
                                        {item.products.length > 3 ? (
                                            <View style={styles.listItem}>
                                                <Text style={styles.listItemText}>...</Text>
                                            </View>
                                        ) : null}
                                    </View>
                                    <Text style={{...styles.time, color: item.delay ? 'white' : 'black'}}>Entrega {getTimeStringFromDate(item.deliveryDay)}</Text>
                                    <HorizontalLine />
                                    <Text style={{...styles.price, color: item.delay ? 'white' : 'black'}}>R${item.value.toFixed(2).replace('.',',')}</Text>
                                </TouchableOpacity>
                            )))}
                    </View>
                </React.Fragment>
                ))}
        </ScrollView>
    )
}

const mapStateToProps = (state: RootState) => ({
    vision: state.visionReducer.vision,
    user: state.userReducer.user,
    orders: state.ordersReducer.orders
  });
  
const mapDispatchToProps = (dispatch: Dispatch)=>({
    setOrdersAction: (payload: any)=>dispatch(setOrders(payload))
})  

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);
