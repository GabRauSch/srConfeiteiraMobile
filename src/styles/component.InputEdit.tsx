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
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#555',
        paddingHorizontal: 10
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
    }
})