export type OrderStatus = 0 | 1 | 2 | 3 | 4;
export const orderStatusValues: OrderStatus[] = [0, 1, 2, 3, 4]
export type Status = 'closed' | 'budget' | 'open' |'finished' |'delivered'

export const orderStatus: {id: OrderStatus, status: Status}[] = [
    {id: 0, status: 'closed'},
    {id: 1, status: 'budget'},
    {id: 2, status: 'open'},
    {id: 3, status: 'finished'},
    {id: 4, status: 'delivered'}
]
export const statusText = ['Cancelado' , 'Orçamento' , 'Aberto' ,'Finalizado' ,'Entregue']

export const mapStatusToText = (satusNumber: OrderStatus)=>{
    
    return statusText[satusNumber]
}
export const mapOrderStatus = (status: Status): any=>{
    const foundStatus = orderStatus.find((el: any)=>{
        return el.status == status
    })
    return (foundStatus as any).id 
}