export const getUniqueCategories = (data: any[]) =>{
    const categories = new Set()
    data.forEach((item)=>{
        categories.add(item.category)
    })
    return Array.from(categories)
}