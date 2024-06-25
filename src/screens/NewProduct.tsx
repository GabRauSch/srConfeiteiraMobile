import { ScrollView, TextInput, View } from "react-native"
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

type Props = {
    user: User,
    products: Product[],
    newProductAction: (payload: any)=>void
}

const NewProduct = ({user, products, newProductAction}: Props)=>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [productValue, setProductValue] = useState('0,00');
    const [productionCost, setProductionCost] = useState('0,00');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const {MessageDisplay, setMessageWithTimer} = useMessage();
    const navigate = useNavigation() as any


    const handleFindCategories = async ()=>{
        const categories = await findCategories(user.id)
        if(!categories) return false;

        console.log(categories)
        const sortedCategories = categories.sort((a:any, b: any) => {
            const nameA = a.description.toLowerCase();
            const nameB = b.description.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
          
            return 0;
        })

        setCategory(categories[0].id)
        setCategories(sortedCategories)
    }

    useEffect(()=>{
        handleFindCategories();
    }, [])

    const validateProduct = (product: any)=>{
        return validateProductCreate(product, categories, products)
    }

    const handleCreate = async ()=>{
        const productData: any = {
            userId: user.id,
            name, description, value: parseFloat(productValue.replace(',','.')),
            productionCost: parseFloat(productionCost.replace(',','.'))
        }

        if(category == '+ Nova categoria') productData.categoryData = {description: newCategory}
        else {
            productData.categoryId = category
        }

        const validation = validateProduct(productData);
        if(validation) return setMessageWithTimer(validation, 'error')

        const creation: any = await createProduct(productData);
        if(creation.status !== 200){
            return setMessageWithTimer(creation.data.message, 'error')
        } 

        if(!productData.categoryData){
            productData.categoryData = categories.find((el: any)=>el.id === creation.data.categoryId)
        }
        const newProduct: any = {
            categoryId: creation.categoryId,
            category: productData.categoryData.description,
            description: productData.description,
            id: creation.data.id,
            name: creation.data.name,
            productionCost: creation.data.productionCost,
            value: creation.data.value,
        }
        
        newProductAction(newProduct);
        navigate.navigate('products')
    }

    return (
        <>
            <MessageDisplay />
            <ScrollView style={styles.page}>
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
                    createOption="+ Nova categoria"
                    onSelect={(value:string)=>{
                        setCategory(value)
                    }}/>
                {category === '+ Nova categoria' && (
                    <View>
                        <InputEdit 
                            label={'Nova categoria'}
                            value={newCategory}
                            onChange={(value)=>{setNewCategory(value)}}
                        />
                    </View>
                )}
                <CreateButton text={'Criar produto'} action={handleCreate}/>
            </View> 
        </ScrollView>
        </>

    )
}

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user,
    products: state.productsReducer.products
}) 

const mapDispatchToProps = (dispatch: Dispatch)=>({
    newProductAction: (payload: any)=> dispatch(newProduct(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct)