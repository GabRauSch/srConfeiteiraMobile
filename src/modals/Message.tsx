import { Modal, Text, TouchableOpacity, View } from "react-native"
import {styles} from '../styles/modal.Message'
import { TouchableWithoutFeedback } from "react-native"

type Props = {
    backgroundColor: string,
    message: string
}

const Message = ({message, backgroundColor}: Props)=>{
    const creationOptions = ["Novo Pedido", "Novo produto", "Novo cliente"]
    return (
            <Modal
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modal}>
                    <View style={{...styles.cardList, backgroundColor}}>
                            {creationOptions.map((option, key)=>(
                                <Text key={key} style={styles.message} onPress={()=>{}}>{option}</Text>
                            ))}
                    </View>
                </View>
            </Modal>
    )
}

export default Message