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
        if (clients.length === 0) {
            const fetchClients = async () => {
                const response = await getAllClientsByUserId(userId);
                if (response.status === 200) {
                    const sortedClients = sortClients(response.data);
                    dispatch(setClients(sortedClients));
                } else {
                    console.error('Failed to fetch clients');
                }
            };

            if (userId) {
                fetchClients();
            }
        }
    }, [userId, dispatch, clients]);

    return clients;
};

export default useClients;
