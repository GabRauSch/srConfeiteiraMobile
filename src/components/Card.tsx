import { Text, View } from "react-native"
import {styles} from '../styles/component.Card'
import { ReactNode } from "react"

type Props = {
    children: ReactNode,
    value?: string,
    title?: string,
    width?: number,
    color?: string
}

const Card = ({title, value, children, width, color}: Props)=>{
    return (
        <View style={[styles.card, {width: width}]}>
            <Text style={styles.title}>{title}</Text>
            {value ? (
                <Text style={[styles.value, {color: color}]}>{value}</Text>
            ) : (
                <>
                    {children}
                </>
            )}
        </View>
    )
}

export default Card