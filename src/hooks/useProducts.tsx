import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsByUserId } from '../services/Products';
import { RootState } from '../store';
import { Product } from '../types/Product';
import { setProducts } from '../reducers/productsReducer';
import { sortProducts } from '../util/sorter';

export const useProducts = (userId: number | null) => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.productsReducer.products);

    useEffect(() => {
        if(products.length === 0){
            const fetchProducts = async () => {
                if (!userId) return;
    
                const { data, status } = await getAllProductsByUserId(userId);
                if (status !== 200) {
                    console.error('Failed to fetch products');
                    return;
                }
    
                const sortedProducts = sortProducts(data);
                dispatch(setProducts(sortedProducts));
            };
    
            fetchProducts();
        }
    }, [userId, dispatch]);

    return products;
};
