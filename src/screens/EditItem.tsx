import { Image, Text, TextInput, View } from "react-native";
import { styles } from "../styles/screen.ProductItem";
import { Picker } from "@react-native-picker/picker";
import { ReactNode } from "react";
import InputEdit from "../components/InputEdit";


export const EditItem = () => {
    const person = require(`../assets/images/person.png`);

    const label = '20% lucro' || 'falkj'

    return (
        <View style={styles.page}>
            <Text style={styles.save}>Salvar</Text>
            <View style={styles.profit}>
                <View style={styles.profitDisplay}>
                    <Text style={styles.profitText}>{label}</Text>
                </View>
            </View>
            <View style={styles.imageDisplay}>
                <Image source={person} style={styles.itemImage}/>
            </View>
            <View style={styles.productInfo}>
                    <InputEdit label="Nome" value="Igor Ramos Ribas" main={true}/>
                    <InputEdit label="Telefone" value="48984116469"/>
                    <InputEdit label="Endereço" value="Rua dos anzóis pretos"/>
            </View>
        </View>
    );
};
