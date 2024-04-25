import { Text, TextInput, View } from 'react-native'
import {styles} from '../styles/component.InputEdit'

type Props = {
    label: string,
    value: string,
    main?: boolean
}  

const InputEdit = ({label, value, main}: Props)=>{
    return (
        <View style={main ? styles.productName : styles.productInfoItem}>
            {!main &&  <Text style={styles.productInfoText}>{label}</Text>}
            <TextInput style={[styles.productInput, main ? styles.name : null]}>{value}</TextInput>
        </View>
    )
}

export default InputEdit