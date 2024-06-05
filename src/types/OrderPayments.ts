export type OrderPayments = {
    id: number, 
    orderId: number,
    value: number,
    date: Date,
    paid: boolean
}