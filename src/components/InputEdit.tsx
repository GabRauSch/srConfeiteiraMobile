import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import {styles} from '../styles/component.InputEdit'

type Props = {
    label: string,
    value: string,
    main?: boolean,
    lockEdit?: boolean
}  

const InputEdit = ({label, value, main, lockEdit}: Props)=>{

    const handleMessage = ()=>{
        if (lockEdit) console.log('erro')
    }

    return (
        <TouchableOpacity style={main ? styles.productName : styles.productInfoItem} activeOpacity={1} onPress={handleMessage}>
            {!main &&  
                <Text style={[styles.productInfoText, lockEdit ? styles.notEditable : null ]}>{label}</Text>
            }
            <TextInput editable={!lockEdit} style={[styles.productInput, main ? styles.name : null, lockEdit ? styles.notEditable : null ]}>{value}</TextInput>
        </TouchableOpacity>
    )
}

export default InputEdit