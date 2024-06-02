import { Modal, ScrollView, Text, TextInput, TouchableHighlight, TouchableHighlightBase, View } from "react-native"
import {styles} from '../styles/screen.NewProduct'
import { useEffect, useState } from "react"
import InputPicker from "../components/InputPicker"
import CreateButton from "../components/CreateButton"
import useMessage from "../hooks/useMessage"
import Message from "../modals/Message"
import { RootState } from "../store"
import { User } from "../types/User"
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Dispatch } from "redux"
import { validateClientCreate, validateOrderCreate, validateProductCreate } from "../util/validation"
import { createClient, getAllClientsByUserId } from "../services/Clients"
import { Client } from "../types/Client"
import { newClient } from "../reducers/clientsReducer"
import { COLORS, MODAL } from "../styles/global"

type Props = {
    name: string,
    price: number,
    removeItem: ()=>void
    changeProductQuantity: (increase: boolean)=>void,
    setProductQuantity: (quantity: number)=>void
}

const ProductListItem = ({name, price, removeItem, changeProductQuantity, setProductQuantity}: Props)=>{
    const [quantity, setQuantity] = useState(1);
    const handleDecrease = ()=>{
        if(quantity > 1){
            setQuantity(quantity-1);
            changeProductQuantity(false)
        }
    }
    const handleChangeInput = (value: string)=>{
        if(value == '') return setQuantity(0);
        const filteredText = value.replace(/[.,]/g, '');
        setQuantity(parseInt(filteredText))
        setProductQuantity(parseInt(filteredText))
    }

    return (
        <View style={styles.product}>
            <View>
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.productValue}>R${(price * quantity).toFixed(2).replace('.', ',')}</Text>
            </View>
            <View style={styles.actions}>
                <View style={styles.actionButtons}>
                    <TouchableHighlight 
                        onPress={()=>{handleDecrease()}} style={styles.button}
                        underlayColor={COLORS.grayScalePrimary}>
                        <Text>-</Text>
                    </TouchableHighlight>
                    <TextInput
                        onBlur={()=>quantity == 0 ? setQuantity(1) : null}
                        style={styles.button} keyboardType="number-pad"
                        onChangeText={(value: string)=>handleChangeInput(value)}
                        value={quantity.toString()}
                    />
                    <TouchableHighlight
                        onPress={()=>{setQuantity(quantity+1); changeProductQuantity(true)}} style={styles.button}
                        underlayColor={COLORS.grayScalePrimary}>
                        <Text>+</Text>
                    </TouchableHighlight>
                </View>
                <Text style={styles.productRemove} onPress={()=>{removeItem()}}>×</Text>
            </View>
        </View>
    )
}


export default ProductListItem