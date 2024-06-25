export type SubscriptionLevel = -1 | 0 | 1 | 2 | 3;
export type Subscription = {
    subscriptionLevel: SubscriptionLevel,
    paymentDate: Date
}

export const subscriptions: string[] = ['simples', 'prata', 'gold', 'srconfeiteira']


