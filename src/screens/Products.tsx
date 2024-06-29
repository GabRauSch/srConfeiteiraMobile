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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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

type Props = {
    user: User,
    productsList: Product[],
    setProductsAction: (payload: any)=>void,
    setCategoriesAction: (payload: any)=>void
}

const ProductsScreen = ({user, productsList, setProductsAction, setCategoriesAction}: Props) => {
    const [activeKey, setActiveKey] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
    const [createOptionsDisplay, setCreateOptionsDisplay] = useState(false)
    const navigate = useNavigation() as any;
    const [categories, setCategories] = useState<string[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
    const [productsListing, setProductsListing] = useState<any[]>([]);
    const [modalsVisibility, setModalsVisibility] = useState(false);
    const [options, setOptions] = useState<string[]>([]);
    const navigation = useNavigation() as any

    useEffect(()=>{
        const handleGetData = async ()=>{
            const products = await getAllProductsByUserId(user.id as number);
            const sortedProucts = sortProducts(products)
            setProducts(sortedProucts);
            const uniqueCategories = getUniqueCategories(products) as string[];
            const sortedCategories = sortCategories(uniqueCategories)
            setCategories(sortedCategories);
            setSelectedCategory(null);
            setFilteredCategories(sortedCategories);
            setProductsAction(products);
            console.log(products)

        };
        handleGetData()
    }, [user.id]); 

    useEffect(() => {
        const uniqueCategories = getUniqueCategories(productsList) as string[];
        const sortedCategories = sortCategories(uniqueCategories)
        setFilteredCategories(sortedCategories);
        setCategoriesAction(sortedCategories)
        setOptions(["Todas", ...sortedCategories])
        setProductsListing(productsList);
    }, [productsList]);
    
    const [categoriesCollapseMap, setCategoriesCollapseMap] = useState(Array.from({length: categories.length}, () => false));

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
        navigate.navigate(url, {id})
    }
    const closeModal = ()=>{
        setModalsVisibility(!modalsVisibility)
    }
    
    const search = (value: string)=>{
        let productsFiltered = productsList.filter((el)=> el.name.includes(value) || el.description.includes(value)); 
        
        if(productsFiltered)
        setProductsListing(productsFiltered)
        setFilteredCategories(getUniqueCategories(productsFiltered))
    }

    const completeSearch = ()=>{

    }

    return (
        <>
        <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
        <SearchInput onChange={search} onSearch={completeSearch} />
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
            </ScrollView>
            <TouchableHighlight style={{position: 'absolute', right: 0, backgroundColor: COLORS.background, height: '100%', justifyContent: 'center'}} onPress={()=>handleNavigate('categories')} underlayColor={'transaparent'} >
                <Text style={{textAlignVertical: 'center', color: COLORS.primary, textDecorationLine: 'underline', textAlign:'left'}}>Suas categorias</Text>
            </TouchableHighlight>
        </View>
        <HorizontalLine />

        <ScrollView style={styles.scroll}>
            {filteredCategories.length > 0 ? (
                filteredCategories.map((category: any, catKey) => (
                    (category === selectedCategory || !selectedCategory) &&
                        <View key={catKey} style={styles.categoryDivision}>
                            <Text style={styles.separator} onPress={()=>{handleToggleCategory(catKey)}}>{category}</Text>
                            <View style={styles.products}>
                                    {productsListing.filter(product => product.category === category)
                                        .slice(0, categoriesCollapseMap[catKey] ? productsListing.length : 2).map((product, key) => (
                                        <ProductItem
                                            key={key}
                                            id={product.id}
                                            image={product.photo}
                                            value={product.value}
                                            name={product.name}
                                            description={product.description}
                                            onPress={()=>{handleRedirect(`product`, product.id)}}
                                        />
                                    ))}
                            </View>
                            {productsListing.filter(product => product.category === category).length > 2 && (
                                <Text style={styles.expandButton} onPress={()=>{handleToggleCategory(catKey)}}>
                                    {categoriesCollapseMap[catKey] ? ("Menos") : ("Mais")}
                                </Text>
                            )}
                        </View>
                ))

            ) : (
                <Text style={styles.messageNoRegister}>Nenhum produto encontrado</Text>
            )}            
        </ScrollView>
        </>

    );
};

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user,
    productsList: state.productsReducer.products
})
const mapDispatchToProps = (dispatch: Dispatch)=>({
    setProductsAction: (payload: any)=>{dispatch(setProducts(payload))},
    setCategoriesAction: (payload: any)=>{dispatch(setCategories(payload))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen)