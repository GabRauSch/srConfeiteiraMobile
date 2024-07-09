import { StyleSheet } from "react-native";
import { COLORS, SHADOW } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    profit: {
        position: 'absolute',
        right: 0,
        top: 200,
        zIndex: 991
    },
    profitChange: {

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
    save: {
        position: 'absolute',
        right: 0,
        padding: 20,
        color: COLORS.primary,
        fontWeight: 'bold',
        zIndex: 998
    },
    profitDisplay: {
        backgroundColor: COLORS.primary,
        width: 120,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profitText: {
        fontSize: 17,
        color: '#fff'
    },
    imageDisplay: {
        alignItems: 'center',
        padding: 20
    },
    itemImage: {
        width: 200,
        height: 200
    },
    productInfo: {
        gap: 20,
        marginBottom: 50
    },
    newCategoryContainer: {
        paddingBottom: 20
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
    
    searchInput: {
        flexDirection: 'row',
    },
});