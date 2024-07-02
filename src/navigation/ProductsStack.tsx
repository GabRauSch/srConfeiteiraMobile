import { createStackNavigator } from "@react-navigation/stack";
import ProductItem from "../screens/ProductItem";
import ProductsScreen from "../screens/Products";
import CommonAssets from "../screens/CommonAssets";
import NewProduct from "../screens/NewProduct";
import Categories from "../screens/Categories";
import NewCategory from "../screens/newCategory";

const Stack = createStackNavigator();

export default ()=>(
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="products">
            {()=>(
                <CommonAssets createUrl="newProduct">
                    <ProductsScreen />
                </CommonAssets>
            )}
        </Stack.Screen>
        <Stack.Screen name="categories" >
            {()=>(
                <CommonAssets createUrl="newCategory">
                    <Categories />
                </CommonAssets>
            )}
        </Stack.Screen>
        <Stack.Screen name="product" component={ProductItem}></Stack.Screen>
        <Stack.Screen name="newCategory" component={NewCategory}></Stack.Screen>
        <Stack.Screen name="newProduct" component={NewProduct}></Stack.Screen>
    </Stack.Navigator>
)