import { TextInput } from "react-native";
import { Text, TouchableHighlight, View } from "react-native";
import {styles} from '../styles/component.NumberSetter'
import { COLORS } from "../styles/global";
 
type Props = {
    quantity: number,
    handleQuantity: (quantity: number)=>void
}

const NumberSetter = ({quantity, handleQuantity}: Props)=>{
    const handleDecrease = ()=>{
        if(quantity > 1){
            handleQuantity(quantity-1)
        }
    }
    const handleChangeInput = (value: string)=>{
        if(value == '') return handleQuantity(0);
        const filteredText = value.replace(/[.,]/g, '');
        handleQuantity(parseInt(filteredText))
    }
    return (
        <View style={styles.actionButtons}>
            <TouchableHighlight 
                onPress={()=>{handleDecrease()}} style={styles.button}
                underlayColor={COLORS.grayScalePrimary}>
                <Text>-</Text>
            </TouchableHighlight>
            <TextInput
                onBlur={()=>quantity == 0 ? handleQuantity(1) : null}
                style={styles.button} keyboardType="number-pad"
                onChangeText={(value: string)=>handleChangeInput(value)}
                value={quantity.toString()}
            />
            <TouchableHighlight
                onPress={()=>{handleQuantity(quantity+1)}} style={styles.button}
                underlayColor={COLORS.grayScalePrimary}>
                <Text>+</Text>
            </TouchableHighlight>
        </View>
    )
}

export default NumberSetter