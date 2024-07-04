import { StyleSheet } from "react-native";
import { COLORS, LABEL, SHADOW } from "./global";

export const styles = StyleSheet.create({
    page: {
    },
    profit: {
        position: 'absolute',
        right: 0,
        top: 200,
        zIndex: 991
    },
    profitChange: {

    },
    separator: {
        ...LABEL
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
    newCategoryContainer: {
        paddingBottom: 20
    },
    categories: {
        gap: 10,
    },
    category: {
        borderLeftWidth: 10,
        ...SHADOW,
        backgroundColor: 'white',
        padding: 10,
        margin: 3,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actions: {
        flexDirection: 'row',
    }
});