import { Text, View } from "react-native"
import {styles} from '../styles/component.Subscription'
import { COLORS } from "../styles/global"
import { Subscription, SubscriptionLevel, subscriptions } from "../types/Subscription"
import { remainingTimeFrom } from "../util/transform"
import { connect } from "react-redux"
import { RootState } from "../store"
import { useEffect } from "react"
import { User } from "../types/User"

type Props = {
    user: User
}

const Subscription = ({user}: Props)=>{
    return(
        <View style={styles.subcription}>
            <Text style={styles.subcriptionTitle}>Seu plano:</Text>
            <View style={styles.goldenSubscription}>
                <View style={styles.subcriptionCard}>
                    <Text style={styles.subscriptionName}>{subscriptions[user.subscriptionLevel].toUpperCase()}</Text>
                    <Text style={styles.subcriptionTime}>{remainingTimeFrom(user.paymentDate)}</Text>
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