import { Touchable, TouchableOpacity, View } from 'react-native'
import {styles} from '../styles/component.AddButton'
import { Text } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { COLORS } from '../styles/global'

type Props = {
    onClick: ()=>void
}

const AddButton = ({onClick}: Props)=>{
    return (
        <TouchableHighlight style={styles.button} onPress={onClick} underlayColor={COLORS.primaryPressed}>
            <Text style={styles.plus}>+</Text>
        </TouchableHighlight>
    )
}

export default AddButton