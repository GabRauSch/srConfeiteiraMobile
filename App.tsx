import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigation';
import AuthNavigator from './src/navigation/AuthNavigation';
import { Provider } from 'react-redux';
import store from './src/store';
import MainNavigation from './src/navigation/MainNavigation';
import Message from './src/modals/Message';
import { SafeAreaView } from 'react-native';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <Provider store={store}>
        <NavigationContainer>
            {isLoggedIn ? <MainNavigation /> : <AuthNavigator />}
        </NavigationContainer>
    </Provider>
  );
}
