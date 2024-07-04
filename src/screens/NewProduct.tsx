import { ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native"
import {styles} from '../styles/screen.NewProduct'
import InputEdit from "../components/InputEdit"
import { useEffect, useState } from "react"
import InputNumber from "../components/InputNumber"
import { handleSetNumericValue } from "../util/numeric"
import InputPicker from "../components/InputPicker"
import CreateButton from "../components/CreateButton"
import { createProduct } from "../services/Products"
import { findCategories } from "../services/Categories"
import useMessage from "../hooks/useMessage"
import { Product } from "../types/Product"
import { RootState } from "../store"
import { User } from "../types/User"
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Dispatch } from "redux"
import { newProduct, setProductInfo } from "../reducers/productsReducer"
import { validateProductCreate } from "../util/validation"
import { setCategories } from "../reducers/categoriesReducer"
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../styles/global"
import { HeaderCreation } from "../components/HeaderCreation"
import { Category } from "../types/Category"


type Props = {
    user: User,
    products: Product[],
    categories: Category[]
    newProductAction: (payload: any)=>void,
    setCategoriesAction: (payload: any)=>void
}

const NewProduct = ({user, products, categories, newProductAction, setCategoriesAction}: Props)=>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [productValue, setProductValue] = useState('0,00');
    const [productionCost, setProductionCost] = useState('0,00');
    const [category, setCategory] = useState<Category>();
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const {MessageDisplay, setMessageWithTimer} = useMessage();
    const navigation = useNavigation() as any


    const handleFindCategories = async ()=>{
        const categories = await findCategories(user.id);
        if(categories.status !== 200) return setMessageWithTimer('erro ao buscar categorias', 'error');

        const sortedCategories = categories.data.sort((a:any, b: any) => {
            const nameA = a.description.toLowerCase();
            const nameB = b.description.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            
            return 0;
        })
        
        setCategory(categories.data[0].id)
        setCategoriesList(sortedCategories)
        setCategoriesAction(sortedCategories)
    }

    useEffect(()=>{
        handleFindCategories()
    }, [user.id])

    useEffect(()=>{
        if(categories.length == 0) {
            handleFindCategories()
        } 
        const sortedCategories = categories.sort((a:any, b: any) => {
            const nameA = a.description.toLowerCase();
            const nameB = b.description.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            
            return 0;
        })
        console.log(sortedCategories)
        setCategory(categories[0])
        setCategoriesList(sortedCategories)
    }, [categories])

    const validateProduct = (product: any)=>{
        return validateProductCreate(product, categories, products)
    }

    const handleCreate = async ()=>{
        if(!category) return setMessageWithTimer('Selecione uma categoria', 'error');
        const productData: any = {
            userId: user.id,
            name, description, value: parseFloat(productValue.replace(',','.')),
            productionCost: parseFloat(productionCost.replace(',','.')),
            categoryId: category.id
        }


        const validation = validateProduct(productData);
        if(validation) return setMessageWithTimer(validation, 'error')

        const creation: any = await createProduct(productData);
        if(creation.status !== 200){
            return setMessageWithTimer(creation.data.message, 'error')
        } 

        const newProduct: any = {
            id: creation.data.id,
            name: creation.data.name,
            description: productData.description,
            productionCost: creation.data.productionCost,
            value: creation.data.value,
            categoryId: category.id,
        }
        
        newProductAction(newProduct);
        navigation.navigate('products')
    }

    return (
        <>
            <MessageDisplay />
            <ScrollView style={styles.page}>
                <HeaderCreation url="products" title="Crie um produto"/>
                <View style={styles.inputsDisplay}>
                <InputEdit
                    label="Nome" 
                    value={name} 
                    onChange={(value: string)=>{
                        setName(value) 
                    }}/>
                <InputEdit
                    label="Descrição" 
                    value={description} 
                    onChange={(value: string)=>{
                        setDescription(value) 
                    }}/>
                <InputNumber 
                    label={'Custo de Produção'}
                    beforeHolder="R$"
                    value={productionCost}
                    onChange={(value)=>{
                        setProductionCost(handleSetNumericValue(value)); 
                    }}
                />
                <InputNumber
                    label="Valor de venda" 
                    beforeHolder="R$"
                    value={productValue} 
                    onChange={(value)=>{
                        setProductValue(handleSetNumericValue(value))
                    }}/>
                <InputPicker label="Categoria" values={categories} selected={category} 
                    createOption="+ Nova categoria" dataType="categorias"
                    onSelect={(value:Category)=>{
                        setCategory(value)
                }}/>
                <TouchableHighlight style={styles.changeInfo}
                    underlayColor={COLORS.primaryPressed} onPress={() => { navigation.navigate('newCategory') }}>
                    <Text style={styles.changeInfoText}>criar nova categoria</Text>
                </TouchableHighlight>
                <CreateButton text={'Criar produto'} action={handleCreate}/>
            </View> 
        </ScrollView>
        </>

    )
}

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user,
    products: state.productsReducer.products,
    categories: state.categoriesReducer.categories
}) 

const mapDispatchToProps = (dispatch: Dispatch)=>({
    newProductAction: (payload: any)=> dispatch(newProduct(payload)),
    setCategoriesAction: (payload: any)=>dispatch(setCategories(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct)