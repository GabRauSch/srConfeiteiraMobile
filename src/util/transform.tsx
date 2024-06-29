export type FormatTransform = 'currency' | 'count' | 'operation'

export const formatTransform = (value: number | '-', format: FormatTransform)=>{
    if(value == '-') return '-'
    switch(format){
        case 'currency': return `R$${value.toFixed(2).replace('.',',')}`;
            break;
        case 'count': return `${value}`;
            break;
        case 'operation': return value === 0 ? `${value}` : (value > 0 ? `+${value}` : `${value}`);
            break;
    }
}

export const getUniqueCategories = (data: any[]) =>{
    if(data.length == 0) return []
    const categories = new Set()
    data.forEach((item)=>{
        categories.add(item.category)
    })
    return Array.from(categories)
}

export const getUniqueDays = (data: any[])=>{
    if(data.length == 0) return []

    const days = new Set();
    data.forEach((item)=>{
        days.add(item.dataString)
    })
    return Array.from(days)
}

export const getUniqueData = (data: any[], key: string)=>{
    if(data.length == 0) return []

    const newData = new Set();
    data.forEach((item)=>{
        newData.add(item[key])
    })
    return Array.from(newData)
}

export const getUniqueDaysFrom = (data: any[], key: string)=>{
    if(data.length == 0) return [];

    const newData = new Set();
    data.forEach((item)=>{
        const remainingTime = formatDate(item[key]);
        newData.add(remainingTime)
    })
    return Array.from(newData)
}

export const formatDate = (date: Date) => {
    const order = new Date(date);
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    const endOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59, 999);

    if (order.getTime() <= now.getTime()) {
        return 'em atraso';
    } else if (order >= startOfToday && order <= endOfToday) {
        return 'hoje';
    } else if (order >= startOfTomorrow && order <= endOfTomorrow) {
        return 'Amanhã';
    } else {
        return `${order.getDate()}/${order.getMonth() + 1}/${order.getFullYear()}`;
    }
};

export const getTimeStringFromDate = (date: Date) => {
    const now = new Date();
    const dateFormat = new Date(date)

    if (dateFormat <= now) return 'em atraso';

    const diffInMilliseconds = dateFormat.getTime() - now.getTime();
    
    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    // Calcular diferença em meses
    const futureYear = dateFormat.getFullYear();
    const futureMonth = dateFormat.getMonth();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const totalMonths = (futureYear - currentYear) * 12 + (futureMonth - currentMonth);
    const months = totalMonths;

    if (minutes < 60) {
        return `${minutes} minutos`;
    } else if (hours < 24) {
        return hours === 1 ? `${hours} hora` : `${hours} horas`;
    } else if (days < 7) {
        return days === 1 ? `${days} dia` : `${days} dias`;
    } else if (weeks < 4) {
        return weeks === 1 ? `${weeks} semana` : `${weeks} semanas`;
    } else if (months < 2) {
        return months === 1 ? `${months} mês` : `${months} meses`;
    } else if (months < 6) {
        return `${months} meses`;
    } else {
        return `alguns meses`;
    }
};


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

export const getRemainingDays = (time: Date)=>{
    if(!time) return '';

    const order = new Date(time)
    
    const now = new Date();
    const diff = order.getTime() - now.getTime();
    
    if (diff <= 0) return 'Pedido em atraso';

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return `${days} dias`; 
}