import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20
    },
    title: {
        fontSize: 18
    },
    daysDisplay: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        gap: 10
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
        margin: 10
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
        flexDirection: 'row',
    }
})