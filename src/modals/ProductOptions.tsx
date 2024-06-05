import { Modal, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import {styles} from '../styles/modal.ProductOptions'
import { TouchableWithoutFeedback } from "react-native"
import { COLORS } from "../styles/global"
import { useNavigation } from "@react-navigation/native"

type Props = {
    onClose: ()=>void;
    options: {option: string, func: ()=>void}[]
    modalPos: {x: number, y: number}
}

export const ProductOptions = ({onClose, options, modalPos}: Props)=>{
    const handleCreateAction = (option: string)=>{
        
    }
    return (
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={onClose}
            >
                <TouchableOpacity onPress={onClose} style={styles.modal} activeOpacity={.8}>
                    <View style={[styles.optionsList,  { position: 'absolute', top: modalPos.y, left: modalPos.x }]}>
                        {options.map((el, key)=>(
                            <TouchableHighlight key={key} onPress={el.func} underlayColor={COLORS.secondary}>
                                <Text style={styles.optionText} key={key}>{el.option}</Text>
                            </TouchableHighlight>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
    )
}
