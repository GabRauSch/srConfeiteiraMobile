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

export const getUniqueDaysFrom = (data: any[], key: string)=>{
    const newData = new Set();
    data.forEach((item)=>{
        const remainingTime = formatDate(item[key]);
        newData.add(remainingTime)
    })
    return Array.from(newData)
}

export const formatDate = (date: Date)=>{
    const order = new Date(date);1
    
    const now = new Date();
    const diff = order.getTime() - now.getTime();
    
    if(diff <= 0) return 'em atraso';
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const tomorrow = new Date(now);
    
    tomorrow.setHours(24, 0, 0, 0);
    const diffTom = tomorrow.getTime() - now.getTime();
    const hoursTom = Math.floor(diffTom / (1000 * 60 * 60)); 

    if (hoursTom > hours) {
        return `hoje`;
    } else if(days == 1) {
        return 'Amanhã';
    } else {
        return `${order.getDate()}/${order.getMonth()+1}/${order.getFullYear()}`
    }
}

export const getTimeStringFromDate = (date: Date)=>{
    const order = new Date(date);

    const now = new Date();
    const diff = order.getTime() - now.getTime();

    if(diff <= 0) return 'em atraso';

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if(minutes < 60) {
        return `${minutes} minutos`
    } else if (hours < 24) {
        if(hours == 1) return `${hours} hora`
        return `${hours} horas`;
    } else if (days < 7) {
        if(days == 1) return `${days} dia`
        return `${days} dias`;
    } else if (weeks < 4) {
        if(days == 1) return `${days} dia`
        return `${weeks} semanas`;
    } else if (months < 2) {
        return `${months} mês`;
    } else if (months < 6) {
        return `${months} meses`;
    } else {
        return `alguns meses`;
    }
}

export const remainingTimeFrom = (time: Date)=>{
    if(!time) return 'Nenhum pedido pendente';

    const order = new Date(time)
    
    const now = new Date();
    const diff = order.getTime() - now.getTime();
    
    if (diff <= 0) return 'Pedido em atraso';

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (hours < 24) {
        return `Próxima entrega em ${hours} horas`;
    } else if (days < 7) {
        return `Próxima entrega em ${days} dias`;
    } else if (weeks < 4) {
        return `Próxima entrega em ${weeks} semanas`;
    } else if (months < 2) {
        return `Próxima entrega em ${months} mês`;
    } else if (months < 6) {
        return `Próxima entrega em ${months} meses`;
    } else {
        return `Próxima entrega em alguns meses`;
    }
}

export const getExtendedDate = (date: Date)=>{
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const time = new Date(date)

    const day = time.getDate();
    const month = months[time.getMonth()];
    const year = time.getFullYear();

    return `${day} de ${month} de ${year}`;
}