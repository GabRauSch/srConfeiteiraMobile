import { status } from "./Order";

type OrderAggregated = {
    productCategory: string,
    amount: number,
    deliveryString: string,
    status: status
}

export const orderAggregated: OrderAggregated[] = [
    {productCategory: 'Docinho', amount: 20, deliveryString: 'Hoje', status: 1},
    {productCategory: 'Bolo', amount: 20, deliveryString: 'Hoje', status: 1},
    {productCategory: 'Pastéis', amount: 20, deliveryString: 'Hoje', status: 1},
    {productCategory: 'Docinho', amount: 20, deliveryString: '24/04', status: 3},
    {productCategory: 'Pastéis', amount: 20, deliveryString: '24/04', status: 2},
];