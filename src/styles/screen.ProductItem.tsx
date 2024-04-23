import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
        flex: 1
    }, 
    profit: {
        position: 'absolute',
        right: 0,
        top: 200,
        zIndex: 991
    },
    save: {
        position: 'absolute',
        right: 0,
        padding: 20,
        color: COLORS.primary,
        fontWeight: 'bold'
    },
    profitDisplay: {
        backgroundColor: COLORS.primary,
        width: 120,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        padding: 10,
    },
    profitText: {
        fontSize: 17,
        color: '#fff'
    },
    imageDisplay: {
        alignItems: 'center',
        padding: 20
    },
    itemImage: {
        width: 200,
        height: 200
    },
    productInfo: {
        gap: 30
    },
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
    productPicker: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 10,
        marginVertical: 5
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
    }
})