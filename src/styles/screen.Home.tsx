import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    page: {
        padding: 20
    },
    title: {
        fontSize: 18
    },
    daysDisplay: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        gap: 10
    },
    day: {
        width: 70,
        height: 100,
        backgroundColor: '#fbfbfb', 
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6, 
        shadowRadius: 4,
        elevation: 3, 
        position: 'relative',
        margin: 10
    },
    dayName: {
        textAlign: 'center',
        fontSize: 12,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    horizontalLine: {
        height: 1,
        width: '80%',
        backgroundColor: COLORS.grayScalePrimary,
        margin: 10,
        alignSelf: 'center'
    }
})