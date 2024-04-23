import { SafeAreaView, Text, View } from "react-native";
import { styles } from "../styles/screen.Clients";
import { HorizontalLine } from "../components/HorizontalLine";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../styles/global";

export const ClientsScreen = ()=>(
    <View style={styles.clientsDisplay}>
        <View style={styles.client}>
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
                <View>
                    <Icon name="ellipsis-v" size={15} color={COLORS.primary} />
                </View>
            </View>
            <Text style={styles.time}>Pedido para 12 horas</Text>
        </View>
    </View>
)