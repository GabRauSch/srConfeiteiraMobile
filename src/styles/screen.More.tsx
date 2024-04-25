import { StyleSheet } from "react-native";
import { COLORS, SHADOW } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
        flex: 1,
        gap: 10
    }, 
    featuresDisplay: {
        gap: 10,
    },
    moreFeature: {
        ...SHADOW,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 20
    }, 
    moreFeatureText: {
        fontSize: 17
    }, 
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
    editItem: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderRadius: 10,
        padding: 7
    },
    editItemText: {
        fontSize: 14,
        color: COLORS.primary,
    }
})