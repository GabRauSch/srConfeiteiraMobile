import { Image, Text, TextInput, View } from "react-native";
import { styles } from "../styles/screen.ProductItem";
import { Picker } from "@react-native-picker/picker";

export const ProductItem = () => {
    const bolo = require('../assets/images/bolo.png');

    return (
        <View style={styles.page}>
            <Text style={styles.save}>Salvar</Text>
            <View style={styles.profit}>
                <View style={styles.profitDisplay}>
                    <Text style={styles.profitText}>20% lucro</Text>
                </View>
            </View>
            <View style={styles.imageDisplay}>
                <Image source={bolo} style={styles.itemImage}/>
            </View>
            <View style={styles.productInfo}>
                <View style={styles.productName}>
                    <TextInput style={[styles.productInput, styles.name]} value="Bolo de batata"/>
                </View>
                <View style={styles.productInfoItem}>
                    <Text style={styles.productInfoText}>Descrição</Text>
                    <TextInput style={styles.productInput}>Um delicioso bolo delicioso</TextInput>
                </View>
                <View style={styles.productInfoItem}>
                    <Text style={styles.productInfoText}>Custo de produção</Text>
                    <TextInput style={styles.productInput}>R$12,00</TextInput>
                </View>
                <View style={styles.productInfoItem}>
                    <Text style={styles.productInfoText}>Valor de venda</Text>
                    <TextInput style={styles.productInput}>R$15,00</TextInput>
                </View>
                <View style={styles.productInfoItem}>
                    <Text style={styles.productInfoText}>Categoria</Text>
                    <View style={styles.productPicker}>
                        <Picker >
                            <Picker.Item label={"Docinho"} value={"Docinho"}/>
                            <Picker.Item label={"Bolos"} value={"Bolos"}/>
                            <Picker.Item label={"Pastéis"} value={"Pastéis"}/>
                        </Picker>
                    </View>
                </View>
            </View>
        </View>
    );
};
