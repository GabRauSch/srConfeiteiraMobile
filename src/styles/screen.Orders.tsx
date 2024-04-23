import { StyleSheet } from "react-native";
import { COLORS, SHADOW } from "./global";

export const styles = StyleSheet.create({
    order: {
        ...SHADOW,
        backgroundColor: '#fff',
        width: 160,
        borderRadius: 10,
        position: 'relative',
        padding: 10
    },
    changeView: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    ordersDisplay: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        padding: 5
    },
    labelOrder: {
        width: 20,
        height: 10,
        position: 'absolute',
        right: 0,
        bottom: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    openOrder: {
        backgroundColor: '#ee0',
    },
    closedOrder: {
        backgroundColor: '#0e0',
    },
    name:{
        fontSize: 18
    },
    price: {
        fontWeight: 'bold'
    },
    time: {
        fontStyle: 'italic',
        fontSize: 13,
        textAlign: 'center'
    },
    orderList: {
        padding: 5,
        height: 80
    },
    unitsDisplay: {
        padding: 5
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
    separator: {
        color: COLORS.primary,
        opacity: 0.5,
        marginVertical: 10
    },
    bullet: {
        color: '#999'
    },
    listItemText: {
        color: '#999',
        fontSize: 12
    }
})