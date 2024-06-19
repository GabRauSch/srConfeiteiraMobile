import { StyleSheet } from "react-native";
import { COLORS, SHADOW } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20
    },
    title: {
        fontSize: 18
    },
    paymentsList: {
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 10,
        ...SHADOW
    },
    orderPayment: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    daysDisplay: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    daysView: {
        flexDirection: 'row',
        gap: 5,
        padding: 3
    },
    day: {
        width: 100,
        height: 100,
        backgroundColor: '#fbfbfb', 
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6, 
        shadowRadius: 4,
        elevation: 3, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',  
        justifyContent: 'space-between',
        padding: 10,
        borderLeftWidth:  7,
        borderRightWidth: 7,
        borderRightColor: '#fbfbfb',
        marginBottom: 10
    },
    dayName: {
        textAlign: 'center',
        fontSize: 12,
        bottom: 0,
        width: '100%'
    },
    ordersArea: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        gap: 5
    },
    order: {
        width: 10,
        height: 10,
        borderRadius: 2
    },
    finished:{
        backgroundColor: "#090"
    },
    pendent: {
        backgroundColor: '#fc0'
    },
    cardsDisplay: {
        
    },
    skeletonTitle: {
        backgroundColor: 'gray'
    }
})