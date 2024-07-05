import { Image, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/screen.Categories";
import { Picker } from "@react-native-picker/picker";
import { ReactNode, useCallback, useEffect, useState } from "react";
import InputEdit from "../components/InputEdit";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getClientById, updateClient } from "../services/Clients";
import { Client } from "../types/Client";
import { connect } from "react-redux";
import { RootReducer } from "../reducers";
import AddButton from "../components/AddButton";
import CreateButton from "../components/CreateButton";
import useMessage from "../hooks/useMessage";
import { validateClientEdit } from "../util/validation";
import { handleResponse } from "../services/responseMapping";
import { Dispatch } from "redux";
import { setClientInfo } from "../reducers/clientsReducer";
import { removeCategory, setCategories, updateCategory } from "../reducers/categoriesReducer";
import { Category } from "../types/Category";
import { User } from "../types/User";
import { findCategories, updateCateogoryById } from "../services/Categories";
import { HorizontalLine } from "../components/HorizontalLine";
import SearchInput from "../components/SearchInput";
import { COLORS } from "../styles/global";
import Icon from 'react-native-vector-icons/FontAwesome';
import EditModal from "../modals/EditModal";
import ExcludeModal from "../modals/ExcludeModal";
import { Product } from "../types/Product";
import { setProducts } from "../reducers/productsReducer";
import { getAllProductsByUserId } from "../services/Products";
import { HeaderCreation } from "../components/HeaderCreation";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";


type Props = {
    categories: Category[],
    products: Product[],
    user: User,
    setProductsAction: (payload: any)=>void
    setCategoriesAction: (payload: any)=>void,
    updateCategoryAction: (payload: Category)=>void,
    removeCategoryAction: (payload: number)=>void,
}


const Categories = ({user, updateCategoryAction, removeCategoryAction}: Props) => {
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
    const route = useRoute();
    const { MessageDisplay, setMessageWithTimer } = useMessage();
    const [category, setCategory] = useState<Category>();
    const [editModal, setEditModal] = useState(false);
    const [excldeModal, setExcludeModal] = useState(false);
    const [categoriesWithNoProducts, setCategoriesWithNoProducts] = useState<any>([]);
    const navigation = useNavigation() as any

    const categories = useCategories(user.id);
    const products = useProducts(user.id)

    const getData = async ()=>{
        setCategoriesList(categories);
        setFilteredCategories(categories)
                
        const productCategoryIds = new Set(products.map((product: Product) => product.categoryId));
        const categoriesWithNoProducts = categories.filter((category: Category) => 
            !productCategoryIds.has(category.id)
        );
    
        setCategoriesWithNoProducts(categoriesWithNoProducts);
    }

    useEffect(() => {
        getData()
    }, [categories, products]);


    const search = (value: string)=>{
        setFilteredCategories(categoriesList.filter((el)=>el.description.toLowerCase().includes(value.toLowerCase())))
    }

    const handleEdit = (id: number, description: string)=>{
        setEditModal(true);
        setCategory({id, description})
    }

    const handleDelete = (id: number)=>{
        setExcludeModal(true);
        setCategory(categoriesList.find((el)=>el.id == id))
    }
    const handleSave = async ()=>{
        if(!category) return

        const updated = await updateCateogoryById(category.id, category.description)
        if(updated.status !== 200) return

        updateCategoryAction(category);
    }

    const handleNavigate = (category: Category)=>{
        navigation.navigate('products', {category})
    }

    return (
        <View>
            <MessageDisplay />
            <View>
                <HeaderCreation url="products" title="Suas categorias"/>
                <SearchInput onChange={search} onSearch={()=>{}} />

            </View>
            <HorizontalLine />
            <View style={styles.page}>
                <Text style={styles.separator} >Suas categorias</Text>
                <ScrollView style={styles.categories}>
                    {filteredCategories.map((el, key)=>{
                        const noProducts = categoriesWithNoProducts.some((cat: Category) => cat.id === el.id)
                        return (
                            <TouchableOpacity 
                                onPress={
                                noProducts 
                                ? ()=>{setMessageWithTimer('Categoria não tem produtos', 'error')}
                                : () => handleNavigate(el) 
                            }
                            style={[styles.category, {borderLeftColor: noProducts ?  'white' : COLORS.primary}]} 
                            key={key}>
                                <Text style={{fontSize: 16, flex: 1}}>{el.description}</Text>
                                <View style={styles.actions}>
                                    <TouchableHighlight style={{padding: 10}} onPress={()=>handleEdit(el.id, el.description)} underlayColor={'transparent'} activeOpacity={.7}>
                                        <Icon name="pencil" color={COLORS.primary} size={17}/>
                                    </TouchableHighlight>
                                    {noProducts && (
                                        <TouchableHighlight style={{padding: 10}} onPress={()=>{handleDelete(el.id)}}>
                                            <Icon name="trash" color={COLORS.primary} size={17}/>
                                        </TouchableHighlight>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )})
                    }
                    <View style={{marginBottom: 360}}></View>
                </ScrollView>
                {editModal &&
                    <EditModal id={0}  objectType="a categoria" action={handleSave} onClose={()=>{setEditModal(false)}}>
                        <View style={{width: '100%', padding: 10}}>
                            <TextInput 
                                style={{borderWidth: 1, borderColor: COLORS.grayScaleSecondary, borderRadius: 5, padding: 5}}
                                value={category?.description} onChangeText={(value)=>setCategory({...category as Category, description: value})}
                            />
                        </View>
                    </EditModal>
                }
                {excldeModal &&
                    <ExcludeModal 
                        id={0}
                        name={category?.description as string}
                        objectType="categoria"
                        onClose={()=>setExcludeModal(false)}
                        confirmExclude={()=>{removeCategoryAction(category?.id as number)}}
                    />
                }
            </View>
        </View>
    );
};

const mapStateToProps = (state: RootReducer)=>({
    categories: state.categoriesReducer.categories,
    user: state.userReducer.user,
    products: state.productsReducer.products
})

const mapDispatchToProps = (dispatch: Dispatch)=>({
    setProductsAction: (payload: any)=>dispatch(setProducts(payload)),
    setCategoriesAction: (payload: any)=>dispatch(setCategories(payload)),
    updateCategoryAction: (payload: Category)=>dispatch(updateCategory(payload)),
    removeCategoryAction: (payload: number)=>dispatch(removeCategory(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)