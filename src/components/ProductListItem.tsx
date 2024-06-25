import { Modal, ScrollView, Text, TextInput, TouchableHighlight, TouchableHighlightBase, View } from "react-native"
import {styles} from '../styles/screen.NewProduct'
import { useEffect, useState } from "react"
import { COLORS, MODAL } from "../styles/global";
import Icon from 'react-native-vector-icons/FontAwesome';
import NumberSetter from "./NumberSetter"


type Props = {
    name: string,
    price: number,
    removeItem: ()=>void,
    confirmItem?: ()=>void,
    setProductQuantity: (quantity: number)=>void,
    confirm?: boolean
}

const ProductListItem = ({name, price, removeItem, confirmItem, setProductQuantity, confirm}: Props)=>{
    const [quantity, setQuantity] = useState(1);
    
    const handleQuantity = (quantity: number)=>{
        setQuantity(quantity);
        setProductQuantity(quantity)
    }


    return (
        <View style={styles.product}>
            <View>
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.productValue}>R${(price * quantity).toFixed(2).replace('.', ',')}</Text>
            </View>
            <View style={styles.actions}>
               <NumberSetter quantity={quantity} handleQuantity={handleQuantity} />
                <View style={styles.activationButtons}>
                    <Icon name="remove" size={25} color={COLORS.primary} onPress={removeItem}/>
                    {(confirm && confirmItem) &&
                        <Icon name="check" size={25} color={'#7c2'} onPress={confirmItem}/>
                    }
                </View>
            </View>
        </View>
    )
}


export default ProductListItem