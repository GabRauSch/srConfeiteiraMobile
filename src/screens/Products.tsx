import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';
import { styles } from '../styles/screen.Products';
import SearchInput from '../components/SearchInput';
import OptionItem from '../components/OptionItem';
import ProductItem from '../components/ProductItem';
import { HorizontalLine } from '../components/HorizontalLine';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { sortCategories, sortProducts } from '../util/sorter';
import { COLORS, SHADOW } from '../styles/global';
import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Dispatch } from 'redux';
import { User } from '../types/User';
import { setProducts } from '../reducers/productsReducer';
import { setCategories } from '../reducers/categoriesReducer';
import LoadingPage from '../components/LoadingPage';

type Props = {
    user: User,
    setProductsAction: (payload: any) => void,
    setCategoriesAction: (payload: any) => void,
};

const ProductsScreen = ({ user, setProductsAction, setCategoriesAction }: Props) => {
    const [activeKey, setActiveKey] = useState(0);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [options, setOptions] = useState<Category[]>([]);
    const [categoriesCollapseMap, setCategoriesCollapseMap] = useState<boolean[]>([]);
    const navigation = useNavigation() as any;
    const route = useRoute() as any;
    const [loading, setLoading] = useState(true); 

    const params = route.params;
    const [modalsVisibility, setModalsVisibilit] = useState(false)

    const fetchedProducts = useProducts(user.id as number);
    const fetchedCategories = useCategories(user.id as number);

    useEffect(() => {
        if (fetchedProducts.length > 0) {
            const sortedProducts = sortProducts(fetchedProducts);
            setFilteredProducts(sortedProducts);
            setProductsAction(sortedProducts);        
        }
    }, [fetchedProducts, setProductsAction]);

    useEffect(()=>{
        if(filteredProducts.length> 0) setLoading(false);
    }, [filteredProducts])

    useEffect(() => {
        if (fetchedCategories.length > 0) {
            const sortedCategories = sortCategories(fetchedCategories);
            setCategoriesAction(sortedCategories);

            setSelectedCategoryId(0);

            const productCategoryIds = fetchedProducts.map((product) => product.categoryId);
            const filteredCategories = sortedCategories.filter((category) => productCategoryIds.includes(category.id));
            setFilteredCategories(filteredCategories);

            const initialCollapseMap = new Array<boolean>(sortedCategories.length).fill(false);
            setCategoriesCollapseMap(initialCollapseMap);

            const uniqueDescriptions = new Set(filteredCategories.map((category) => category));
            setOptions([{id: 0, description: 'Todas'}, ...uniqueDescriptions]);
        }
    }, [fetchedCategories, fetchedProducts, setCategoriesAction]);

    useEffect(() => {
        if (params && params.category) {
            setSelectedCategoryId(params.category.id);
            setActiveKey(params.category.id)
        }
    }, [params]);

    const handleToggleCategory = (catKey: number) => {
        const updatedCollapseMap = [...categoriesCollapseMap];
        updatedCollapseMap[catKey] = !updatedCollapseMap[catKey];
        setCategoriesCollapseMap(updatedCollapseMap);
    };

    const handleNavigate = (url: string) => {
        navigation.navigate(url);
    };

    const handleCategorySelect = (category: Category) => {
        setSelectedCategoryId(category.description === 'Todas' ? 0 : category.id);
        setActiveKey(category.id);
    };

    const handleRedirect = (url: string, id: number) => {
        navigation.navigate(url, { id });
    };

    const search = (value: string) => {
        const productsFiltered = fetchedProducts.filter((el) => el.name.includes(value) || el.description.includes(value));
        setFilteredProducts(productsFiltered);

        const uniqueCategoryIds = new Set(productsFiltered.map((product) => product.categoryId));
        const newCategories = fetchedCategories.filter((el: Category) => uniqueCategoryIds.has(el.id));
        setFilteredCategories(newCategories);
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalsVisibilit(!modalsVisibility)}>
                <View style={styles.modalBackground} />
            </TouchableWithoutFeedback>
            <SearchInput onChange={search} onSearch={() => {}} />
            <View style={{ position: 'relative' }}>
                <ScrollView
                    horizontal={true}
                    style={styles.options}
                    showsHorizontalScrollIndicator={false}
                >
                    {options.map((option, key) => (
                        <OptionItem
                            key={key}
                            option={option.description}
                            handleActive={() => {
                                handleCategorySelect(option);
                            }}
                            active={activeKey === option.id}
                        />
                    ))}
                    <View style={{ marginRight: 120 }}></View>
                </ScrollView>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 0,
                        backgroundColor: '#f3f3f3',
                        zIndex: 2,
                        height: '100%',
                        justifyContent: 'center'
                    }}
                    onPress={() => handleNavigate('categories')}
                    activeOpacity={1}
                >
                    <Text
                        style={{
                            textAlignVertical: 'center',
                            color: COLORS.primary,
                            textDecorationLine: 'underline',
                            textAlign: 'left'
                        }}
                    >
                        Suas categorias
                    </Text>
                </TouchableOpacity>
            </View>
            <HorizontalLine />

            {loading ? 
                <LoadingPage />
                :
                <ScrollView style={styles.scroll}>
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category: Category, catKey) => {
                            return (
                                (category.id === selectedCategoryId || !selectedCategoryId) && (
                                    <View key={catKey} style={styles.categoryDivision}>
                                        <Text style={styles.separator} onPress={() => { handleToggleCategory(catKey) }}>
                                            {category.description}
                                        </Text>
                                        <View style={styles.products}>
                                            {filteredProducts
                                                .filter((product) => product.categoryId === category.id)
                                                .slice(0, categoriesCollapseMap[catKey] ? filteredProducts.length : 2)
                                                .map((product, key) => (
                                                    <ProductItem
                                                        key={key}
                                                        id={product.id}
                                                        image={product.photo}
                                                        value={product.value}
                                                        name={product.name}
                                                        description={product.description}
                                                        onPress={() => {
                                                            handleRedirect(`product`, product.id);
                                                        }}
                                                    />
                                                ))}
                                        </View>
                                        {filteredProducts.filter((product) => product.categoryId === category.id).length >
                                            2 && (
                                                <Text style={styles.expandButton} onPress={() => { handleToggleCategory(catKey) }}>
                                                    {categoriesCollapseMap[catKey] ? 'Menos' : 'Mais'}
                                                </Text>
                                            )}
                                    </View>
                                )
                            );
                        })
                    ) : (
                        <Text style={styles.messageNoRegister}>Nenhum produto encontrado</Text>
                    )}
                </ScrollView>
            }

           
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setProductsAction: (payload: any) => {
        dispatch(setProducts(payload));
    },
    setCategoriesAction: (payload: any) => {
        dispatch(setCategories(payload));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
