import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ConfirmationCode from '../screens/auth/ConfrimationCode'

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} 
        options={{ headerShown: false}}
        />
        <Stack.Screen name="Register" component={Register} 
        options={{ headerShown: false}}
        />
        <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} 
        options={{ headerShown: false}}
        />
      </Stack.Navigator>
  );
};

export default AuthNavigator;
