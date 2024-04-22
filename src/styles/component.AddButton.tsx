import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 1000,
        width: 85,
        aspectRatio: 2/1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plus: {
        color: '#fff',
        fontSize: 24
    }
});

