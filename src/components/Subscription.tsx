import { Alert, Text, View } from "react-native"
import {styles} from '../styles/component.Subscription'
import { COLORS, SUBSCRIPTIONCOLORS } from "../styles/global"
import { SubscriptionLevel, subscriptions } from "../types/Subscription"
import { getRemainingDays, remainingTimeFrom } from "../util/transform"
import { connect } from "react-redux"
import { RootState } from "../store"
import { useEffect } from "react"
import { User } from "../types/User";
import * as Clipboard from 'expo-clipboard';
import useMessage from "../hooks/useMessage"




type Props = {
    user: User,
    onMessage: (message: string, type: 'error'|'success')=>void
}

const Subscription = ({user, onMessage}: Props)=>{
    const planId = user.planId;
    const color = SUBSCRIPTIONCOLORS[subscriptions[planId]];
    const remainingDays = getRemainingDays(user.dueDate)
    
    
    const getBackground = ()=>{
        if(planId == 0) return 'black';
        if(planId == 1) return COLORS.secondary;
        if(planId == 2) return COLORS.primary;
        if(planId == 3) return '#9070E0'
    }

    const handleCopyCode = async ()=>{
        onMessage('Código copiado para a área de transferência', 'success')
        await Clipboard.setStringAsync(`Olá, utilize meu código ${user.refferalCode} para ganhar 10% de desconto no seu primeiro pagamento no App SRConfeiteira! Você pode utilizá-lo na hora do pagamento ou na hora de realizar o Login!`)
    }

    return(
        <>
        <View style={styles.subcription}>

            <Text style={styles.subcriptionTitle}>Seu plano:</Text>
            {user.paymentDate ? (
                <Text>Pago</Text>
            ) : (
                <View style={styles.payment}>
                    <Text style={{color: 'red'}}>Pagamento pendente</Text>
                    <Text style={styles.payButton}>Pagar</Text>
                </View>
            )}
            <View style={[styles.goldenSubscription, {backgroundColor: getBackground()}]}>
                <View style={[styles.subcriptionCard, {borderColor: color}]}>
                    <Text style={[styles.subscriptionName, {color: color}]}>{subscriptions[planId].toUpperCase()}</Text>
                    <Text style={[styles.subcriptionTime, {color: color}]}>pagamento em {(remainingDays && remainingDays < 0)  ? `atraso` : `${remainingDays} dias`}</Text>
                </View>
            </View>
            <View style={styles.subscriptionConfig}>
                <Text style={[styles.subscriptionText, {textDecorationLine: 'underline'}]} onPress={handleCopyCode}>Copiar código</Text>
                <Text style={styles.subscriptionText}>Alterar plano</Text>
                <Text style={{...styles.subscriptionText, color: COLORS.primary}}>Detalhes do plano</Text>
            </View>
        </View>
        </>

    )
}

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Subscription)