import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#fbfbfb', 
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6, 
        shadowRadius: 4,
        elevation: 3, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',  
        justifyContent: 'space-between',
        padding: 10,
        margin: 10,
        gap: 10
    },
    title: {
        fontSize: 13,
        color: '#555'
    },
    value: {
        fontSize: 23,
        color: '#555'
    }
});

