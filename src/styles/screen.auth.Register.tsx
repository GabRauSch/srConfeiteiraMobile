import { StyleSheet } from "react-native";
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
    marginBottom: 100,
    fontSize: 24,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    backgroundColor: '#fadfe6',
    borderColor: '#fadfe6',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#f9507e',
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
    marginTop: 35,
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: '600',
    letterSpacing: 1.3,
    color: '#a78384'
  }
});

