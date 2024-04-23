import { Text, View } from "react-native"
import {styles} from '../styles/modal.CreateOptions'

export const CreateOptions = ()=>{
    const creationOptions = ["Novo produto", "Novo Pedido", "Novo cliente"]
    return (
        <View style={styles.cardList}>
            {creationOptions.map((option, key)=>(
                <Text key={key} style={styles.modalItem}>{option}</Text>
            ))}
        </View>
    )
}
