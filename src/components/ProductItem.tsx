import { Text, View, TouchableOpacity } from "react-native";
import { styles } from '../styles/component.ProductsList';
import { ReactNode, useState } from "react";
import { Product } from "../types/Product";
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../styles/global";

type Props = {
    name: string;
    value: number;
    image: string;
    description: string;
    onPress: () => void;
};

const ProductItem = ({ name, value, description, image, onPress }: Props) => {
    const [activeKey, setActiveKey] = useState(0);

    return (
        <TouchableOpacity style={styles.productItem} onPress={onPress}>
            <Icon name="birthday-cake" size={30} color={COLORS.primary} />
            <View style={styles.productDisplay}>
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.productDescription}>{description}</Text>
            </View>
            <Text style={styles.value}>
                R${value.toFixed(2).replace('.', ',')} 
            </Text>
            <Icon name="ellipsis-v" size={15} color="black" />
        </TouchableOpacity>
    );
};

export default ProductItem;
