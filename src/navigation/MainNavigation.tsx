import { createStackNavigator } from "@react-navigation/stack";
import { ProductItem } from "../screens/ProductItem";
import { ProductsScreen } from "../screens/Products";
import CommonAssets from "../screens/CommonAssets";
import OrdersScreen  from "../screens/Orders";
import OrderItem from "../screens/OrderItem";
import OrdersByProductCategory from "../screens/OrdersByProductCategory";
import AppNavigator from "./AppNavigation";
import Profile from "../screens/Profile";
import { Header } from "../components/Header";

const Stack = createStackNavigator();

export default ()=>(
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="main" component={AppNavigator}></Stack.Screen>
        <Stack.Screen options={{headerShown: true, header: ()=>(<Header />)}} name="profile" component={Profile}></Stack.Screen>
    </Stack.Navigator>
)