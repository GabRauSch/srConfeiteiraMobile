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
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, position: 'relative'}}>
            <TouchableOpacity style={styles.home} onPress={() => handleNavigate(url)} activeOpacity={.9}>
                <Icon name="arrow-left" color={COLORS.primary} size={15} />
            </TouchableOpacity>
            <Text style={{color: COLORS.primary, textAlign: 'center', 
                textAlignVertical: 'center', flex: 1, fontSize: 18}}>{title}</Text>
        </View>
    )
}