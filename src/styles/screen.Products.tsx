import { StyleSheet } from "react-native";
import { COLORS, LABEL, SHADOW } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
        flex: 1
    }, 
    products: {
        gap: 10,
        padding: 5
    },
    messageNoRegister: {
        color: '#777',
        textAlign: 'center'
    },
    modalBackground: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    addButonArea: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        alignItems: 'flex-end'
    },
    separator: {
        ...LABEL
    },
    scroll: {
        padding: 4,
    },
    categoryDivision: {
    },
    expandButton: {
        alignSelf: 'center',
        color: '#888',
        padding: 7,
    },
    options: {
        flexDirection: 'row'
    },
    
})