import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native';
import { Header } from '../components/Header';
import {COLORS} from '../styles/global'
import ProductsStack from './ProductsStack';
import OrdersStack from './OrdersStack';
import ClientsStack from './ClientsStack';
import MoreStack from './MoreStack';
import { User } from '../types/User';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({route})=>({
          header: ()=><Header></Header>,
          tabBarStyle: {
            backgroundColor: COLORS.secondary,
            height: 60
          },
          tabBarIcon: ({focused})=>{
            let icon: string;
            let label: string;
            switch (route.name) {
              case "Home":
                icon = 'home';
                label = 'Home';
                break;
              case "Products":
                icon = 'shopping-bag';
                label = 'Produtos';
              break;
              case "Clients":
                icon = 'users';
                label = 'Clientes'
                break
              case "Orders":
                icon = 'shopping-cart';
                label =  'Pedidos'
                break;
              case "More":
                icon ='ellipsis-h';
                label = 'Mais'
                break;
              default:
                icon = '';
                label = '';
                break;
            }
            return(
              <>
              <Icon name={icon} size={18} color={!focused ? COLORS.primary : COLORS.primaryPressed} />
              <Text style={{color: `${!focused ? COLORS.primary  : COLORS.primaryPressed}`, fontSize: 14}}>{label}</Text>
            </>
            ) 
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} 
          options={{ tabBarShowLabel: false}}
        />
        <Tab.Screen name="Orders" component={OrdersStack} 
          options={{ tabBarShowLabel: false}}
        />
        <Tab.Screen  name="Products" component={ProductsStack} 
          options={{tabBarShowLabel: false}}/>
        <Tab.Screen name="Clients" component={ClientsStack} 
          options={{ tabBarShowLabel: false}}
        />
        <Tab.Screen name="More" component={MoreStack} 
          options={{ tabBarShowLabel: false}}
        />
      </Tab.Navigator>
  );
};

export default AppNavigator;
