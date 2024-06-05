export const sortProducts = (products: any[])=>{
    return products.sort((a:any, b: any) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      
        return 0;
    })
}

export const sortCategories = (categories: any[])=>{
    return categories.sort((a:any, b: any) => {
        const nameA = a.toLowerCase();
        const nameB = b.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      
        return 0;
    })
}

export const sortClients = (clients: any[]) => {
    return clients.sort((a: any, b: any) => {
        const dayA = new Date(a.nextDeliveryDate).getTime();
        const dayB = new Date(b.nextDeliveryDate).getTime();
        
        if (dayA === 0) return 1;  
        if (dayB === 0) return -1; 
        
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        
        if (dayA < dayB) return -1;
        if (dayA > dayB) return 1;
        

        return a.name.localeCompare(b.name);
    });
};


export const sortClientNames = (clients: any)=>{
    return clients.sort((a: any, b: any) => {      
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      
        return 0;
      });
}
export const sortOrders = (orders: any)=>{
    return orders.sort((a: any, b: any)=>{
        const dayA = new Date(a.deliveryDate).getDate();
        const dayB = new Date(b.deliveryDate).getDate();
      
        if (dayA < dayB) return -1;
        if (dayA > dayB) return 1;
    })
}