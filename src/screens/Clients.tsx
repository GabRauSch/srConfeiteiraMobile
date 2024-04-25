import { SafeAreaView, Text, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "../styles/screen.Clients";
import { HorizontalLine } from "../components/HorizontalLine";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../styles/global";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ClientsScreen = ()=>{
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigation() as any

    const toggleModal = ()=>{
        setModalVisible(!modalVisible)
    }
    const closeModal = ()=>{
        setModalVisible(false)
    }

    const handleNavigate = (url: string)=>{
        navigate.navigate(url)
    }

    return(
        <>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalBackground} />
            </TouchableWithoutFeedback>
            <View style={styles.clientsDisplay}>
                <TouchableOpacity style={styles.client} activeOpacity={0.8}>
                    <View style={styles.clientInfo}>
                        <View>
                            <Text style={styles.name}>Renatinho</Text>
                            <View style={styles.clientList}>
                                <View style={styles.clientItem}>
                                    <Text style={styles.info}>Contato: </Text>
                                    <Text style={styles.listItemText}>48984116469</Text>
                                </View>
                                <View style={styles.clientItem}>
                                    <Text style={styles.info}>Pedidos pendentes: </Text>
                                    <Text style={styles.listItemText}>2</Text>
                                </View>
                                <View style={styles.clientItem}>
                                    <Text style={styles.info}>Total:</Text>
                                    <Text style={styles.listItemText}>R$150,00</Text>
                                </View>
                            </View>
                        </View>
                            {modalVisible && (
                                <View style={styles.clientModal}>
                                    <TouchableHighlight style={styles.clientModalText} onPress={()=>{handleNavigate('client')}} underlayColor={COLORS.secondary}>
                                        <Text>Editar</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.clientModalText} onPress={()=>{}} underlayColor={COLORS.secondary}>
                                        <Text>Ver Pedidos</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.clientModalText} onPress={()=>{}} underlayColor={'#f88'}>
                                        <Text>Excluir</Text>
                                    </TouchableHighlight>
                                </View>
                            )}
                        <TouchableOpacity style={styles.dots} onPress={toggleModal}>
                                <Icon name="ellipsis-v" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.time}>Pedido para 12 horas</Text>
                </TouchableOpacity>
            </View>
        </>
    )    
}

export default ClientsScreen