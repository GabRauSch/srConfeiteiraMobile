import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { styles } from "../styles/screen.Orders";
import SearchInput from "../components/SearchInput";
import OptionItem from "../components/OptionItem";
import { HorizontalLine } from "../components/HorizontalLine";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CreateOptions } from "../modals/CreateOptions";
import ChangeVisionButton from "../components/ChangeVisionButton";
import { ordersList, statusList } from "../types/Order";
import { getUniqueCategories, getUniqueData } from "../util/transform";
import useVision from "../hooks/useVision";

export const OrdersScreen = ()=>{
    const status = ["Abertos", "Entregues", "Recebidos"]
    const options = ["Todas", ...status, 'mais'];
    const [selectedStatus, setSelectedCategory] = useState<number>(1); 
    const [activeKey, setActiveKey] = useState(0);
    const [createOptionsDisplay, setCreateOptionsDisplay] = useState(false);
    const {vision, toggleVision} = useVision();
    
    const days = getUniqueData(ordersList, 'deliveryString');
    const navigate = useNavigation();

    const filteredStatus = selectedStatus 
        ? statusList.filter(status => status === selectedStatus) 
        : statusList;
    


    const handleStatusSelect = (option: string, key: number)=>{
        // if(option === 'mais') return navigate.navigate('listCategories')
        setSelectedCategory(option === "Todas" ? 0 : key -1);
        setActiveKey(key);
    }
    return (
        <ScrollView>
            {days.map((day: any, Dkey)=>(
                <React.Fragment key={Dkey}>
                <Text style={styles.separator}>{day}</Text>
                <View style={styles.ordersDisplay}>
                    {ordersList.filter(order=> order.deliveryString == day).slice(0, 2)
                        .map((item, key)=>(
                           <React.Fragment key={key}>
                                {vision ? (
                                <>
                                    <View style={styles.order}>
                                        <View style={[styles.openOrder, styles.labelOrder]}></View>
                                        <Text style={styles.name}>Docinhos</Text>
                                        <View style={styles.unitsDisplay}>
                                            <View style={styles.listItem}>
                                                <Text style={styles.listItemText}>50 unidades</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.order}>
                                        <View style={[styles.openOrder, styles.labelOrder]}></View>
                                        <Text style={styles.name}>Bolos</Text>
                                        <View style={styles.unitsDisplay}>
                                            <View style={styles.listItem}>
                                                <Text style={styles.listItemText}>50 unidades</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.order}>
                                        <View style={[styles.closedOrder, styles.labelOrder]}></View>
                                        <Text style={styles.name}>Pastéis</Text>
                                        <View style={styles.unitsDisplay}>
                                            <View style={styles.listItem}>
                                                <Text style={styles.listItemText}>50 unidades</Text>
                                            </View>
                                        </View>
                                    </View>
                                </>    
                            ) : (
                                <View style={styles.order} key={key}>
                                    <View style={[styles.labelOrder, item.status != 1 ? styles.closedOrder : styles.openOrder]}></View>
                                    <Text style={styles.name}>{item.client}</Text>
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
                                    <Text style={styles.time}>Entregue em 12 horas</Text>
                                    <HorizontalLine />
                                    <Text style={styles.price}>R${item.value.toFixed(2).replace('.',',')}</Text>
                                </View>
                            )}
                           </React.Fragment> 
                        ))}
                </View>
                </React.Fragment>
                ))}
        </ScrollView>
    )
}