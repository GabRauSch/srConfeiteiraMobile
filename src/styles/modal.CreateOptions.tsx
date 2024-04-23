import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 150,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6, 
        shadowRadius: 4,
        elevation: 3, 
    },
    modalItem: {
        padding: 15,
    }
})