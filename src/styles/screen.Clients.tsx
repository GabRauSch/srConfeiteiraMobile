import { StyleSheet } from "react-native";
import { COLORS, LABEL, SHADOW } from "./global";

export const styles = StyleSheet.create({
    client: {
        ...SHADOW,
        backgroundColor: '#fff',
        borderRadius: 10,
        position: 'relative',
        padding: 10,
        flex: 1,
    },
    options: {
        flexDirection: 'row'
    },
    scroll: {
        gap: 10,
    },
    scrollView: {
        gap: 10,
        padding: 10
    },
    messageNoRegister: {
        color: '#777',
        textAlign: 'center'
    },
    modalBackground: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0)",
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
    dots: {
        paddingVertical: 25,
        paddingLeft: 20,
        paddingRight: 10
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
        ...LABEL
    },
    info: {
        color: '#999',
        fontSize: 12
    },
    listItemText: {
        color: '#999',
        fontSize: 12
    },
    clientModal: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        width: 100,
        backgroundColor: '#fff',
        zIndex: 10,
        ...SHADOW,
        borderRadius: 5,
        overflow: 'hidden'
    },
    clientModalText: {
        padding: 10,
    }
})