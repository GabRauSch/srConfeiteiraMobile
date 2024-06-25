import { StyleSheet } from "react-native";
import { COLORS, SHADOW } from "./global";


export const styles = StyleSheet.create({
    subcription: {
        ...SHADOW,
        backgroundColor: 'white',
        padding: 10,
        gap: 10,
        borderRadius: 10
    },
    subcriptionTitle: {
        alignSelf: 'center'
    },
    goldenSubscription: {
        padding: 8,
        borderRadius: 5,
    },
    subscriptionName: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    subcriptionTime: {
    },
    subcriptionCard: {
        borderWidth: 3,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }, 
    subscriptionConfig: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    subscriptionText: {
        padding: 5,
        fontSize: 12,
        fontWeight: '500'
    },
    payment: {
        flexDirection: 'row',
        gap: 10
    },
    payButton: {
        color: COLORS.primary,
        fontStyle:'italic',
        textDecorationLine: 'underline'
    }
})