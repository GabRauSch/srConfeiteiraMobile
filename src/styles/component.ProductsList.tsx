import { StyleSheet } from "react-native";
import { COLORS, SHADOW } from "./global";

export const styles = StyleSheet.create({
    productItem: {
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6, 
        shadowRadius: 4,
        elevation: 2,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modal: {
        position: 'relative',
        height: '100%',
        zIndex: 999
    },
    productMainInfo: {
        fontSize: 20,
        gap: 10
    },
    productDisplay: {
        flex: 1,
        padding: 5
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
    },
    modalArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'red',
        height: 100,
        width: 100,
        zIndex: 999
    },
    productModal: {
        position: 'absolute',
        width: 100,
        backgroundColor: '#fff',
        zIndex: 999,
        ...SHADOW,
        borderRadius: 5,
        overflow: 'hidden'
    },
    productModalText: {
        padding: 10,
    },
    modalBackground: {
        
    }
});

