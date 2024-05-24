import { Text, Touchable, TouchableHighlight, TouchableOpacity, View } from "react-native"
import {styles} from '../styles/component.CreateButton'
import { COLORS } from "../styles/global"

type Props = {
    text: string,
    inverted?: boolean
    action: ()=>void
}

const CreateButton = ({text, action, inverted}: Props)=>{
    return (
        <TouchableHighlight style={{...styles.button, ...(inverted ? styles.inverted : {})}} underlayColor={COLORS.primaryPressed} onPress={action}>
            <Text style={{...styles.buttonText, color: inverted ? 'black': 'white'}}>{text}</Text>
        </TouchableHighlight>
    )
}

export default CreateButton