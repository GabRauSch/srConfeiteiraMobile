import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20,
        flex: 1
    }, 
    products: {
        gap: 10,
        padding: 5
    },
    addButonArea: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        alignItems: 'flex-end'
    },
    separator: {
        color: COLORS.primary,
        opacity: 0.5,
        marginBottom: 10
    },
    scroll: {
        padding: 4,
    },
    categoryDivision: {
    },
    expandButton: {
        alignSelf: 'center',
        color: '#888',
        padding: 7,
    },
    options: {
        flexDirection: 'row',
        padding: 5
    },
})