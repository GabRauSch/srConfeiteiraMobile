import { StyleSheet } from "react-native";
import { COLORS, SHADOW } from "./global";

export const styles = StyleSheet.create({
    client: {
        ...SHADOW,
        backgroundColor: '#fff',
        width: 160,
        borderRadius: 10,
        position: 'relative',
        padding: 10,
        flex: 1,
    },
    clientInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    changeView: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    clientsDisplay: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        padding: 5
    },
    name:{
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary
    },
    time: {
        fontStyle: 'italic',
        fontSize: 13,
        textAlign: 'center',
        color: COLORS.primary
    },
    clientList: {
        padding: 5,
    },
    unitsDisplay: {
        padding: 5
    },
    clientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
    separator: {
        color: COLORS.primary,
        opacity: 0.5,
        marginVertical: 10
    },
    info: {
        color: '#999',
        fontSize: 12
    },
    listItemText: {
        color: '#999',
        fontSize: 12
    }
})