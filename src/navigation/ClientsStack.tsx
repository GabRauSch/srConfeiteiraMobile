import { createStackNavigator } from "@react-navigation/stack";
import CommonAssets from "../screens/CommonAssets";
import ClientsScreen  from "../screens/Clients";
import ClientItem  from "../screens/ClientItem";
import InputEdit from "../components/InputEdit";
import NewClient from "../screens/NewClient";

const Stack = createStackNavigator();

export default ()=>(
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="clients">
            {()=>(
                <CommonAssets createUrl="newClient">
                    <ClientsScreen />
                </CommonAssets>
            )}
        </Stack.Screen>
        <Stack.Screen name="client">
            {()=>(
                <ClientItem/>
            )}
        </Stack.Screen>
        <Stack.Screen name="newClient">
            {()=>(
                <NewClient/>
            )}
        </Stack.Screen>
    </Stack.Navigator>
)