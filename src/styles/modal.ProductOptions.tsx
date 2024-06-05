import { StyleSheet } from "react-native";
import { COLORS, SHADOW } from "./global";

export const styles = StyleSheet.create({
    modal: {
        position: 'relative',
        height: '100%',
        zIndex: 999
    },
    cardList: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 150,
        bottom: 130,
        right: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6, 
        shadowRadius: 4,
        elevation: 3, 
        zIndex: 999,
        overflow: 'hidden'
    },
    optionsList: {
        ...SHADOW,
        backgroundColor: 'white',
        borderRadius: 5,
        overflow: 'hidden',
    },
    optionText: {
        padding: 10,
        paddingHorizontal: 20
    }
})