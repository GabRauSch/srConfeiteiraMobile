import { Image, Text, TextInput, View } from "react-native";
import { styles } from "../styles/screen.OrderItem";
import { HorizontalLine } from "../components/HorizontalLine";
import Icon from "react-native-vector-icons/FontAwesome";

import RoundCheckBox from "../components/RoundCheckBox";
import { ProgressBar } from "react-native-paper";
import { COLORS } from "../styles/global";
import { useState } from "react";

const OrderItem = () => {
    const bolo = require('../assets/images/bolo.png');
    const ordersItemProducts = [
        {quantity: 2, product: 'Bolo de Cenouro', productPrice: 25, status: 0},
        {quantity: 2, product: 'Bolo de Cenouro', productPrice: 25, status: 1},
        {quantity: 2, product: 'Bolo de Cenouro', productPrice: 10, status: 1},
        {quantity: 2, product: 'Bolo de Cenouro', productPrice: 15, status: 1},
        {quantity: 2, product: 'Bolo de Cenouro', productPrice: 35, status: 1},
    ]
    
    const [status, setStatus] = useState(Array.from(ordersItemProducts.map((el)=>el.status)))
    const percentage = status.filter(status=>status == 1).length/status.length

    return (
        <View style={styles.page}>
            <Text style={styles.save}>Salvar</Text>
            <View style={styles.orderInfo}>
                <Text style={styles.orderInfoTitle}>Pedido Nr. 44</Text>
                <Text style={styles.orderInfoText}>Cliente: Gláucio Barbosa</Text>
                <Text>Progresso: {percentage*100}% ({status.filter(status=>status == 1).length}/{status.length})</Text>
                <ProgressBar progress={percentage} color={COLORS.primary} style={{borderRadius: 10, height: 7}}/>
                <Text style={{...styles.orderInfoStatus, color: COLORS.primary}}>Status: Aberto</Text>
            </View>
            <HorizontalLine />
            {['Pendentes', 'Concluídos'].map((section, key)=>(
                <View key={key}>
                    <Text style={styles.separator}>{section} ↆ</Text>
                    <View style={styles.orders} >
                        {ordersItemProducts.filter((product)=>product.status == key).map((item, key)=>(
                                <View style={styles.order} key={key}>
                                        <Text>2 un.</Text> 
                                        <Text style={styles.orderTitle}>{item.product}</Text>
                                        <Text>R${(item.productPrice * item.quantity).toFixed(2).replace('.', ',')}</Text>
                                        <RoundCheckBox active={item.status} />
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