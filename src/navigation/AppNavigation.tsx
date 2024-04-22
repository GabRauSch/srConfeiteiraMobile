import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/Home';
import { useState } from 'react';
import { ReceiptsScreen } from '../screens/Receipts';
import { ClientsScreen } from '../screens/Clients';
import { ItensScreen } from '../screens/Itens';
import { OrdersScreen } from '../screens/Orders';
import { PurchasesScreen } from '../screens/Purchases';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native';
import { Header } from '../components/Header';
import { ProductsScreen } from '../screens/Products';
import {COLORS} from '../styles/global'

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
      <Tab.Navigator
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
              <Icon name={icon} size={18} color={!focused ? COLORS.primary : '#faf'} />
              <Text style={{color: `${!focused ? COLORS.primary  : '#faf'}`, fontSize: 14}}>{label}</Text>
            </>
            ) 
          }
        })}
      >
        <Tab.Screen name="Products" component={ProductsScreen} 
          options={{tabBarShowLabel: false}}/>
        <Tab.Screen name="Home" component={HomeScreen} 
          options={{ tabBarShowLabel: false}}
        />
        <Tab.Screen name="Orders" component={OrdersScreen} 
          options={{ tabBarShowLabel: false}}
        />
        <Tab.Screen name="Clients" component={ClientsScreen} 
          options={{ tabBarShowLabel: false}}
        />
        <Tab.Screen name="More" component={PurchasesScreen} 
          options={{ tabBarShowLabel: false}}
        />
      </Tab.Navigator>
  );
};

export default AppNavigator;
