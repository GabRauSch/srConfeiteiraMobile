import { StyleSheet } from "react-native";
import { COLORS, LABEL, SHADOW } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
        flex: 1
    }, 
    newProducts: {
        gap: 10
    },
    totalOrderValue: {
        alignItems: 'flex-end',
    },
    noProducts: {
        textAlign: 'center'
    },
    newProduct: {
        textAlign: 'center',
        ...SHADOW,
        backgroundColor: COLORS.primary,
        width: 'auto',
        borderRadius: 5,
        padding: 5,
        margin: 2,
        marginVertical: 20,
        marginBottom: 30
    },
    
    newProductText: {
        textAlign: 'center',
        color: 'white'
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
        backgroundColor: COLORS.secondary,
        borderRadius: 5,
        padding: 5,
        width: 150,
        textAlign: 'center',
        alignSelf: 'flex-end'
    }, 
    finishOrderArea: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    orderInfoStatus: {
        fontStyle: 'italic',
        alignSelf: 'center',
        fontSize: 12,
        fontWeight: 'bold'
    },
    orderInfo: {
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
        ...LABEL,
        marginVertical: 10
    },
    order: {
        padding: 5,
        paddingHorizontal: 10,
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
    },
    
    modal: {
        position: 'relative',
        height: '100%',
        zIndex: 998,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },    
    closeModal: {
        zIndex: 998,
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
    },
    searchInput: {
        flexDirection: 'row',
    },
    productItem: {
        padding: 15,
        overflow: 'hidden',
        borderRadius: 5,
    },
    productItemText: {
        fontSize: 17
    },
    
    icon: {
        padding: 10
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
})