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
import Message from "../modals/Message"
import { Product } from "../types/Product"
import { RootState } from "../store"
import { User } from "../types/User"
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { setProductInfo } from "../reducers/productsReducer"

type Props = {
    user: User,
    products: Product[]
}

const NewProduct = ({user, products}: Props)=>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [productValue, setProductValue] = useState('0,00');
    const [productionCost, setProductionCost] = useState('0,00');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const {message, MessageDisplay, setMessageWithTimer} = useMessage();
    const navigate = useNavigation() as any


    const handleFindCategories = async ()=>{
        const categories = await findCategories(1)
        if(!categories) return false

        setCategories(categories)
    }

    useEffect(()=>{
        handleFindCategories();
    }, [])

    const validateProduct = (product: any)=>{
        let error;

        const foundCategory = categories.find((el: any)=>el.description == product.categoryData.description)
        const foundProduct  = products.find((el: any)=>el.name == product.name)
        if(foundProduct) return "Produto com esse nome já existe"
        if(product.categoryData.description.length <= 3) return "Categoria deve ter mais que  caractéres"
        if(foundCategory) return 'Categoria com esse nome já existe'
        if(product.name.length <= 3) return 'Nome deve ter mais que 3 caractéres'
        if(product.description.length <= 3) return 'Descrição deve ter mais que 3 caractéres';
        if(product.value < product.productionCost) return  'Valor deve ser maior que o custo de produção';
        if(product.productionCost == 0) return 'Custo de produção não pode ser igual a 0'
        if(product.value == 0) return  'Valor de venda não pode ser igual a 0'
        return error
    }

    const handleCreate = async ()=>{
        const productData: any = {
            userId: 1,
            name, description, value: parseFloat(productValue.replace(',','.')),
            productionCost: parseFloat(productionCost.replace(',','.'))
        }

        if(category == '+ Nova categoria') productData.categoryData = {description: newCategory}
        else productData.categoryId = category

        const validation = validateProduct(productData);
        if(validation) return setMessageWithTimer(validation, 'error')

        const creation = await createProduct(productData);
        console.log(creation)
        if(creation.status !== 200){
            console.log('rei')
            return setMessageWithTimer(creation.data.message, 'error')
        } 

        setProductInfo(creation.data)
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

export default connect(mapStateToProps)(NewProduct)