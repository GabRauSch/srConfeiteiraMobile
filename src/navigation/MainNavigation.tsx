import { createStackNavigator } from "@react-navigation/stack";
import CommonAssets from "../screens/CommonAssets";
import OrdersScreen  from "../screens/Orders";
import OrderItem from "../screens/OrderItem";
import OrdersByProductCategory from "../screens/OrdersByProductCategory";
import AppNavigator from "./AppNavigation";
import Profile from "../screens/Profile";
import Header  from "../components/Header";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../store";
import { User } from "../types/User";
import { useNavigation } from "@react-navigation/native";
import { Alert, Image, Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { getRemainingDays } from "../util/transform";
import {styles } from '../styles/navigation.MainNavigation'
import AddButton from "../components/AddButton";
import CreateButton from "../components/CreateButton";
import * as Clipboard from 'expo-clipboard';
import { COLORS } from "../styles/global";


const Stack = createStackNavigator();

type Props = {
    user: User
}

const MainNavigation = ({user}: Props)=>{
    const navigation = useNavigation() as any
    const userPlanPayment = getRemainingDays(user?.dueDate as Date) as number;
    const [planPaymentModal, setPlanPaymentModal] = useState(false)

    useEffect(()=>{
        if(!user) return navigation.navigate('AuthNavigator');
        if(userPlanPayment < 0) setPlanPaymentModal(true)
    }, [])

    const handleCopyLink = async ()=>{
        Alert.alert(
            'Link copiado!',
            'O Link foi copiado! Realize o pagamento e aguarde confirmação por email.',
            [{ text: 'OK' }]
          );
        await Clipboard.setStringAsync(`00020126580014BR.GOV.BCB.PIX0136cf1b2e48-3a6d-4b0f-bfc5-17893bc048ef52040000530398654040.015802BR5916Flavio Schoenell6009SAO PAULO62140510zguSKLKrTd63047511`)
        if(5 + userPlanPayment > 0){
            console.log(5 + userPlanPayment)
            setPlanPaymentModal(false)
        }
    }

    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="main">
                {()=>(
                <>
                    <Modal
                        transparent={true}
                        visible={planPaymentModal}
                        onRequestClose={() => setPlanPaymentModal(false)}
                    >
                        <TouchableOpacity style={styles.modal} onPress={() =>{setPlanPaymentModal(false)}} activeOpacity={1}>
                            <View style={{width: '80%', backgroundColor: 'white', padding: 20, gap: 10, borderRadius: 5, zIndex: 998, alignItems: 'center'}}>
                                <Text style={{fontSize: 30, fontWeight: 'bold', color: COLORS.primary}}>Aviso!</Text>
                                <Image source={require('../assets/images/logo.png')} style={{width: 100, height: 100}} />
                                {(userPlanPayment > 0 && userPlanPayment < 5) && (
                                    <>
                                        <Text>Seu plano expirará em {userPlanPayment} dia(s)</Text>
                                        <Text>Realize o pagamento copiando o link abaixo</Text>
                                        <Text>Pague em até {5 + userPlanPayment} dia(s) para que não haja o bloqueio temporário da conta</Text>
                                    </>
                                )}
                                {(userPlanPayment <= 0 && userPlanPayment > -5) && (
                                        <>
                                            <Text>Seu plano expirou faz(em) {userPlanPayment.toString().replace('-', '')} dia(s).</Text>
                                            <Text>Realize o pagamento em até {5 + userPlanPayment} dia(s) para que não haja o bloqueio temporário da conta</Text>
                                        </>
                                )} 
                                {userPlanPayment <= -5 && (
                                    <>
                                        <Text>Seu plano expirou faz(em) {userPlanPayment.toString().replace('-', '')} dia(s).</Text>
                                        <Text>Sua conta está bloqueada, realize o pagamento para continuar utilizando o app</Text>
                                        <Text>Pague para liberar sua conta</Text>
                                    </>
                                )}
                                <CreateButton action={()=>{handleCopyLink()}} text="Copie o link de pagamento" />
                            </View>
                        </TouchableOpacity>
                    </Modal>
                    <AppNavigator/>
                </>
                )}
            </Stack.Screen>
            <Stack.Screen options={{headerShown: true, header: ()=>(<Header />)}} name="profile" component={Profile}></Stack.Screen>
        </Stack.Navigator>
    )
}

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(MainNavigation)