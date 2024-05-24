import { createStackNavigator } from "@react-navigation/stack";
import CommonAssets from "../screens/CommonAssets";
import OrdersScreen  from "../screens/Orders";
import OrderItem from "../screens/OrderItem";
import OrdersByProductCategory from "../screens/OrdersByProductCategory";
import NewOrder from "../screens/NewOrder";

const Stack = createStackNavigator();

export default ()=>(
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
        >
        <Stack.Screen name="newOrder" component={NewOrder}></Stack.Screen>
        <Stack.Screen name="orders">
            {()=>(
                <CommonAssets>
                    <OrdersScreen />
                </CommonAssets>
            )}
        </Stack.Screen>
        <Stack.Screen name="ordersByProductCategory" component={OrdersByProductCategory}></Stack.Screen>
        <Stack.Screen name="order" component={OrderItem}></Stack.Screen>
    </Stack.Navigator>
)