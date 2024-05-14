import { SafeAreaView, Text, View, ScrollView, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/screen.Products";
import SearchInput from "../components/SearchInput";
import AddButton from "../components/AddButton";
import OptionItem from "../components/OptionItem";
import { HorizontalLine } from "../components/HorizontalLine";
import { Product } from "../types/Product";
import ProductItem from "../components/ProductItem";
import Collapsible from "react-native-collapsible";
import { useEffect, useState } from "react";
import { getUniqueCategories } from "../util/transform";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CreateOptions } from "../modals/CreateOptions";
import { getAllByUserId } from "../services/Products";
import { User } from "../types/User";
import { connect } from "react-redux";
import { RootState } from "../store";
import { Dispatch } from "redux";
import { setProductInfo, setProducts } from "../reducers/productsReducer";

type Props = {
    user: User,
    productsList: Product[],
    setProductsAction: (payload: any)=>void
}

const ProductsScreen = ({user, productsList, setProductsAction}: Props) => {
    const [activeKey, setActiveKey] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
    const [createOptionsDisplay, setCreateOptionsDisplay] = useState(false)
    const navigate = useNavigation() as any;
    const [categories, setCategories] = useState<string[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
    const [productsListing, setProductsListing] = useState<any[]>([]);
    const [modalsVisibility, setModalsVisibility] = useState(false);

    useEffect(()=>{
        const handleGetData = async ()=>{
            const products = await getAllByUserId(user.id as number);
            setProducts(products);
            const uniqueCategories = getUniqueCategories(products) as string[];
            setCategories(uniqueCategories);
            setSelectedCategory(null);
            setFilteredCategories(uniqueCategories);
            console.log(products)
            setProductsAction(products);
        };
        handleGetData()
    }, [user.id]); 

    useEffect(() => {
        const uniqueCategories = getUniqueCategories(productsList) as string[];
        setFilteredCategories(uniqueCategories);
        setProductsListing(productsList);
    }, [productsList]);
    
    const [categoriesCollapseMap, setCategoriesCollapseMap] = useState(Array.from({length: categories.length}, () => false));

    const handleToggleCategory = (catKey: number)=>{
        const updatedCollapseMap = [...categoriesCollapseMap];
        updatedCollapseMap[catKey] = !updatedCollapseMap[catKey];
        setCategoriesCollapseMap(updatedCollapseMap);
    }
   
    const handleCategorySelect = (category: string, key: number) => {
        if(category === 'mais') return navigate.navigate('listCategories')
        setSelectedCategory(category === "Todas" ? null : category);
        setActiveKey(key);
    };

    const handleRedirect = (url: string, id: number)=>{
        navigate.navigate(url, {id})
    }
    const closeModal = ()=>{
        setModalsVisibility(!modalsVisibility)
    }
    

    return (
        <>
        <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
        <ScrollView style={styles.scroll}>
            {filteredCategories.length > 0 ? (
                filteredCategories.map((category: any, catKey) => (
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
                <Text style={styles.messageNoRegister}>Você ainda não possui produtos</Text>
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
    setProductsAction: (payload: any)=>{dispatch(setProducts(payload))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen)