import { Category } from "../types/Category";

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

export const sortCategories = (categories: Category[])=>{
    if(categories.length == 0) return []
    return categories.sort((a:Category, b: Category) => {
        const nameA = a.description.toLowerCase();
        const nameB = b.description.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      
        return 0;
    })
}

export const sortClients = (clients: any[]) => {
    console.log(clients); 

    if (clients.length === 0) return [];

    return clients.sort((a: any, b: any) => {
        const dayA = a.nextDeliveryDate ? new Date(a.nextDeliveryDate).getTime() : null;
        const dayB = b.nextDeliveryDate ? new Date(b.nextDeliveryDate).getTime() : null;
        
        if (dayA === null && dayB === null) {
            return a.name.localeCompare(b.name); 
        }
        if (dayA === null) return 1; 
        if (dayB === null) return -1;
        
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