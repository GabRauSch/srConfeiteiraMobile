import { Text, View } from "react-native"
import {styles} from '../styles/component.Card'
import { ReactNode } from "react"

type Props = {
    children: ReactNode,
    value?: string,
    title?: string
}

const Card = ({title, value, children}: Props)=>{
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            {value ? (
                <Text style={styles.value}>{value}</Text>
            ) : (
                <>
                    {children}
                </>
            )}
        </View>
    )
}

export default Card