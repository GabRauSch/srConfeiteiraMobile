import { OrderStatus } from "../util/mappers";
import { Complement } from "./OrderComplements";

export type Order = {
    orderId: number,
    client: string,
    clientId: number,
    orderNumber: number,
    deliveryDay: Date,
    value: number,
    status: OrderStatus,
    products: {id: number, name: string, quantity: number, finished: boolean}[],
    orderComplements: Complement[]
    delay: boolean,
    note: string
}
