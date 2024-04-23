import { Touchable, TouchableOpacity, View } from 'react-native'
import {styles} from '../styles/component.AddButton'
import { Text } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { COLORS } from '../styles/global'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
    onClick: ()=>void
}

const ChangeVisionButton = ({onClick}: Props)=>{
    return (
        <TouchableHighlight style={styles.button} onPress={onClick} underlayColor={COLORS.primaryPressed}>
            <Icon name="exchange" size={10} color="white" />
        </TouchableHighlight>
    )
}

export default ChangeVisionButton