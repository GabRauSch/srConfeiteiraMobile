import { createStackNavigator } from "@react-navigation/stack";
import CommonAssets from "../screens/CommonAssets";
import OrdersScreen  from "../screens/Orders";
import OrderItem from "../screens/OrderItem";
import OrdersByProductCategory from "../screens/OrdersByProductCategory";
import NewOrder from "../screens/NewOrder";
import OrderPayment from "../components/OrderPayment";

const Stack = createStackNavigator();

export default ()=>(
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
        >
        <Stack.Screen name="orders">
            {()=>(
                <CommonAssets createUrl="newOrder">
                    <OrdersScreen />
                </CommonAssets>
            )}
        </Stack.Screen>
        <Stack.Screen name="order" component={OrderItem}></Stack.Screen>
        <Stack.Screen name="orderPayment" component={OrderPayment}></Stack.Screen>
        <Stack.Screen name="newOrder" component={NewOrder}></Stack.Screen>
        <Stack.Screen name="ordersByProductCategory" component={OrdersByProductCategory}></Stack.Screen>
    </Stack.Navigator>
)