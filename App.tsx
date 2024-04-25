import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigation';
import AuthNavigator from './src/navigation/AuthNavigation';
import { Provider } from 'react-redux';
import store from './src/store';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </Provider>
  );
}
