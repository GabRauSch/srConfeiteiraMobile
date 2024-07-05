import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClientsByUserId } from '../services/Clients';
import { RootState } from '../store';
import { setClients } from '../reducers/clientsReducer';
import { sortClients } from '../util/sorter';

const useClients = (userId: number) => {
    const dispatch = useDispatch();
    const clients = useSelector((state: RootState) => state.clientsReducer.clients);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                if (clients.length === 0) {
                    const response = await getAllClientsByUserId(userId);
                    console.log('clients', response.status)
                    if (response.status === 200) {
                        console.log('clientes do caralho')
                        const sortedClients = sortClients(response.data);
                        dispatch(setClients(sortedClients));
                    } else {
                        console.error('Failed to fetch clients');
                    }
                };
            } catch (error) {
                
            }
        }

        if (userId) {
            fetchClients();
        }
    }, [userId, dispatch, clients]);

    return clients;
};

export default useClients;