import { StyleSheet } from "react-native";
import { COLORS, LABEL, SHADOW } from "./global";

export const styles = StyleSheet.create({
    order: {
        ...SHADOW,
        borderColor: '#c00',
        backgroundColor: '#fff',
        width: 150,
        borderRadius: 10,
        position: 'relative',
        padding: 10,
        margin: 2,
        marginRight: 5,
        marginVertical: 15
    },  
    options: {
        flexDirection: 'row',
    },
    page: {
        padding: 10,
        flex: 1
    },
    messageNoRegister: {
        color: '#777',
        textAlign: 'center'
    },
    changeView: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    ordersDisplay: {
        flexDirection: 'row',
        flexWrap: 'wrap'
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
        fontSize: 13,
        flex: 1
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
        ...LABEL,
        color: COLORS.primary,
    },
    bullet: {
        color: '#999'
    },
    listItemText: {
        color: '#999',
        fontSize: 12,
        marginBottom: 2
    }
})