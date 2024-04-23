export const getUniqueCategories = (data: any[]) =>{
    const categories = new Set()
    data.forEach((item)=>{
        categories.add(item.category)
    })
    return Array.from(categories)
}

export const getUniqueDays = (data: any[])=>{
    const days = new Set();
    data.forEach((item)=>{
        days.add(item.dataString)
    })
    return Array.from(days)
}

export const getUniqueData = (data: any[], key: string)=>{
    const newData = new Set();
    data.forEach((item)=>{
        newData.add(item[key])
    })
    return Array.from(newData)
}