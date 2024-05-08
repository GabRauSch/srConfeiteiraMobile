import { Modal, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import {styles} from '../styles/modal.CreateOptions'
import { TouchableWithoutFeedback } from "react-native"
import { COLORS } from "../styles/global"
import { useNavigation } from "@react-navigation/native"

type Props = {
    onClose: ()=>void
}

export const CreateOptions = ({onClose}: Props)=>{
    const creationOptions: string[] = ["Novo Pedido", "Novo Produto", "Novo Cliente"];
    const navigate = useNavigation() as any;
    const handleCreateAction = (option: string)=>{
        switch(option){
            case 'Novo Pedido': 
            break;
            case 'Novo Produto': 
                navigate.navigate('newProduct')
                break;
            case 'Novo Cliente': 
                break;
            default: return
        }
    }
    return (
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={onClose}
            >
                <TouchableOpacity onPress={onClose} style={styles.modal} activeOpacity={.8}>
                    <View style={styles.cardList}>
                            {creationOptions.map((option, key)=>(
                                <TouchableHighlight key={key} underlayColor={COLORS.grayScalePrimary} style={styles.modalItem} onPress={()=>{
                                    handleCreateAction(option);
                                }}>
                                    <Text>{option}</Text>
                                </TouchableHighlight>
                            ))}
                    </View>
                </TouchableOpacity>
            </Modal>
    )
}
