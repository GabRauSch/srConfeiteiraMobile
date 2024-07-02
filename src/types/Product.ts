export type Product = {
    id: number,
    name: string,
    description: string,
    value: number,
    productionCost:number,
    photo: string,
    size: number,
    format: string,
    categoryId: number
}

export type SelectedProducts = {
    id: number,
    name: string,
    value: number,
    quantity: number
}