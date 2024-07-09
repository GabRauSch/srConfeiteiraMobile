import { StyleSheet } from "react-native";
import { COLORS, SHADOW } from "./global";

export const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 10,
        width: 'auto',
        zIndex: 9989
    },
    inverted: {
        borderWidth: 2,
        borderColor: COLORS.primary,
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center'
    }
})