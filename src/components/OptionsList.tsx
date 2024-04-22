import { Text, View } from "react-native"
import {styles} from '../styles/component.OptionsList'
import { ReactNode, useState } from "react"

type Props = {
    options: string[]
}

const OptionsList = ({options}: Props)=>{
    const [activeKey, setActiveKey] = useState(0)

    return (
        <View style={styles.options}>
            {options.map((option, key)=>(
                <Text 
                    key={key}
                    style={[styles.optionItem, key === activeKey ? styles.active : null]}
                    onPress={()=>{setActiveKey(key)}}    
                >{option}</Text>
            ))}
        </View>
    )
}

export default OptionsList