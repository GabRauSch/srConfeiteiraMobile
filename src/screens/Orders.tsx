import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { styles } from "../styles/screen.Orders";
import SearchInput from "../components/SearchInput";
import OptionItem from "../components/OptionItem";
import { HorizontalLine } from "../components/HorizontalLine";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CreateOptions } from "../modals/CreateOptions";
import ChangeVisionButton from "../components/ChangeVisionButton";

export const OrdersScreen = ()=>{
    const status = ["Abertos", "Entregues", "Recebidos"]
    const options = ["Todas", ...status, 'mais'];
    const [selectedStatus, setSelectedCategory] = useState<string | null>(null); 
    const [activeKey, setActiveKey] = useState(0);
    const [createOptionsDisplay, setCreateOptionsDisplay] = useState(false);
    const [vision, setVision] = useState(1)

    const navigate = useNavigation()

    const handleStatusSelect = (option: string, key: number)=>{
        // if(option === 'mais') return navigate.navigate('listCategories')
        setSelectedCategory(option === "Todas" ? null : option);
        setActiveKey(key);
    }
    return (
        <ScrollView>
            {vision === 0 ? (
                <>
                    <Text style={styles.separator}>Hoje</Text>
                    <View style={styles.ordersDisplay}>
                        <View style={styles.order}>
                            <View style={[styles.openOrder, styles.labelOrder]}></View>
                            <Text style={styles.name}>Docinhos</Text>
                            <View style={styles.unitsDisplay}>
                                <View style={styles.listItem}>
                                    <Text style={styles.listItemText}>50 unidades</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.order}>
                            <View style={[styles.openOrder, styles.labelOrder]}></View>
                            <Text style={styles.name}>Bolos</Text>
                            <View style={styles.unitsDisplay}>
                                <View style={styles.listItem}>
                                    <Text style={styles.listItemText}>50 unidades</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.order}>
                            <View style={[styles.closedOrder, styles.labelOrder]}></View>
                            <Text style={styles.name}>Pastéis</Text>
                            <View style={styles.unitsDisplay}>
                                <View style={styles.listItem}>
                                    <Text style={styles.listItemText}>50 unidades</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.separator}>20/04</Text>
                    <View style={styles.ordersDisplay}>
                        <View style={styles.order}>
                            <View style={[styles.openOrder, styles.labelOrder]}></View>
                            <Text style={styles.name}>Brigadeiros</Text>
                            <View style={styles.unitsDisplay}>
                                <View style={styles.listItem}>
                                    <Text style={styles.listItemText}>50 unidades</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.order}>
                            <View style={[styles.openOrder, styles.labelOrder]}></View>
                            <Text style={styles.name}>Bolos</Text>
                            <View style={styles.unitsDisplay}>
                                <View style={styles.listItem}>
                                    <Text style={styles.listItemText}>50 unidades</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.order}>
                            <View style={[styles.closedOrder, styles.labelOrder]}></View>
                            <Text style={styles.name}>Pastéis</Text>
                            <View style={styles.unitsDisplay}>
                                <View style={styles.listItem}>
                                    <Text style={styles.listItemText}>50 unidades</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </>
            ) : (
                <>
                    <Text style={styles.separator}>Hoje</Text>
                    <View style={styles.ordersDisplay}>
                        <View style={styles.order}>
                            <View style={[styles.openOrder, styles.labelOrder]}></View>
                            <Text style={styles.name}>Renatinho</Text>
                            <View style={styles.orderList}>
                                <View style={styles.listItem}>
                                    <Text style={styles.bullet}>-</Text>
                                    <Text style={styles.listItemText}>Bolo de Bacalhau</Text>
                                </View>
                                <View style={styles.listItem}>
                                    <Text style={styles.bullet}>-</Text>
                                    <Text style={styles.listItemText}>Brigadeiro de camarão</Text>
                                </View>
                                <View style={styles.listItem}>
                                    <Text style={styles.bullet}>-</Text>
                                    <Text style={styles.listItemText}>Tal coisa</Text>
                                </View>
                                <View style={styles.listItem}>
                                    <Text style={styles.listItemText}>...</Text>
                                </View>
                            </View>
                            <Text style={styles.time}>Entregue em 12 horas</Text>
                            <HorizontalLine />
                            <Text style={styles.price}>R$50,00</Text>
                        </View>
                        
                        <View style={styles.order}>
                            <View style={[styles.openOrder, styles.labelOrder]}></View>
                            <Text style={styles.name}>Mama brusketa</Text>
                            <View style={styles.orderList}>
                                <View style={styles.listItem}>
                                    <Text style={styles.bullet}>-</Text>
                                    <Text style={styles.listItemText}>Bolo de Bacalhau</Text>
                                </View>
                            </View>
                            <Text style={styles.time}>Entregue em 16 horas</Text>
                            <HorizontalLine />
                            <Text style={styles.price}>R$50,00</Text>
                        </View>
                    </View>
                    <Text style={styles.separator}>24/04</Text>
                    <View style={styles.ordersDisplay}>
                        <View style={styles.order}>
                            <View style={[styles.openOrder, styles.labelOrder]}></View>
                            <Text style={styles.name}>Renatinho</Text>
                            <View style={styles.orderList}>
                                <View style={styles.listItem}>
                                    <Text style={styles.bullet}>-</Text>
                                    <Text style={styles.listItemText}>Bolo de Bacalhau</Text>
                                </View>
                                <View style={styles.listItem}>
                                    <Text style={styles.bullet}>-</Text>
                                    <Text style={styles.listItemText}>Brigadeiro de camarão</Text>
                                </View>
                                <View style={styles.listItem}>
                                    <Text style={styles.bullet}>-</Text>
                                    <Text style={styles.listItemText}>Tal coisa</Text>
                                </View>
                                <View style={styles.listItem}>
                                    <Text style={styles.listItemText}>...</Text>
                                </View>
                            </View>
                            <Text style={styles.time}>Entrega em 2 dias</Text>
                            <HorizontalLine />
                            <Text style={styles.price}>R$50,00</Text>
                        </View>
                        
                        <View style={styles.order}>
                            <View style={[styles.openOrder, styles.labelOrder]}></View>
                            <Text style={styles.name}>Mama brusketa</Text>
                            <View style={styles.orderList}>
                                <View style={styles.listItem}>
                                    <Text style={styles.bullet}>-</Text>
                                    <Text style={styles.listItemText}>Bolo de Bacalhau</Text>
                                </View>
                            </View>
                            <Text style={styles.time}>Entrega em 2 dias</Text>
                            <HorizontalLine />
                            <Text style={styles.price}>R$50,00</Text>
                        </View>
                    </View>
                </>
            )}
        </ScrollView>
    )
}