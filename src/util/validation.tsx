export const validateProductEdit = (product: any, categories: any[], products: any[])=>{
    if(product.categoryData){
        const foundCategory = categories.find((el: any)=>el.description == product.categoryData.description)
        if(product.categoryData && (product.categoryData.description.length < 3 || product.categoryData.description.length > 15)) 
            return "Categoria deve ter entre 3 e 15 caracteres"
        if(foundCategory) return 'Categoria com esse nome já existe'
    }
    const foundProduct  = products.filter(el=>el.id == product.id).find((el: any)=>el.name == product.name)
    if(foundProduct) return "Produto com esse nome já existe"
    if (product.name.length <= 3 || product.name.length > 35) return 'Nome deve ter entre 3 e 35 caracteres';
    if (product.description.length <= 3 || product.description.length > 60) return 'Descrição deve ter entre 3 e 60 caractéres';
    if (product.value < product.productionCost) return 'Valor deve ser maior que o custo de produção';
    if (product.value == 0) return 'Valor de venda não pode ser igual a 0';
    return null
}

export const validateProductCreate = (product: any, categories: any[], products: any[])=>{
    if(product.categoryData){
        const foundCategory = categories.find((el: any)=>el.description == product.categoryData.description)
        if(product.categoryData && (product.categoryData.description.length < 3 || product.categoryData.description.length > 15)) 
            return "Categoria deve ter entre 3 e 15 caractéres"
        if(foundCategory) return 'Categoria com esse nome já existe'
    }
    const foundProduct  = products.find((el: any)=>el.name == product.name)
    if(foundProduct) return "Produto com esse nome já existe"
    if (product.name.length < 3 || product.name.length > 35) return 'Nome deve ter entre 3 e 35 caracteres';
    if(product.description.length < 3 || product.description.length >= 60) return 'Descrição deve ter entre 3 e 60 caracteres';
    if(product.value < product.productionCost) return  'Valor deve ser maior que o custo de produção';
    if(product.value == 0) return  'Valor de venda não pode ser igual a 0'
    return null
}

export const validateClientCreate = (client: any)=>{
    if(client.name.length <= 2 || client.name.length > 20) return 'Nome do cliente deve ter entre 2 e 20 caractéres';
    if(client.phone.length < 11 || client.phone.length > 14) return 'Telefone inválido'
}

export const validateClientEdit = (client: any)=>{
    if(client.name.length <= 2 || client.name.length > 35) return 'Nome do cliente deve ter entre 2 e 35 caractéres';
    if(client.phone.length < 11 || client.phone.length > 14) return 'Telefone inválido'
}

export const validateOrderCreate = (order: any)=>{
    if(!order.clientId) return 'Selecione o cliente'
    if(order.products.length == 0) return 'Selecione os produtos'
}