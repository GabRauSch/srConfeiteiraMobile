import { Text, TextInput, View } from 'react-native'
import {styles} from '../styles/component.InputEdit'
import { Picker } from '@react-native-picker/picker'
import { COLORS } from '../styles/global'

type Props = {
    label: string,
    values: any[],
    selected: any,
    onSelect: (value: string)=>void,
    createOption?: string
}  

const InputPicker = ({label, values, selected, onSelect, createOption}: Props)=>{
    return (
        <View style={styles.productInfoItem}>
            <Text style={styles.productInfoText}>{label}</Text>
            <View style={styles.productPicker}>
                <Picker selectedValue={selected} onValueChange={onSelect}>
                    {values.map((el: any, key)=>(
                        <Picker.Item style={{color: 'black'}} key={key} label={el.description} value={el.id}/>
                    ))}
                    {createOption && (
                        <Picker.Item style={{backgroundColor: COLORS.primary, color: `white`}} key={-1} label={createOption} value={createOption}/>
                    )}
                </Picker>
            </View>
        </View>
    )
}

export default InputPicker