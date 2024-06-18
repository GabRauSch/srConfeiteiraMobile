import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AppNavigator from './src/navigation/AppNavigation';
import AuthNavigator from './src/navigation/AuthNavigation';
import { Provider } from 'react-redux';
import store from './src/store';
import MainNavigation from './src/navigation/MainNavigation';
import { SafeAreaView } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function checkLoginStatus() {
      const token = await SecureStore.getItemAsync('authToken');
      setIsLoggedIn(!!token); 
    }
    checkLoginStatus();
  }, []);
  return (
    <Provider store={store}>
        <NavigationContainer>
            {isLoggedIn ? <MainNavigation /> : <AuthNavigator />}
        </NavigationContainer>
    </Provider>
  );
}
