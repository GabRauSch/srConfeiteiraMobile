import { createStackNavigator } from "@react-navigation/stack";
import CommonAssets from "../screens/CommonAssets";
import OrdersScreen  from "../screens/Orders";
import OrderItem from "../screens/OrderItem";
import OrdersByProductCategory from "../screens/OrdersByProductCategory";
import AppNavigator from "./AppNavigation";
import Profile from "../screens/Profile";
import Header  from "../components/Header";
import { useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../store";
import { User } from "../types/User";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

type Props = {
    user: User | null
}

const MainNavigation = ({user}: Props)=>{
    const navigation = useNavigation() as any
    useEffect(()=>{
        if(!user) return navigation.navigate('AuthNavigator')
    }, [])
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="main" component={AppNavigator}></Stack.Screen>
            <Stack.Screen options={{headerShown: true, header: ()=>(<Header />)}} name="profile" component={Profile}></Stack.Screen>
        </Stack.Navigator>
    )
}

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(MainNavigation)