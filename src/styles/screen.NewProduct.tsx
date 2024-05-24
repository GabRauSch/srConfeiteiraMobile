
import { StyleSheet } from "react-native";
import { COLORS, MODAL, SHADOW } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
        flex: 1,
    },
    inputsDisplay: {
        gap: 20,
    },
    productValue: {
        textAlignVertical: 'center',
        color: '#777'
    },
    closeModal: {
        zIndex: 999,
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
    },
    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    products: {
        padding: 10,
        gap: 10
    },
    actions: {
        flexDirection: 'row',
        gap: 10
    },
    productRemove: {
        color: 'red',
        textAlignVertical: 'center',
        fontSize: 21
    },
    newProduct: {
        textAlign: 'center',
        backgroundColor: COLORS.secondary,
        width: 'auto',
        borderRadius: 5,
        padding: 5,
    },
    product: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    productItem: {
        padding: 15,
        overflow: 'hidden',
        borderRadius: 5,
    },
    productItemText: {
        fontSize: 17
    },
    newProductText: {
        textAlign: 'center'
    },
    productsTitle: {
        fontSize: 18
    },
    productName: {
        textAlignVertical: 'center'
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 10,
        ...SHADOW,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 1,
        overflow: 'hidden'
    },
    modal: {
        position: 'relative',
        height: '100%',
        zIndex: 999,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    productModal: {
        backgroundColor: '#fff',
        zIndex: 999,
        ...SHADOW,
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        alignSelf: 'center'
    },
    productModalContainer: {
        maxHeight: '80%',
        width: '80%',
    },
    productModalText: {
        padding: 10,
    },
    createButton: {
        marginBottom: 50
    }
})
