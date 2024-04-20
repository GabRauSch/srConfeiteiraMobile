import { SafeAreaView, ScrollView, Text, View } from "react-native";
import {styles} from '../styles/screen.Home'

export const HomeScreen = ()=>(
    <SafeAreaView style={styles.page}>
        <Text style={styles.title}>Próximos Pedidos</Text>
        <ScrollView horizontal={true} style={styles.daysDisplay}>
            <View style={styles.day}>
                <Text>5 Pedidos</Text>
                <Text style={styles.dayName}>Hoje</Text>
            </View>
            <View style={styles.day}>
                <Text>5 Pedidos</Text>
                <Text style={styles.dayName}>Amanhã</Text>
            </View>
            <View style={styles.day}>
                <Text>5 Pedidos</Text>
                <Text style={styles.dayName}>Quarta</Text>
            </View>
            <View style={styles.day}>
                <Text>5 Pedidos</Text>
                <Text style={styles.dayName}>Quinta</Text>
            </View>
            <View style={styles.day}>
                <Text>5 Pedidos</Text>
                <Text style={styles.dayName}>Sexta</Text>
            </View>
            <View style={styles.day}>
                <Text>5 Pedidos</Text>
                <Text style={styles.dayName}>Sábado</Text>
            </View>
            <View style={styles.day}>
                <Text>5 Pedidos</Text>
                <Text style={styles.dayName}>Domingo</Text>
            </View>
        </ScrollView>
        <View style={styles.horizontalLine}></View>
        <View>
            <Text style={styles.title}>Resultados do mês</Text>
        </View>
    </SafeAreaView>
)