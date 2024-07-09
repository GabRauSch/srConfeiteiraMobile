import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../styles/screen.Orders";
import { HorizontalLine } from "../components/HorizontalLine";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Order } from "../types/Order";
import { formatDate as formateDateFun, getTimeStringFromDate, getUniqueCategories, getUniqueData, getUniqueDaysFrom } from "../util/transform";
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
import { formatDate } from "date-fns";
import useOrders from "../hooks/useOrders";
import LoadingPage from "../components/LoadingPage";
import { mapOrderStatus, mapStatusToText, orderStatus, OrderStatus, orderStatusValues, statusText } from "../util/mappers";

type Props = {
    vision: boolean,
    user: User,
    setOrdersAction: (payload: any)=>void
    setUserAction: (payload: any)=>void
}

const OrdersScreen = ({vision, user, setOrdersAction, setUserAction}: Props)=>{
    const options = [{id: -1, description: 'Pendentes'}, ...statusText.map((el, key)=>({id: key, description: el}))];
    const [selectedStatus, setSelectedStatus] = useState<{id: number, description: string}>({id: -1, description: 'Todos'}); 
    const [createOptionsDisplay, setCreateOptionsDisplay] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [orderAggregated, setOrderAggregated] = useState<OrderAggregated[]>([]);
    const [days, setDays] = useState<any[]>([]);
    const now = new Date().getTime();
    const [displayMode, setDisplayMode] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [noOrders, setNoOrders] = useState(false)

    const fetchedOrders = useOrders(user.id as number);

    useEffect(() => {
        
        const uniqueDays = getUniqueDaysFrom(fetchedOrders, 'deliveryDay')
        
        const noOrders = !uniqueDays.some(day => 
            fetchedOrders.some(order => (order.status === selectedStatus.id || selectedStatus.id === -1))
        );
        
        setNoOrders(noOrders)
        setDays(uniqueDays);
        setFilteredOrders(fetchedOrders)
        setOrderAggregated(aggregateOrdersByProduct(fetchedOrders))
    }, [fetchedOrders, setOrdersAction]);

    useEffect(()=>{
        setLoading(false);
    }, [fetchedOrders])

    const navigate = useNavigation() as any;

    const handleNavigate = (url: string, orderId: number)=>{
        navigate.navigate(url, {id: orderId}) 
    }
    const handleCategorySelect = (selected: any)=>{
        setSelectedStatus(selected);
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

    const handleSearch = (search: string)=>{
        const filteredOrders = fetchedOrders.filter((el)=>el.client.includes(search))
        setFilteredOrders(filteredOrders)
    }

    return (
        <>
        <SearchInput onChange={handleSearch} onSearch={()=>{}} onToggleVision={()=>setDisplayMode(!displayMode)}/>
        <View>
            <ScrollView horizontal={true} style={styles.options}
                showsHorizontalScrollIndicator={false}
                >
                {options.map((option, key) => (
                    <OptionItem
                        key={key}
                        option={option.description}
                        handleActive={() => {
                            handleCategorySelect(option);
                            console.log(option, selectedStatus)
                        }}
                        active={option.id == selectedStatus.id}
                    />
                ))}
            </ScrollView>
        </View>
        <HorizontalLine />
        <ScrollView style={styles.page}>
            {loading &&
                <LoadingPage />
            }

            {noOrders ? (
                <Text style={styles.messageNoRegister}>Sem pedidos</Text>
            ) : (
                days.map((day: any, Dkey)=>{    
                    console.log(day)    
                    return (
                        filteredOrders.some(order => {
                            return formateDateFun(order.deliveryDay) === day && (order.status === selectedStatus.id || selectedStatus.id === -1) && order.status !== mapOrderStatus('delivered')                        
                    }) && (
                    <React.Fragment key={Dkey}>
                        <Text style={{...styles.separator, 
                            color: day == 'em atraso' ? 'red' : COLORS.primary 
                        }}>Entrega {day}:</Text>
                        <View style={styles.ordersDisplay}>
                            {displayMode ? (
                                <View style={{width:'100%'}}>
                                    {
                                        orderAggregated.filter(order=>formateDateFun(order.deliveryDate) == day).map((agg, Akey)=>(
                                            <TouchableOpacity style={styles.orderAgg} key={Akey}>
                                                <View style={[styles.labelOrder, agg.status != mapOrderStatus('finished') ? styles.openOrder : styles.closedOrder]}></View>
                                                <Text style={styles.name}>{agg.name}</Text>
                                                <View style={styles.unitsDisplay}>
                                                    <View style={styles.listItem}>
                                                        <Text style={styles.listItemText}>{agg.amount} unidades</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.listItemText}>{formatDate(agg.deliveryDate, 'dd/MM/yyyy')}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>  
                                        ))
                                    }
                                </View>
                            ) : (
                                <ScrollView horizontal>
                                    {
                                        filteredOrders.filter(order=>{
                                            console.log('cu cuc cucuc cucucucucucucuc1', order, day)
                                            return  formateDateFun(order.deliveryDay) == day
                                        })
                                            .map((item, key)=>{ 
                                                console.log('order', item)
                                            return (item.status == selectedStatus.id || selectedStatus.id == -1) && (
                                                <TouchableOpacity 
                                                    style={{...styles.order, borderTopWidth: new Date(item.deliveryDay).getTime() < now ? 10 : 0}} key={key} 
                                                    onPress={()=>handleNavigate('order', item.orderId)}
                                                >
                                                    <View style={[styles.labelOrder, item.status != mapOrderStatus('open') ?  styles.closedOrder : styles.openOrder]}></View>
                                                    <Text  style={{...styles.name, color: new Date(item.deliveryDay).getTime() < now ? '#c00' : 'black'}}>
                                                        {item.client}
                                                    </Text>
                                                    <View style={styles.orderList}>
                                                        {item.products.slice(0,3).map((product, Pkey)=>(
                                                            <View style={styles.listItem} key={Pkey}>
                                                                <Text style={styles.bullet}>-</Text>
                                                                <Text style={styles.listItemText} numberOfLines={1}>{product.name}</Text>
                                                            </View>
                                                        ))}
                                                    </View>
                                                    <Text style={styles.time}>Entrega: {getTimeStringFromDate(item.deliveryDay)}</Text>
                                                    <HorizontalLine />
                                                    <Text style={styles.price}>R${item.value.toFixed(2).replace('.',',')}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </ScrollView>
                                    
                            )}
                        </View>
                    </React.Fragment>
                    )
                    )
                })
            )}
        </ScrollView>
        </>
    )
}

const mapStateToProps = (state: RootState) => ({
    vision: state.visionReducer.vision,
    user: state.userReducer.user,
  });
  
const mapDispatchToProps = (dispatch: Dispatch)=>({
    setOrdersAction: (payload: any)=>dispatch(setOrders(payload)),
    setUserAction: (payload: any)=>dispatch(setUser(payload))
})  

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);
