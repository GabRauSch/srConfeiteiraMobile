import { createStackNavigator } from "@react-navigation/stack";
import { ProductItem } from "../screens/ProductItem";
import { ProductsScreen } from "../screens/Products";
import CommonAssets from "../screens/CommonAssets";
import { OrdersScreen } from "../screens/Orders";

const Stack = createStackNavigator();

export default ()=>(
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="orders">
            {()=>(
                <CommonAssets>
                    <OrdersScreen />
                </CommonAssets>
            )}
        </Stack.Screen>
        {/* <Stack.Screen name="order" component={ProductItem}></Stack.Screen> */}
    </Stack.Navigator>
)