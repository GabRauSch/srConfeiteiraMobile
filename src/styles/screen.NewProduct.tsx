
import { StyleSheet } from "react-native";
import { COLORS, LABEL, MODAL, SHADOW } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
        flex: 1,

    },
    inputsDisplay: {
        gap: 20,
    },
    
    home: {
        position: 'absolute',
        padding:10,
        zIndex: 998
    },
    activationButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    productValue: {
        textAlignVertical: 'center',
        color: '#777'
    },
    dateDisplay: {
        ...LABEL
    },
    searchInput: {
        flexDirection: 'row',
    },
    total: {
        textAlign: 'right',
        fontSize: 20
    },
    noProducts: {
        textAlign: 'center'
    },
    closeModal: {
        zIndex: 998,
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
    confirm:{
        color: 'green',
        textAlignVertical: 'center',
        fontSize: 19
    },
    newProduct: {
        textAlign: 'center',
        ...SHADOW,
        backgroundColor: 'white',
        width: 'auto',
        borderRadius: 5,
        padding: 5,
        margin: 2
    },
    dateTimePicker: {
        backgroundColor: 'red',
        color: 'red',
        borderColor: 'red',
    },
    changeInfo: {
        textAlign: 'center',
        width: 'auto',
        borderRadius: 5,
        padding: 5,
        ...SHADOW,
        backgroundColor: 'white',
        margin: 2,
    },
    changeInfoText: {
        textAlign: 'center',
        color: COLORS.primary,
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
        textAlign: 'center',
        color: COLORS.primary
    },
    productsTitle: {
        ...LABEL
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
        zIndex: 998,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    productModal: {
        backgroundColor: '#fff',
        zIndex: 998,
        ...SHADOW,
        borderRadius: 5,
        overflow: 'hidden',
        width: '100%',
        alignSelf: 'center',
        padding: 10
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
    },
    
    inputArea: {
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        flex: 1,
    },
    input: {
        flex: 1
    },
    icon: {
        padding: 10
    }
})
