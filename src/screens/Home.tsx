import { SafeAreaView, ScrollView, Text, View } from "react-native";
import {styles} from '../styles/screen.Home'
import Card from "../components/Card";
import { HorizontalLine } from "../components/HorizontalLine";

export const HomeScreen = ()=>(
    <SafeAreaView style={styles.page}>
        <Text style={styles.title}>Próximos Pedidos</Text>
        <ScrollView horizontal={true} style={styles.daysDisplay}>
            <View style={styles.daysView}>
                <View style={styles.day}>
                    <Text>10 pedidos</Text>
                    <View style={styles.ordersArea}>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.pendent]}></View>
                        <View style={[styles.order, styles.pendent]}></View>
                    </View>
                    <Text style={styles.dayName}>Hoje</Text>
                </View>
                <View style={styles.day}>
                    <Text>4 pedidos</Text>
                    <View style={styles.ordersArea}>
                        <View style={[styles.order, styles.pendent]}></View>
                        <View style={[styles.order, styles.pendent]}></View>
                        <View style={[styles.order, styles.pendent]}></View>
                        <View style={[styles.order, styles.pendent]}></View>
                    </View>
                    <Text style={styles.dayName}>Amanhã</Text>
                </View>
                <View style={styles.day}>
                    <Text>4 pedidos</Text>
                    <View style={styles.ordersArea}>
                        <View style={[styles.order, styles.pendent]}></View>
                        <View style={[styles.order, styles.pendent]}></View>
                        <View style={[styles.order, styles.pendent]}></View>
                        <View style={[styles.order, styles.pendent]}></View>
                    </View>
                    <Text style={styles.dayName}>Quarta</Text>
                </View>
                <View style={styles.day}>
                    <Text>10 pedidos</Text>
                    <View style={styles.ordersArea}>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.finished]}></View>
                        <View style={[styles.order, styles.pendent]}></View>
                        <View style={[styles.order, styles.pendent]}></View>
                    </View>
                    <Text style={styles.dayName}>Sexta</Text>
                </View>
            </View>
        </ScrollView>
        <HorizontalLine />
        <View>
            <Text style={styles.title}>Resultados do mês</Text>
            <View style={styles.cardsDisplay}>
                <Card title="Faturamento"  value="R$13.000,00">
                    <Text>oi</Text>
                </Card>
                <Card title="Vendas" value="30">
                    <Text>oi</Text>
                </Card>
            </View>
            <View style={styles.cardsDisplay}>
                <Card title="Novos clientes"  value="+1">
                    <Text>oi</Text>
                </Card>
                <Card title="Maior venda" value="R$30,00">
                    <Text>oi</Text>
                </Card>
            </View>
        </View>
    </SafeAreaView>
)