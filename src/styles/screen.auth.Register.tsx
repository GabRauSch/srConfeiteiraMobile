import { StyleSheet } from "react-native";
import { COLORS } from "./global";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcome: {
    color: '#a78384',
    fontSize: 24,
    marginVertical: 40
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    backgroundColor: COLORS.secondary,
    borderColor: '#fadfe6',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  loginText:{
    marginVertical: 20,
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: '600',
    letterSpacing: 1.3,
    color: COLORS.primary
  }
});

