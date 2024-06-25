import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../styles/screen.Orders";
import { HorizontalLine } from "../components/HorizontalLine";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Order, statusList } from "../types/Order";
import { formatDate, getTimeStringFromDate, getUniqueCategories, getUniqueData, getUniqueDaysFrom } from "../util/transform";
import { OrderAggregated } from "../types/OrderAgreggated";
import { RootState } from "../store";
import { Dispatch } from "redux";
import { toggleVision } from "../reducers/visionReducer";
import { connect } from 'react-redux';
import { User } from "../types/User";
import { setOrders } from "../reducers/ordersReducer";
import { getAllOrdersByUserId } from "../services/Orders";
import { Product } from "../types/Product";
import { COLORS } from "../styles/global";
import SearchInput from "../components/SearchInput";
import OptionItem from "../components/OptionItem";
import { sortOrders } from "../util/sorter";
import { setUser } from "../reducers/userReducer";
import * as SecureStore from 'expo-secure-store';

type Props = {
    vision: boolean,
    user: User,
    orders: Order[],
    setOrdersAction: (payload: any)=>void
    setUserAction: (payload: any)=>void
}

const OrdersScreen = ({vision, user, orders, setOrdersAction, setUserAction}: Props)=>{
    const status = ["Abertos", "Entregues", "Recebidos"]
    const options = ["Todas", ...status, 'mais'];
    const [selectedStatus, setSelectedCategory] = useState<number>(1); 
    const [activeKey, setActiveKey] = useState(0);
    const [createOptionsDisplay, setCreateOptionsDisplay] = useState(false);
    const [ordersList, setOrdersList] = useState<Order[]>([]);
    const [orderAggregated, setOrderAggregated] = useState<OrderAggregated[]>([]);
    const [days, setDays] = useState<any[]>([]);
    const now = new Date();

    useEffect(()=>{
        const handleGetData = async ()=>{
            const {data: orders, status} = await getAllOrdersByUserId(user.id as number);
            console.log(orders, status)
            setDays(getUniqueDaysFrom(orders, 'deliveryDay'));
            setOrdersList(sortOrders(orders));
            const agg = aggregateOrdersByProduct(orders);
            setOrderAggregated(agg)

            setOrdersAction(orders);            
        };
        handleGetData();
    }, [user.id])

    useEffect(()=>{
        setDays(getUniqueDaysFrom(orders, 'deliveryDay'));
        setOrdersList(sortOrders(orders));
        setOrderAggregated(aggregateOrdersByProduct(orders))
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

    const handleNavigate = (url: string, orderId: number)=>{
        navigate.navigate(url, {id: orderId}) 
    }
    const handleCategorySelect = (option: string, key: number)=>{

    }

    const aggregateOrdersByProduct = (orders: Order[]): OrderAggregated[] => {
        const aggregated = orders.reduce((acc, order) => {
            order.products.forEach(product => {
                const key = `${product.name}-${new Date(order.deliveryDay).toISOString().split('T')[0]}`;
                
                if (!acc[key]) {
                    acc[key] = {
                        id: product.id,
                        name: product.name,
                        amount: product.quantity * order.value,
                        deliveryDate: order.deliveryDay,
                        status: order.status
                    };
                } else {
                    acc[key].amount += product.quantity * order.value;
                }
            });
            
            return acc;
        }, {} as { [key: string]: OrderAggregated });
    
        const agg = Object.values(aggregated);
        return agg
    };
    
    return (
        <>
        <SearchInput onChange={(value)=>{}} onSearch={()=>{}} allowToggleVision/>
        <View>
            <ScrollView horizontal={true} style={styles.options}
                showsHorizontalScrollIndicator={false}
                >
                {options.map((option, key) => (
                    <OptionItem
                    key={key}
                    option={option}
                    handleActive={() => {
                        handleCategorySelect(option, key);
                    }}
                    active={activeKey == key}
                    />
                ))}
            </ScrollView>
        </View>
        <ScrollView style={styles.page}>
            {ordersList.length == 0 && (
                <Text style={styles.messageNoRegister}>Sem pedidos</Text>
            )}
            {days.map((day: any, Dkey)=>(
                <React.Fragment key={Dkey}>
                    <Text style={{...styles.separator, 
                        color: day == 'em atraso' ? 'red' : COLORS.primary 
                    }}>Entrega {day}:</Text>
                    <ScrollView horizontal style={styles.ordersDisplay}>
                        
                        {vision ? (
                            orderAggregated.filter(order=>formatDate(order.deliveryDate) == day).map((agg, Akey)=>(
                                <TouchableOpacity style={styles.order} key={Akey}>
                                    <View style={[styles.labelOrder, agg.status != 1 ? styles.openOrder : styles.closedOrder]}></View>
                                    <Text style={styles.name} onPress={()=>{console.log(vision)}}>{agg.name}</Text>
                                    <View style={styles.unitsDisplay}>
                                        <View style={styles.listItem}>
                                            <Text style={styles.listItemText}>{agg.amount} unidades</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>  
                            ))) : (
                                ordersList.filter(order=> formatDate(order.deliveryDay) == day)
                                    .map((item, key)=>(

                                <TouchableOpacity 
                                    style={{...styles.order, borderTopWidth: new Date(item.deliveryDay) < now ? 10 : 0}} key={key} 
                                    onPress={()=>handleNavigate('order', item.orderId)}
                                >
                                    <View style={[styles.labelOrder, item.status != 1 ? styles.openOrder : styles.closedOrder]}></View>
                                    <Text  style={{...styles.name, color: new Date(item.deliveryDay) < now ? '#c00' : 'black'}}>{item.client}</Text>
                                    <View style={styles.orderList}>
                                        {item.products.slice(0,3).map((product, Pkey)=>(
                                            <View style={styles.listItem} key={Pkey}>
                                                <Text style={styles.bullet}>-</Text>
                                                <Text style={styles.listItemText} numberOfLines={1}>{product.name}</Text>
                                            </View>
                                        ))}
                                        {/* {item.products.length > 3 ? (
                                            <View style={styles.listItem}>
                                                <Text style={styles.listItemText}>...</Text>
                                            </View>
                                        ) : null} */}
                                    </View>
                                    <Text style={styles.time}>Entrega: {getTimeStringFromDate(item.deliveryDay)}</Text>
                                    <HorizontalLine />
                                    <Text style={styles.price}>R${item.value.toFixed(2).replace('.',',')}</Text>
                                </TouchableOpacity>
                            )))}
                    </ScrollView>
                </React.Fragment>
                ))}
        </ScrollView>
        </>
    )
}

const mapStateToProps = (state: RootState) => ({
    vision: state.visionReducer.vision,
    user: state.userReducer.user,
    orders: state.ordersReducer.orders
  });
  
const mapDispatchToProps = (dispatch: Dispatch)=>({
    setOrdersAction: (payload: any)=>dispatch(setOrders(payload)),
    setUserAction: (payload: any)=>dispatch(setUser(payload))
})  

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);