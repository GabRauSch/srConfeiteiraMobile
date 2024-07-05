import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersByUserId } from '../services/Orders';
import { Order } from '../types/Order';
import { setOrders } from '../reducers/ordersReducer';
import { sortClients, sortOrders } from '../util/sorter';
import { setClients } from '../reducers/clientsReducer';
import Orders from '../screens/Orders';
import { RootState } from '../store';

const useOrders = (userId: number) => {
    const dispatch = useDispatch();
    const orders = useSelector((state: RootState) => state.ordersReducer.orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if(orders.length === 0){
            const response = await getAllOrdersByUserId(userId);
            if (response.status === 200) {
                const orders = sortOrders(response.data);
                dispatch(setOrders(orders));
            } else {
                console.error('Failed to fetch clients');
            }
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    if (userId) {
        fetchOrders();
    }
  }, [dispatch, userId, orders]);


  return orders
};

export default useOrders;
