import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    modal: {
        position: 'relative',
        height: '100%',
        zIndex: 999
    },
    cardList: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 150,
        bottom: 130,
        right: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6, 
        shadowRadius: 4,
        elevation: 3, 
        zIndex: 999
    },
    message: {
        fontSize: 20
    }
})