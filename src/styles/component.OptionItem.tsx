import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    
    active: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    optionItem: {
        color: '#a1a1a1',
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});

