import { Image, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native";
import { styles } from "../styles/screen.Categories";
import { Picker } from "@react-native-picker/picker";
import { ReactNode, useCallback, useEffect, useState } from "react";
import InputEdit from "../components/InputEdit";
import { useRoute } from "@react-navigation/native";
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


type Props = {
    categories: Category[],
    products: Product[],
    user: User,
    setProductsAction: (payload: any)=>void
    setCategoriesAction: (payload: any)=>void,
    updateCategoryAction: (payload: Category)=>void,
    removeCategoryAction: (payload: number)=>void,
}


const Categories = ({user, categories, products, setProductsAction, setCategoriesAction, updateCategoryAction, removeCategoryAction}: Props) => {
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
    const route = useRoute();
    const { MessageDisplay, setMessageWithTimer } = useMessage();
    const [category, setCategory] = useState<Category>();
    const [editModal, setEditModal] = useState(false);
    const [excldeModal, setExcludeModal] = useState(false);
    const [categoriesWithNoProducts, setCategoriesWithNoProducts] = useState<any>([])

    const getData = async ()=>{
        const newCategories = await findCategories(user.id);
        if(newCategories.status)

        console.log(newCategories.data)
        setCategoriesList(newCategories.data);
        setCategoriesAction(newCategories.data)
        setFilteredCategories(newCategories.data)
        
        if (!products) {
            const { data: products, status } = await getAllProductsByUserId(user.id);
        
            if (status !== 200) return;
        
            setProductsAction(products);
        
            const productCategoryIds = new Set(products.map((product: Product) => product.categoryId));
        
            const categoriesWithNoProducts = categories.filter((category: Category) => 
                !productCategoryIds.has(category.id)
            );
        
            setCategoriesWithNoProducts(categoriesWithNoProducts);
        }

        setProductsAction(products);
        const productCategoryIds = new Set(products.map((product: Product) => product.categoryId));        
        const categoriesWithNoProducts = categories.filter((category: Category) => 
            !productCategoryIds.has(category.id)
        );
        setCategoriesWithNoProducts(categoriesWithNoProducts);

    }

    useEffect(() => {
        getData()
    }, [user.id]);

    useEffect(() => {
        setCategoriesList(categories);
        setFilteredCategories(categories)
    }, [categories]);

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

    return (
        <View>
            <MessageDisplay />
            <View>
                <SearchInput onChange={search} onSearch={()=>{}} />
            </View>
            <HorizontalLine />
            <View style={styles.page}>
                <Text style={styles.separator} >Suas categorias</Text>
                <ScrollView style={styles.categories}>
                    {filteredCategories.map((el, key)=>(
                        <View style={styles.category} key={key}>
                            <Text style={{fontSize: 16, flex: 1}}>{el.description}</Text>
                            <View style={styles.actions}>
                                <TouchableHighlight style={{padding: 10}} onPress={()=>handleEdit(el.id, el.description)} underlayColor={'transparent'} activeOpacity={.7}>
                                    <Icon name="pencil" color={COLORS.primary} size={17}/>
                                </TouchableHighlight>
                                {categoriesWithNoProducts.some((cat: Category) => cat.id === el.id) ? (
                                    <TouchableHighlight style={{padding: 10}} onPress={()=>{handleDelete(el.id)}}>
                                        <Icon name="trash" color={COLORS.primary} size={17}/>
                                    </TouchableHighlight>
                                ) : (
                                    <TouchableHighlight style={{padding: 10}} onPress={()=>{setMessageWithTimer('Impossível deletar categoria com produtos', 'error')}} underlayColor={'transparent'} activeOpacity={.7}>
                                        <Icon name="trash" color={COLORS.grayScaleSecondary} size={17}/>
                                    </TouchableHighlight>
                                )}
                            </View>
                        </View>
                    ))}
                    <View style={{marginBottom: 200}}></View>
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