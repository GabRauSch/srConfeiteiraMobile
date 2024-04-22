import { View } from 'react-native'
import {styles} from '../styles/component.AddButton'
import { Text } from 'react-native'

const AddButton = ()=>{
    return (
        <View style={styles.button}>
            <Text style={styles.plus}>+</Text>
        </View>
    )
}

export default AddButton