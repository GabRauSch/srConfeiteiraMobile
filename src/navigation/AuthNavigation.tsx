import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

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
      </Stack.Navigator>
  );
};

export default AuthNavigator;
