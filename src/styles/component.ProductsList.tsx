import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    productItem: {
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6, 
        shadowRadius: 4,
        elevation: 2,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    productMainInfo: {
        fontSize: 20,
        gap: 10
    },
    productDisplay: {
    },
    productName: {
        fontWeight: '500',
        fontSize: 15
    },
    productDescription: {
        fontSize: 10,
        color: '#aaa'
    },
    productInfo: {
        fontSize: 12,
    },
    revenue: {
        flexDirection: 'row',
        gap: 10
    },
    value: {
        fontWeight: '500',
        fontSize: 17
    }
});

