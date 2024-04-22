import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    options: {
        gap: 15,
        flexDirection: 'row',
        padding: 5
    },
    active: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    optionItem: {
        color: '#a1a1a1'
    }
});

