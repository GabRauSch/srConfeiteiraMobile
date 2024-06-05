import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 999
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        borderRadius: 5,
        flex: 1,
    },
    cancelButotn: {
        borderColor: COLORS.primary,
        borderWidth: 2,
        paddingVertical: 10,
        borderRadius: 5,
        flex: 1,
    },
    cancelButtonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center'
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    buttons: {
        flexDirection: 'row',
        gap: 10
    }
});
