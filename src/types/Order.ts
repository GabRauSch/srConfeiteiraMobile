type Order = {
    id: number,
    client: string,
    deliveryDate: Date,
    deliveryString: string,
    value: number,
    status: status,
    products: string[]
}

export const ordersList: Order[] = [
    {id: 1, client: 'GilbertoGil', deliveryDate: new Date(Date.now()), deliveryString: 'Hoje', value: 20.15, status: 2, 
        products: ['Bolo de Bacalhau', 'Brigadeiro de camarão', 'Salada de batata'] 
    },
    {id: 1, client: 'Gilberta Gia', deliveryDate: new Date(Date.now()), deliveryString: 'Hoje',value: 20.15, status: 1, 
        products: ['Bolo de Bacalhau'] 
    },
    {id: 1, client: 'Luiza Mel', deliveryDate: new Date(Date.now()), deliveryString: 'Hoje',value: 20.15, status: 1, 
        products: ['Bolo de Bacalhau', 'Brigadeiro de camarão', 'Salada de batata', 'Cobertura de chantily'] 
    },
    {id: 1, client: 'Feliciano Marcos', deliveryDate: new Date(Date.now()),deliveryString: '24/04', value: 20.15, status: 1, 
        products: ['Bolo de Bacalhau', 'Brigadeiro de camarão', 'Salada de batata', 'Cobertura de chantily'] 
    },
    {id: 1, client: 'Querido da silva', deliveryDate: new Date(Date.now()), deliveryString: '24/04', value: 20.15, status: 1, 
        products: ['Bolo de Bacalhau', 'Brigadeiro de camarão', 'Salada de batata', 'Cobertura de chantily'] 
    },
    {id: 1, client: 'Leticia de Farias', deliveryDate: new Date(Date.now()), deliveryString: '24/04', value: 20.15, status: 1, 
        products: ['Bolo de Bacalhau', 'Brigadeiro de camarão', 'Salada de batata', 'Cobertura de chantily'] 
    },
    {id: 1, client: 'Adir de Farias', deliveryDate: new Date(Date.now()), deliveryString: '24/04', value: 20.15, status: 1, 
        products: ['Bolo de Bacalhau', 'Brigadeiro de camarão', 'Salada de batata', 'Cobertura de chantily'] 
    },
]

// aberto, entregue, recebido
export const statusList = [1, 2, 3];
type status = 1 | 2 | 3