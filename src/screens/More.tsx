import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import {styles} from '../styles/screen.More';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HorizontalLine } from "../components/HorizontalLine";
import { useFonts } from "@expo-google-fonts/pacifico";
import { COLORS } from "../styles/global";
import Subscription from "../components/Subscription";
import { useNavigation } from "@react-navigation/native";
import useMessage from "../hooks/useMessage";

const MoreScreen = ()=>{
    const iconSize = 20;
    const navigation = useNavigation() as any;
    const { MessageDisplay, setMessageWithTimer } = useMessage();

    return (
        <>
            <MessageDisplay />
            <View style={styles.page}>
                <View style={styles.featuresDisplay}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Products', {screen: 'categories'})}} activeOpacity={.8} style={styles.moreFeature}>
                        <Icon name="th-large" size={20} />
                        <Text style={styles.moreFeatureText}>Suas Categorias</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setMessageWithTimer('Recurso estará disponível em breve', 'error')}} style={[styles.moreFeature, {opacity: .6}]}>
                        <Icon name="shopping-basket" size={20} color={"#ccc"}/>
                        <Text style={styles.moreFeatureText}>Seus Itens</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setMessageWithTimer('Recurso estará disponível em breve', 'error')}} style={[styles.moreFeature, {opacity: .6}]}>
                        <Icon name="book" size={20} color={"#ccc"}/>
                        <Text style={styles.moreFeatureText}>Suas Receitas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setMessageWithTimer('Recurso estará disponível em breve', 'error')}} style={[styles.moreFeature, {opacity: .6}]}>
                        <Icon name="shopping-cart" size={20} color={"#ccc"}/>
                        <Text style={styles.moreFeatureText}>Suas Compras</Text>
                    </TouchableOpacity>
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
        </>
    )
}

export default MoreScreen