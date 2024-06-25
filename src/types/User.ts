import { SubscriptionLevel } from "./Subscription"

export type User = {
    id: number,
    planId: number,
    name: string,
    email: string,
    phone: string,
    userPermission: number,
    subscriptionLevel: SubscriptionLevel,
    paymentDate: Date
}