import { createStackNavigator } from "@react-navigation/stack";
import ProductItem  from "../screens/ProductItem";

const Stack = createStackNavigator();

export const PagesNavigator = ()=>{
    return (
        <Stack.Navigator>
          <Stack.Screen name="product/:id" component={ProductItem} />
        </Stack.Navigator>
      );
}