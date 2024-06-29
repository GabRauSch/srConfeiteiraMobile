import { createStackNavigator } from "@react-navigation/stack";
import ProductItem  from "../screens/ProductItem";
import ProductsScreen  from "../screens/Products";
import CommonAssets from "../screens/CommonAssets";
import MoreScreen from "../screens/More";

const Stack = createStackNavigator();

export default ()=>(
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="more" component={MoreScreen}/>
        {/* <Stack.Screen name="product" component={ProductItem}></Stack.Screen> */}
    </Stack.Navigator>
)