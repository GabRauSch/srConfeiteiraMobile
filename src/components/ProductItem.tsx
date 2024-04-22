import { Text, View } from "react-native"
import {styles} from '../styles/component.ProductsList'
import { ReactNode, useState } from "react"
import { Product } from "../types/Product"
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../styles/global";

type Props = {
    name: string, 
    value: number,
    image: string,
    description: string
}

const ProductItem = ({name, value, description, image}: Props)=>{
    const [activeKey, setActiveKey] = useState(0)

    return (
        
        <View style={styles.productItem}>
            <Icon name="birthday-cake" size={30} color={COLORS.primary} />
            <View style={styles.productDisplay}>
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.productDescription}>{description}</Text>
            </View>
            <Text style={styles.value}>
                R${value.toFixed(2).replace('.',',')} 
            </Text>
            <Icon name="ellipsis-v" size={15} color="black" />
        </View>
    )
}

export default ProductItem