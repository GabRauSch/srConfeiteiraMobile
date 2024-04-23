import { createStackNavigator } from "@react-navigation/stack";
import { ProductItem } from "../screens/ProductItem";
import { ProductsScreen } from "../screens/Products";
import CommonAssets from "../screens/CommonAssets";
import { OrdersScreen } from "../screens/Orders";
import { ClientsScreen } from "../screens/Clients";

const Stack = createStackNavigator();

export default ()=>(
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="clients">
            {()=>(
                <CommonAssets>
                    <ClientsScreen />
                </CommonAssets>
            )}
        </Stack.Screen>
        {/* <Stack.Screen name="client" component={ProductItem}></Stack.Screen> */}
    </Stack.Navigator>
)