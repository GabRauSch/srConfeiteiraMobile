export const sortProducts = (products: any[])=>{
    if(products.length == 0) return []

    return products.sort((a:any, b: any) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      
        return 0;
    })
}

export const sortCategories = (categories: any[])=>{
    if(categories.length == 0) return []
    return categories.sort((a:any, b: any) => {
        const nameA = a.toLowerCase();
        const nameB = b.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      
        return 0;
    })
}

export const sortClients = (clients: any[]) => {
    console.log(clients)
    if(clients.length == 0) return []
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


export const sortClientNames = (clients: any[])=>{
    if(clients.length == 0) return []

    return clients.sort((a: any, b: any) => {      
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      
        return 0;
      });
}
export const sortOrders = (orders: any[]) => {
    if (orders.length == 0) return [];
  
    return orders.sort((a: any, b: any) => {
      const dateA = new Date(a.deliveryDate);
      const dateB = new Date(b.deliveryDate);
  
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
  };