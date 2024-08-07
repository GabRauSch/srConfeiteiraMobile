import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setPayment } from '../reducers/paymentsReducer';
import { getByUserId } from '../services/OrderPayments';

const usePayments = (userId: number) => {
    const dispatch = useDispatch();
    const payments = useSelector((state: RootState) => state.paymentsReducer.payments);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        if(payments.length === 0){
            const response = await getByUserId(userId);
            if (response.status === 200) {
                dispatch(setPayment(response.data));
            } else {
                console.log('Failed to fetch payments');
            }
        }
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };
    if (userId) {
        fetchPayments();
    }
  }, [dispatch, userId, payments]);


  return payments
};

export default usePayments;
