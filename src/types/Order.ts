export type Order = {
    id: number,
    client: string,
    deliveryDay: Date,
    value: number,
    status: status,
    products: string[],
    delay: boolean
}

// aberto, entregue, recebido
export const statusList = [1, 2, 3];
export type status = 1 | 2 | 3