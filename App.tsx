import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigation';
import AuthNavigator from './src/navigation/AuthNavigation';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
      <NavigationContainer>
        {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
  );
}
