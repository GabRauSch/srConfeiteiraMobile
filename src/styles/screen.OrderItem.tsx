import { StyleSheet } from "react-native";
import { COLORS, SHADOW } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
        flex: 1
    }, 
    totalOrderValue: {
        alignItems: 'flex-end',
    },
    save: {
        alignSelf: 'flex-end',
        color: COLORS.primary,
        fontWeight: 'bold'
    },
    orderPrice: {
        fontSize: 10,
    },
    orderInfoTitle: {
        alignSelf: 'center'
    },
    orderInfoText: {
    },
    finishOrder: {
        color: '#fff', 
        fontWeight: 'bold', 
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 5,
        width: 150,
        textAlign: 'center',
        alignSelf: 'flex-end'
    }, 
    finishOrderArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    orderInfoStatus: {
        fontStyle: 'italic',
        alignSelf: 'flex-end',
        fontSize: 12,
        fontWeight: 'bold'
    },
    orderInfo: {
        marginVertical: 10,
        gap: 10,
        padding: 10,
        ...SHADOW,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    orders: {
        gap: 10
    },
    separator: {
        color: COLORS.primary,
        opacity: 0.5,
        marginVertical: 10
    },
    order: {
        ...SHADOW,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    orderTitle: {
        fontWeight: 'bold',
        color: '#555',
        fontSize: 16,
        flex: 1
    }
})