import { StyleSheet } from "react-native";
import { COLORS } from "./global";

export const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.primary,
        marginTop: 0
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        padding: 20
      },
      logoContainer: {
        width: 100,
        display: 'flex',
        alignItems: 'flex-start',
      },
      headerTitle: {
        color: '#fff',
        fontSize: 18,
        flex: 1,
        textAlign: 'center'
      },
      profile: {
        width: 100,
        alignItems: 'flex-end',
        tintColor: 'white'
      },
      profileImage: { 
        width: 20,
        height: 20,
        tintColor: '#fff'
      }
});

