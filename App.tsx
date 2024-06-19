import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AuthNavigator from './src/navigation/AuthNavigation';
import MainNavigation from './src/navigation/MainNavigation';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './src/store';
import * as SecureStore from 'expo-secure-store';
import { setUser, loggedOut } from './src/reducers/userReducer';
import { decodeToken } from './src/util/token';
import { retrieveUserData } from './src/services/User';
import { useDispatch } from 'react-redux';

function MainApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer.user)

  async function checkLoginStatus() {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      const decoded = decodeToken(token);
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
  useEffect(() => {
    setIsLoggedIn(user.id !== 0)
  }, [user]);

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
