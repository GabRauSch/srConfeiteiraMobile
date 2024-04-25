import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import {styles} from '../styles/screen.Profile'
import Icon from "react-native-vector-icons/FontAwesome";
import InputEdit from "../components/InputEdit";
import { COLORS } from "../styles/global";
import { useNavigation } from "@react-navigation/native";

const Profile = ()=>{
    const person = require('../assets/images/person.png');

    const iconSize = 12

    const navigate = useNavigation() as any
    const handleNavigate = (url: string)=>{
        navigate.navigate(url)
    }   

    return (
        <View style={styles.page}>
            <View style={styles.save}>
                <Text style={{fontWeight: 'bold', color: '#555'}}>Cancelar</Text>
                <Text style={{fontWeight: 'bold', color: COLORS.primary}}>Salvar</Text>
            </View>
            <TouchableOpacity style={styles.home} onPress={()=>handleNavigate('main')} activeOpacity={.9}>
                <Icon name="home" color={COLORS.primary} size={15}/>
            </TouchableOpacity>
            <View style={styles.imageDisplay}>
                <Image source={person} style={styles.itemImage}/>
                <Icon name="pencil" size={15} color={COLORS.primary} style={styles.pencil} />
            </View>
            <View style={styles.profileInfo}>
                <InputEdit label="Nome" value="Igor Ramos Ribas" main={true}/>
                <InputEdit label="Email" value="igorramosribas@gmail.com" lockEdit={true}/>
                <InputEdit label="Telefone" value="48984116469"/>
                <InputEdit label="Telefone" value="48984116469"/>
            </View>
            <View style={styles.editArea}>
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

export default Profile