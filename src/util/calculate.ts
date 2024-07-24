import { Complement } from "../types/OrderComplements";

export const calculateOrderValue = (productsValue: number, updatedComplements: Complement[])=>{
    const discountPercentage = updatedComplements.filter((el)=>el.valueType == 0 && el.complementMultiplier == -1).reduce((accumulator, complement) => {
        const decimalValue = complement.value / 100;            
        const discountFactor = 1 - decimalValue;

        return accumulator * discountFactor;
    }, 1);
    const finalDiscountPercentage = (1 - discountPercentage) * 100;
    const discountValue = updatedComplements.filter((el)=>el.valueType == 1 && el.complementMultiplier == -1).reduce((a, b)=>a + (b.complementMultiplier * b.value), 0);
    const taxPecentage = updatedComplements.filter((el)=>el.valueType == 0 && el.complementMultiplier == 1).reduce((accumulator, complement) => {
        const decimalValue = complement.value / 100;            
        const discountFactor = 1 - decimalValue;
        return accumulator * discountFactor;
    }, 1);

    const finalTaxPercentage = (1 - taxPecentage) * 100;
    const taxValue = updatedComplements.filter((el)=>el.valueType == 1 && el.complementMultiplier == 1).reduce((a, b)=>a + (b.complementMultiplier * b.value), 0);
    return productsValue - (productsValue * finalDiscountPercentage /100) + (productsValue * finalTaxPercentage /100) + taxValue + discountValue
}