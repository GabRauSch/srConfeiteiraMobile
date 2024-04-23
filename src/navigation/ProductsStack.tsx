import { createStackNavigator } from "@react-navigation/stack";
import { ProductItem } from "../screens/ProductItem";
import { ProductsScreen } from "../screens/Products";
import CommonAssets from "../screens/CommonAssets";

const Stack = createStackNavigator();

export default ()=>(
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="product" component={ProductItem}></Stack.Screen>
        <Stack.Screen name="products">
            {()=>(
                <CommonAssets>
                    <ProductsScreen />
                </CommonAssets>
            )}
        </Stack.Screen>
    </Stack.Navigator>
)