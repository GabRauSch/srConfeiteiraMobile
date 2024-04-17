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

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
      <Tab.Navigator
        
        screenOptions={({route})=>({
          tabBarStyle: {
            backgroundColor: '#F9507E'
          },
          tabBarIcon: ({focused})=>{
            let icon: string;
            let label: string;
            switch (route.name) {
              case "Home":
                icon = 'home';
                label = 'Home';
                break;
              case "Receipts":
                icon = 'file-text';
                label = 'Receitas';
                break;
              case "Clients":
                icon = 'users';
                label = 'Clientes'
                break;
              case "Itens":
                icon = 'list';
                label = "Itens"
                break;
              case "Orders":
                icon = 'shopping-cart';
                label =  'Pedidos'
                break;
              case "Purchases":
                icon ='shopping-basket';
                label = 'Vendas'
                break;
              default:
                icon = '';
                label = '';
                break;
            }
            return(
              <>
              <Icon name={icon} size={15} color={!focused ? '#FADFE6' : '#848'} />
              <Text style={{color: '#fff', fontSize: 10}} >{label}</Text>
            </>
            ) 
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} 
          options={{ tabBarShowLabel: false, headerShown: false}}
        />
          <Tab.Screen name="Receipts" component={ReceiptsScreen} 
            options={{ tabBarShowLabel: false, headerShown: false}}
          />
        <Tab.Screen name="Clients" component={ClientsScreen} 
          options={{ tabBarShowLabel: false, headerShown: false}}
        />
        <Tab.Screen name="Itens" component={ItensScreen} 
          options={{ tabBarShowLabel: false, headerShown: false}}
        />
        <Tab.Screen name="Orders" component={OrdersScreen} 
          options={{ tabBarShowLabel: false, headerShown: false}}
        />
        <Tab.Screen name="Purchases" component={PurchasesScreen} 
          options={{ tabBarShowLabel: false, headerShown: false}}
        />
      </Tab.Navigator>
  );
};

export default AppNavigator;
