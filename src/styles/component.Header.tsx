import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.secondary,
        marginTop: 0
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
      },
      logoContainer: {
        width: 100,
        display: 'flex',
        alignItems: 'flex-start',
        padding: 20
      },
      headerTitle: {
        color: COLORS.primary,
        fontSize: 18,
        flex: 1,
        textAlign: 'center'
      },
      profile: {
        width: 100,
        justifyContent: 'flex-end',
        tintColor: 'white',
        flexDirection: 'row',
        gap: 20
      },
      profileImage: { 
        width: 20,
        height: 20,
        tintColor: COLORS.primary
      }
});

