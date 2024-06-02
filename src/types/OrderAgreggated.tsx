import { status } from "./Order";

export type OrderAggregated = {
    id: number,
    name: string,
    amount: number,
    deliveryDate: Date,
    status: status
}