import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
        flex: 1
    }, 
    products: {
        gap: 10
    },
    addButonArea: {
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    separator: {
        color: COLORS.primary,
        opacity: 0.5,
        marginBottom: 10
    }
})