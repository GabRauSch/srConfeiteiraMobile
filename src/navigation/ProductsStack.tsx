import { createStackNavigator } from "@react-navigation/stack";
import { ProductItem } from "../screens/ProductItem";
import { ProductsScreen } from "../screens/Products";

const Stack = createStackNavigator();

export default ()=>(
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="products" component={ProductsScreen}></Stack.Screen>
        <Stack.Screen name="product" component={ProductItem}></Stack.Screen>
    </Stack.Navigator>
)