import { Image, Text, TextInput, View } from "react-native";
import { styles } from "../styles/screen.OrderItem";
import { HorizontalLine } from "../components/HorizontalLine";
import Icon from "react-native-vector-icons/FontAwesome";
import RoundCheckBox from "../components/RoundCheckBox";
import { ProgressBar } from "react-native-paper";
import { COLORS } from "../styles/global";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OrderItems } from "../types/OrderItem";
import { getByOrderId } from "../services/OrderItems";

const OrderItem = () => {
    const [status, setStatus] = useState<any>([]);
    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
    const [orderData, setOrderData] = useState<any>();
    const [concludedCount, setConcludedCount] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const route = useRoute();
    const {id} = route.params as any;
    const navigate = useNavigation() as any

    useEffect(()=>{
        // if(!id) return navigate.navigate('orders')
        const handleGetData = async ()=>{
            const data = await getByOrderId(id);
            setOrderData(data);
            setOrderItems(data.items)
            
            const statusArray = data.items.map((el: any) => el.finished);
            setStatus(statusArray);
            
            const percentage = statusArray.filter((status: any) => status).length / statusArray.length * 100;
            setPercentage(percentage);
        }
        handleGetData()        
    }, [])

    return (
        <View style={styles.page}>
            <Text style={styles.save}>Salvar</Text>
            <View style={styles.orderInfo}>
                <Text style={styles.orderInfoText}>Cliente: {orderData.clientName}</Text>
                <Text>Progresso: {percentage*100}% ({status.filter((status: number)=>status == 1).length}/{status.length})</Text>
                <Text>Valor total: R${orderData.totalValue.toFixed(2).replace('.', ',')}</Text>
                <ProgressBar progress={percentage} color={COLORS.primary} style={{borderRadius: 10, height: 7}}/>
                <View style={styles.finishOrderArea}>
                    <Text style={{...styles.orderInfoStatus, color: COLORS.primary}}>Status: Aberto</Text>
                    <Text style={styles.finishOrder}>Concluir pedido</Text>
                </View>
            </View>
            <HorizontalLine />
            {['Pendentes', 'Concluídos'].map((section, key)=>(
                <View key={key}>
                    <Text style={styles.separator}>{section} ↆ</Text>
                    <View style={styles.orders} >
                        {orderItems.filter((product: any)=>product.finished == key).map((item: any, key: number)=>(
                            <View style={styles.order} key={key}>
                                    <Text>{item.quantity} un.</Text> 
                                    <Text style={styles.orderTitle}>{item.productName}</Text>
                                    <Text>R${(item.value * item.quantity).toFixed(2).replace('.', ',')}</Text>
                                    <RoundCheckBox active={item.finished} onCheck={()=>{}} />
                                    <Icon name="ellipsis-v" size={15} color={'#555'} />
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
};


export default OrderItem