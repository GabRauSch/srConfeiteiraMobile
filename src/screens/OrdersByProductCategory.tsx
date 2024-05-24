import { Image, Text, TextInput, View } from "react-native";
import { styles } from "../styles/screen.ProductItem";
import { Picker } from "@react-native-picker/picker";
import { ReactNode } from "react";
import InputEdit from "../components/InputEdit";
import InputPicker from "../components/InputPicker";

const OrdersByProductCategory = () => {
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
                {/* <InputEdit label="Nome" value="Bolo de batata" main={true}/>
                <InputEdit label="Descrição" value="Um delicioso bolo delicioso" />
                <InputEdit label="Custo de produção" value="R$12,00" />
                <InputEdit label="Valor de venda" value="R$15,00" />
                <InputPicker label="Categoria" values={["Bolos", "Doces", "Pastéis"]} /> */}
            </View>
        </View>
    );
};

export default OrdersByProductCategory