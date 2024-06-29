import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../styles/global";
import {styles} from '../styles/component.HeaderCreation'
import { useNavigation } from "@react-navigation/native"


type Props = {
    url: string,
    title: string
}

export const HeaderCreation = ({url, title}: Props)=>{
    const navigate = useNavigation() as any
    
    const handleNavigate = (url: string)=>{
        navigate.navigate(url)
    }

    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.home} onPress={() => handleNavigate(url)} activeOpacity={.9}>
                <Icon name="arrow-left" color={COLORS.primary} size={15} />
            </TouchableOpacity>
            <Text style={{color: COLORS.primary, textAlign: 'center', flex: 1, marginBottom: 40, fontSize: 20}}>{title}</Text>
        </View>
    )
}