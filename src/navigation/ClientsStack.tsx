import { createStackNavigator } from "@react-navigation/stack";
import CommonAssets from "../screens/CommonAssets";
import ClientsScreen  from "../screens/Clients";
import { EditItem } from "../screens/EditItem";
import InputEdit from "../components/InputEdit";

const Stack = createStackNavigator();

export default ()=>(
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="client">
            {()=>(
                <EditItem/>
            )}
        </Stack.Screen>
        <Stack.Screen name="clients">
            {()=>(
                <CommonAssets>
                    <ClientsScreen />
                </CommonAssets>
            )}
        </Stack.Screen>
    </Stack.Navigator>
)