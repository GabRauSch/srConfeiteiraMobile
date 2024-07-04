import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findCategories } from '../services/Categories';
import { RootState } from '../store';
import { Category } from '../types/Category';
import { setCategories } from '../reducers/categoriesReducer';
import { sortCategories } from '../util/sorter';

export const useCategories = (userId: number | null) => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categoriesReducer.categories);

    useEffect(() => {
        if(categories.length === 0){
            const fetchCategories = async () => {
                if (!userId) return;
    
                const { data, status } = await findCategories(userId);
                if (status !== 200) {
                    console.error('Failed to fetch categories');
                    return;
                }
    
                const sortedCategories = sortCategories(data);
                dispatch(setCategories(sortedCategories));
            };
    
            fetchCategories();
        }
    }, [userId, dispatch]);

    return categories;
};
