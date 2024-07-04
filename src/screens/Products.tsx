import { SafeAreaView, Text, View, ScrollView, TouchableWithoutFeedback, useWindowDimensions, TouchableHighlight } from "react-native";
import { styles } from "../styles/screen.Products";
import SearchInput from "../components/SearchInput";
import AddButton from "../components/AddButton";
import OptionItem from "../components/OptionItem";
import { HorizontalLine } from "../components/HorizontalLine";
import { Product } from "../types/Product";
import ProductItem from "../components/ProductItem";
import Collapsible from "react-native-collapsible";
import { useEffect, useState } from "react";
import { getUniqueCategories, getUniqueDays } from "../util/transform";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { CreateOptions } from "../modals/CreateOptions";
import { getAllProductsByUserId } from "../services/Products";
import { User } from "../types/User";
import { connect } from "react-redux";
import { RootState } from "../store";
import { Dispatch } from "redux";
import { setProductInfo, setProducts } from "../reducers/productsReducer";
import { sortCategories, sortProducts } from "../util/sorter";
import { COLORS } from "../styles/global";
import { setCategories } from "../reducers/categoriesReducer";
import { findCategories } from "../services/Categories";
import { Category } from "../types/Category";

type Props = {
    user: User,
    products: Product[],
    categories: Category[]
    setProductsAction: (payload: any)=>void,
    setCategoriesAction: (payload: any)=>void
}

const ProductsScreen = ({user, products, categories, setProductsAction, setCategoriesAction}: Props) => {
    const [activeKey, setActiveKey] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [modalsVisibility, setModalsVisibility] = useState(false);
    const [options, setOptions] = useState<string[]>([]);
    const [categoriesCollapseMap, setCategoriesCollapseMap] = useState(Array.from({length: categories.length}, () => false));
    const navigation = useNavigation() as any;
    const route = useRoute() as any;
    const params = route.params

    useEffect(()=>{
        const handleGetData = async ()=>{
            const {data: products, status} = await getAllProductsByUserId(user.id as number);
            if(status !== 200) return console.log('erro ao buscar produtos') 
                
            const sortedProucts = sortProducts(products);
            
            setProductsAction(sortedProucts);
            setFilteredProducts(sortedProucts)
            
            const {data: categories, status: cstatus} = await findCategories(user.id);
            if(cstatus !== 200) return console.log('erro as buscar categorias');
            
            const sortedCategories = sortCategories(categories);
            
            setCategoriesList(sortedCategories);
            setCategoriesAction(sortedCategories)

            setSelectedCategory(null);

            const productCategoryIds = products.map((product: Product) => product.categoryId);

            const filteredCategories = sortedCategories.filter(category =>productCategoryIds.includes(category.id));

            setFilteredCategories(filteredCategories);
        };
        handleGetData()
    }, [user.id]); 

    useEffect(() => {
        console.log(products)
        const sortedCategories = sortCategories(categories)
        const productCategoryIds = products.map((product: Product) => product.categoryId);

        const filteredCategories = sortedCategories.filter(category =>productCategoryIds.includes(category.id));

        setFilteredCategories(filteredCategories);

        const uniqueDescriptions = new Set(filteredCategories.map(category => category.description));
        setOptions(["Todas", ...uniqueDescriptions])
        const sortedProducts = sortProducts(products)
        setProductsList(sortedProducts);
        setFilteredProducts(sortedProducts)
    }, [products, categories]);

    useEffect(()=>{
        if(params && params.category){
            const category = params.category
            setSelectedCategory(category.description)
        }
    }, [params])

    const handleToggleCategory = (catKey: number)=>{
        const updatedCollapseMap = [...categoriesCollapseMap];
        updatedCollapseMap[catKey] = !updatedCollapseMap[catKey];
        setCategoriesCollapseMap(updatedCollapseMap);
    }
    const handleNavigate = (url: string)=>{
        navigation.navigate(url)
    }
    const handleCategorySelect = (category: string, key: number) => {
        setSelectedCategory(category === "Todas" ? null : category);
        setActiveKey(key);
    };

    const handleRedirect = (url: string, id: number)=>{
        navigation.navigate(url, {id})
    }
    const closeModal = ()=>{
        setModalsVisibility(!modalsVisibility)
    }
    const search = (value: string)=>{
        let productsFiltered = productsList.filter((el)=> el.name.includes(value) || el.description.includes(value)); 
        
        if(productsFiltered)
        setFilteredProducts(productsFiltered)


        const uniqueCategoryIds = new Set(productsFiltered.map(product => product.categoryId));
        const newCategories = categories.filter((el: Category) => uniqueCategoryIds.has(el.id));
        setFilteredCategories(newCategories)
    }
    return (
        <>
        <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
        <SearchInput onChange={search} onSearch={()=>{}} />
        <View style={{position: 'relative'}}>
            <ScrollView horizontal={true} style={styles.options}
                showsHorizontalScrollIndicator={false}
                >
                {options.map((option, key) => (
                    <OptionItem
                        key={key}
                        option={option}
                        handleActive={() => {
                            handleCategorySelect(option, key);
                        }}
                        active={activeKey == key}
                        />
                ))}
                <View style={{marginRight: 120}}></View>
            </ScrollView>
            <TouchableHighlight style={{position: 'absolute', right: 0, backgroundColor: '#f3f3f3', zIndex: 2, height: '100%', justifyContent: 'center'}} onPress={()=>handleNavigate('categories')} underlayColor={'transaparent'} >
                <Text style={{textAlignVertical: 'center', color: COLORS.primary, textDecorationLine: 'underline', textAlign:'left'}}>Suas categorias</Text>
            </TouchableHighlight>
        </View>
        <HorizontalLine />

        <ScrollView style={styles.scroll}>
            {filteredCategories.length > 0 ? (
                filteredCategories.map((category: Category, catKey) => {
                    return (
                        (category.description === selectedCategory || !selectedCategory) &&
                            <View key={catKey} style={styles.categoryDivision}>
                                <Text style={styles.separator} onPress={()=>{handleToggleCategory(catKey)}}>{category.description}</Text>
                                <View style={styles.products}>
                                        {filteredProducts.filter(product =>{
                                            return product.categoryId === category.id
                                        })
                                            .slice(0, categoriesCollapseMap[catKey] ? productsList.length : 2).map((product, key) => {
                                                return (
                                                    <ProductItem
                                                        key={key}
                                                        id={product.id}
                                                        image={product.photo}
                                                        value={product.value}
                                                        name={product.name}
                                                        description={product.description}
                                                        onPress={()=>{handleRedirect(`product`, product.id)}}
                                                    />
                                                )
                                            })}
                                </View>
                                {filteredProducts.filter(product => product.categoryId === category.id).length > 2 && (
                                    <Text style={styles.expandButton} onPress={()=>{handleToggleCategory(catKey)}}>
                                        {categoriesCollapseMap[catKey] ? ("Menos") : ("Mais")}
                                    </Text>
                                )}
                            </View>
                    )
                })

            ) : (
                <Text style={styles.messageNoRegister}>Nenhum produto encontrado</Text>
            )}            
        </ScrollView>
        </>

    );
};

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user,
    products: state.productsReducer.products,
    categories: state.categoriesReducer.categories
})
const mapDispatchToProps = (dispatch: Dispatch)=>({
    setProductsAction: (payload: any)=>{dispatch(setProducts(payload))},
    setCategoriesAction: (payload: any)=>{dispatch(setCategories(payload))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen)