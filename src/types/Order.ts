export type Order = {
    orderId: number,
    client: string,
    clientId: number,
    deliveryDay: Date,
    value: number,
    status: status,
    products: {id: number, name: string, quantity: number, finished: boolean}[],
    delay: boolean
}

// aberto, feito, entregue
export const statusList = [0,1,2];
export type status = 0 | 1 | 2