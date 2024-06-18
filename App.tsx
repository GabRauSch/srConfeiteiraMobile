import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AuthNavigator from './src/navigation/AuthNavigation';
import MainNavigation from './src/navigation/MainNavigation';
import { Provider, useDispatch } from 'react-redux';
import store from './src/store';
import * as SecureStore from 'expo-secure-store';
import { setUser } from './src/reducers/userReducer';
import { decodeToken } from './src/util/token';
import { retrieveUserData } from './src/services/User';

function MainApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkLoginStatus() {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        const decoded = decodeToken(token);
        console.log(decoded)
        if (decoded) {
          const user = await retrieveUserData(decoded.id);
          dispatch(setUser(user.data));
          setIsLoggedIn(true);
        } else {
          SecureStore.deleteItemAsync('authToken');
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    }
    checkLoginStatus();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
