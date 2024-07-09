export const handleSetNumericValue = (value: string) => {
    let newValue = '0,00';
    if(!value || value.length == 0) return '0,00';
    if(!value.split(',')[1]) return '0,00'
    if(value.split(',')[1].length === 1){
        newValue = (parseFloat(value.replace(/,/g, '.')) / 10).toFixed(2).replace('.', ',')
    } else if(value.split(',')[1].length === 3){
        newValue = (parseFloat(value.replace(/,/g, '.')) * 10).toFixed(2).replace('.', ',')
    } else{
        newValue = parseFloat(value.replace(/,/g, '.')).toFixed(2).replace('.', ',')
    }
    return newValue
  };


export const handleSetValue = (value: string)=>{
    let newValue = 0;
    if(!value || value.length == 0) return 0;
    if(!value.split(',')[1]) return 0
    if(value.split(',')[1].length === 1){
        newValue = (parseFloat(value.replace(/,/g, '.')) / 10)
    } else if(value.split(',')[1].length === 3){
        newValue = (parseFloat(value.replace(/,/g, '.')) * 10)
    } else{
        newValue = parseFloat(value.replace(/,/g, '.'))
    }
    return newValue
}
