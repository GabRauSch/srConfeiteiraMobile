import { SafeAreaView, Text, View } from "react-native";
import {styles} from '../styles/screen.More';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HorizontalLine } from "../components/HorizontalLine";
import { useFonts } from "@expo-google-fonts/pacifico";
import { COLORS } from "../styles/global";
import Subscription from "../components/Subscription";

const MoreScreen = ()=>{
    const iconSize = 20
    return (
        <View style={styles.page}>
            <View style={styles.featuresDisplay}>
                <View style={styles.moreFeature}>
                    <Icon name="shopping-basket" size={20}/>
                    <Text style={styles.moreFeatureText}>Itens</Text>
                </View>
                <View style={styles.moreFeature}>
                    <Icon name="book" size={20}/>
                    <Text style={styles.moreFeatureText}>Receitas</Text>
                </View>
                <View style={styles.moreFeature}>
                    <Icon name="shopping-cart" size={20}/>
                    <Text style={styles.moreFeatureText}>Compras</Text>
                </View>
            </View>
            <HorizontalLine />
            <Subscription/>            
            <HorizontalLine />
            <View>
                <View  style={styles.editItem}>
                    <Icon name="history" size={iconSize} color={COLORS.primary}/>
                    <Text style={styles.editItemText}>Histórico de pagamentos</Text>
                </View>
                <View  style={styles.editItem}>
                    <Icon name="money" size={iconSize} color={COLORS.primary}/>
                    <Text style={styles.editItemText}>Editar Orçamento</Text>
                </View>
                <View style={styles.editItem}>
                    <Icon name="newspaper-o" size={iconSize} color={COLORS.primary}/>
                    <Text style={styles.editItemText}>Alterar plano</Text>
                </View>
                <View style={styles.editItem}>
                    <Icon name="pencil" size={iconSize} color={COLORS.primary}/>
                    <Text style={styles.editItemText}>Trocar senha</Text>
                </View>
            </View>
        </View>
    )
}

export default MoreScreen