import { Modal, Text, TouchableOpacity, View } from "react-native"
import {styles} from '../styles/modal.CreateOptions'
import { TouchableWithoutFeedback } from "react-native"

type Props = {
    onClose: ()=>void
}

export const CreateOptions = ({onClose}: Props)=>{
    const creationOptions = ["Novo Pedido", "Novo produto", "Novo cliente"]
    return (
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={onClose}
            >
                <TouchableOpacity onPress={onClose} style={styles.modal} activeOpacity={0}>
                    <View style={styles.cardList}>
                            {creationOptions.map((option, key)=>(
                                <Text key={key} style={styles.modalItem} onPress={()=>{console.log('vai tomar no cu')}}>{option}</Text>
                            ))}
                    </View>
                </TouchableOpacity>
            </Modal>
    )
}
