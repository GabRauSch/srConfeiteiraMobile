import { StyleSheet } from "react-native";
import { COLORS, SHADOW } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
        flex: 1
    },  
    save: {
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        padding: 20,
        gap: 10,
    },
    home: {
        position: 'absolute',
        padding: 20
    },
   
    profitDisplay: {
        backgroundColor: COLORS.primary,
        width: 120,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        padding: 10,
    },
    imageDisplay: {
        position: 'relative',
        alignSelf: 'center',
        alignItems: 'center',
        ...SHADOW,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10000,
        aspectRatio: 1/1,
        justifyContent: 'center',
        width: 150,
    },
    pencil: {
        position: 'absolute',
        bottom: 10,
        right: 0
    },
    itemImage: {
        width: 100,
        height: 100
    },
    productInfo: {
        gap: 30
    },
    profileInfo: {
        marginTop: 20,
        gap: 20
    }, 
    editArea: {
        marginTop: 30,
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