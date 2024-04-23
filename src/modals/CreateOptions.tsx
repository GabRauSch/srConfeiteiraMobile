import { Text, View } from "react-native"
import {styles} from '../styles/modal.CreateOptions'

export const CreateOptions = ()=>{
    return (
        <View style={styles.modal}>
            <Text style={styles.modalItem}>Novo Produto</Text>
            <Text style={styles.modalItem}>Nova Categoria</Text>
        </View>
    )
}
