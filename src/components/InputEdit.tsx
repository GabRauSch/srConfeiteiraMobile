import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import {styles} from '../styles/component.InputEdit'

type Props = {
    label: string,
    value: string,
    onChange: (value: any)=>void,
    main?: boolean,
    lockEdit?: boolean,
    beforeHolder?: string
}  

const InputEdit = ({label, value, main, lockEdit,onChange, beforeHolder}: Props)=>{

    const handleMessage = ()=>{
        if (lockEdit) console.log('erro')
    }

    return (
        <TouchableOpacity style={main ? styles.productName : styles.productInfoItem} activeOpacity={1} onPress={handleMessage}>
            {!main &&  
                <Text style={[styles.productInfoText, lockEdit ? styles.notEditable : null ]}>{label}</Text>
            }
            <View style={{...styles.inputArea, justifyContent: beforeHolder ? 'flex-start' : 'center'}} >
                {beforeHolder &&
                    <Text style={styles.beforeHolder}>{beforeHolder}</Text>
                }
                <TextInput editable={!lockEdit} onChangeText={(value)=>{onChange(value)}}
                    style={[styles.productInput, main ? styles.name : null, lockEdit ? styles.notEditable : null ]}
                    value={value}
                >
                </TextInput>
            </View>
        </TouchableOpacity>
    )
}

export default InputEdit