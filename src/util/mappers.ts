export const mapOrderStatus = (status?: 0 | 1 | 2)=>{
    if(!status && status !== 0) return 'Aberto';
    if(status == 0) return 'Aberto';
    if(status == 1) return 'Finalizado'
    if(status == 2) return 'Entregue';
}