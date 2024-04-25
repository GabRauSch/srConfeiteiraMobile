import { Text, TextInput, View } from 'react-native'
import {styles} from '../styles/component.InputEdit'
import { Picker } from '@react-native-picker/picker'

type Props = {
    label: string,
    values: string[]
}  

const InputPicker = ({label, values}: Props)=>{
    return (
        <View style={styles.productInfoItem}>
            <Text style={styles.productInfoText}>{label}</Text>
            <View style={styles.productPicker}>
                <Picker >
                    {values.map((el, key)=>(
                        <Picker.Item key={key} label={el} value={el}/>
                    ))}
                </Picker>
            </View>
        </View>
    )
}

export default InputPicker