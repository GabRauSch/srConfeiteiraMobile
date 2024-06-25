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
        backgroundColor: COLORS.primary
    },
    subscriptionName: {
        fontSize: 23,
        color: '#fee1aa',
        fontWeight: 'bold',
    },
    subcriptionTime: {
        color: '#fee1aa',
    },
    subcriptionCard: {
        borderWidth: 3,
        padding: 10,
        borderColor: '#fee1aa',
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
})