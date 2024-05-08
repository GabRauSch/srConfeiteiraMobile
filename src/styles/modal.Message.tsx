import { StyleSheet } from "react-native";
import { COLORS, SHADOW } from "./global";

export const styles = StyleSheet.create({
    cardArea: {
        position: 'absolute',
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        elevation: 1,
        top: 10,
        shadowColor: 'transparent',
        zIndex: 9999999,
        
    },
    card: {
        padding: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
        maxWidth: 300,
    },
    message: {
        color: '#fff'
    }
})