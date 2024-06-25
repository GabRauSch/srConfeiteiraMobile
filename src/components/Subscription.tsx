import { Text, View } from "react-native"
import {styles} from '../styles/component.Subscription'
import { COLORS, SUBSCRIPTIONCOLORS } from "../styles/global"
import { SubscriptionLevel, subscriptions } from "../types/Subscription"
import { getRemainingDays, remainingTimeFrom } from "../util/transform"
import { connect } from "react-redux"
import { RootState } from "../store"
import { useEffect } from "react"
import { User } from "../types/User"

type Props = {
    user: User
}

const Subscription = ({user}: Props)=>{
    const planId = user.planId;
    const color = SUBSCRIPTIONCOLORS[subscriptions[planId]];
    
    const getBackground = ()=>{
        if(planId == 0) return 'black';
        if(planId == 1) return COLORS.secondary;
        if(planId == 2) return COLORS.primary;
        if(planId == 3) return '#9070E0'
    }

    return(
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
                    <Text style={[styles.subcriptionTime, {color: color}]}>{getRemainingDays(user.dueDate)} restantes</Text>
                </View>
            </View>
            <View style={styles.subscriptionConfig}>
                <Text style={styles.subscriptionText}>Alterar plano</Text>
                <Text style={{...styles.subscriptionText, color: COLORS.primary}}>Detalhes do plano</Text>
            </View>
        </View>
    )
}

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(Subscription)