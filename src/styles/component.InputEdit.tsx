import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    productInfoItem: {
    },
    productInfoText: {
        color: COLORS.primary
    },
    productInput: {
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 1,
        padding: 0,
        width: '100%',
    },
    optional: {
        color: COLORS.primaryBlur
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#555',
        paddingHorizontal: 10,
        width: 'auto',

    },
    beforeHolder:{
        color: '#999',
    },
    productName: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    productPicker: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 10,
        marginVertical: 5
    },
    notEditable: {
        color: COLORS.unactive,
        borderColor: COLORS.unactive
    },
    inputArea: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: 'red',

    }
})