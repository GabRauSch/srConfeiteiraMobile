import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import {styles} from '../styles/component.CreateButton'

type Props = {
    text: string,
    action: ()=>void
}

const CreateButton = ({text, action}: Props)=>{
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={action}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default CreateButton