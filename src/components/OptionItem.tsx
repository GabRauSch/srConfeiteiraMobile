import { Text, View } from "react-native"
import {styles} from '../styles/component.OptionItem'
import { ReactNode, useState } from "react"
import { ScrollView } from "react-native-gesture-handler"

type Props = {
    option: string,
    handleActive: ()=>void,
    active: boolean,
}

const OptionItem = ({option, handleActive, active}: Props)=>{
    return (
        <Text 
            style={[styles.optionItem, active ? styles.active : null]}
            onPress={handleActive}    
        >{option}</Text>
    )
}

export default OptionItem