import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    profit: {
        position: 'absolute',
        right: 0,
        top: 200,
        zIndex: 991
    },
    profitChange: {

    },
    save: {
        position: 'absolute',
        right: 0,
        padding: 20,
        color: COLORS.primary,
        fontWeight: 'bold',
        zIndex: 998
    },
    profitDisplay: {
        backgroundColor: COLORS.primary,
        width: 120,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
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
        gap: 30,
        marginBottom: 50
    },
    newCategoryContainer: {
        paddingBottom: 20
    }
});