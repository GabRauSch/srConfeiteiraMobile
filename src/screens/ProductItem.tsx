import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/screen.ProductItem";
import { Picker } from "@react-native-picker/picker";
import { ReactNode, useEffect, useState } from "react";
import InputEdit from "../components/InputEdit";
import InputPicker from "../components/InputPicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Product } from "../types/Product";
import { connect } from "react-redux";
import { RootState } from "../store";
import { Dispatch } from "redux";
import { setProductInfo, setProducts } from "../reducers/productsReducer";
import { User } from "../types/User";
import { getProductById, updateProduct } from "../services/Products";
import { handleResponse } from "../services/responseMapping";
import NumericInput from "react-native-numeric-input";
import TextInputMasked from 'react-native-mask-input'
import InputNumber from "../components/InputNumber";
import useMessage from "../hooks/useMessage";
import { handleSetNumericValue } from "../util/numeric";
import { getUniqueCategories } from "../util/transform";
import { findCategories } from "../services/Categories";

type ChangeHandler = (maskedValue: any, unmaskedValue: number) => void;
type Props = {
    user: User,
    products: Product[],
    setProductInfo: (payload: any)=>void
}

const ProductItem = ({user, products, setProductInfo}: Props) => {
    const bolo = require('../assets/images/bolo.png');
    const route = useRoute();
    const [productionCost, setProductionCost] = useState('0,00')
    const [productValue, setProductValue] = useState('0,00')
    const [dataUpdate, setDataUpdate] = useState(false)
    const {id} = route.params as any;
    const {message, MessageDisplay, setMessageWithTimer} = useMessage();
    const [profit, setProfit] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [categoryId, setCategoryId] = useState(0)
    const [categories, setCategories] = useState<any>([])

    const findProduct = async (id: any)=>{
        return await getProductById(id) 
    }

    const handleCategories = async ()=>{
        const categories = await findCategories(1)
        if(!categories) return false

        setCategories(categories)
    }
    useEffect(()=>{
        let foundProduct: any = products.find((product)=>product.id == id)
        console.log()
        if(!foundProduct){
           foundProduct = findProduct(id)
        }
        console.log(foundProduct)
        if(foundProduct){
            setName(foundProduct.name);
            setDescription(foundProduct.description);
            setCategoryId(foundProduct.categoryId);
            setProductionCost(foundProduct.productionCost.toFixed(2).replace('.', ','));
            setProductValue(foundProduct.value.toFixed(2).replace('.',','))
            setProfit((((parseFloat(foundProduct.value) - parseFloat(foundProduct.productionCost))/parseFloat(foundProduct.value))*100).toFixed(2).replace('.',','))
        }

        handleCategories()
    }, [id])

    const validateProduct = (product: any)=>{
        let error;
        console.log(product.category)
        if(product.name.length <= 3) return 'Nome deve ter mais que 3 caractéres'
        if(product.description.length <= 3) return 'Descrição deve ter mais que 3 caractéres';
        if(product.value < product.productionCost) return  'Valor deve ser maior que o custo de produção';
        if(product.productionCost == 0) return 'Custo de produção não pode ser igual a 0'
        if(product.value == 0) return  'Valor de venda não pode ser igual a 0'
        return error
    }

    const handleSave = async ()=>{
        if(!dataUpdate) return setMessageWithTimer('Nenhum dado foi alterado', 'error')
        
        const updateData: any = {
            name, description, productionCost: parseFloat(productionCost.replace(',','.')),
            value: parseFloat(productValue.replace(',','.'))
        }

        if(categoryId) updateData.categoryId = categoryId
        const validation = validateProduct(updateData);
        if(validation) return setMessageWithTimer(validation, 'error')
        
        const update = await updateProduct(id, updateData);
        const responseMapping = handleResponse(update.code)
        if(update.status != 200){return setMessageWithTimer(responseMapping.message, 'error')}
        setMessageWithTimer('Produto alterado', 'success')
        console.log(id, updateData)
        setProductInfo({id, ...updateData})
    }    

    const handleProfitChange = (value: string)=>{
        console.log('setting value', value)
        const percentage = parseFloat(handleSetNumericValue(value)) / 100;
        const newValue = parseFloat(productionCost.replace(',','.')) + (parseFloat(productionCost.replace(',','.')) * percentage);
        setProductValue(newValue.toFixed(2).replace('.',','))
        setProfit(handleSetNumericValue(value))
    }

    return (
        <>
        <MessageDisplay />
        {name &&
            <>
            <Text style={styles.save} onPress={handleSave}>Salvar</Text>
            <View style={styles.profit}>
                <View style={styles.profitDisplay}>
                    <TextInput value={profit}
                        style={styles.profitText}
                        keyboardType="decimal-pad"
                        onChangeText={(value)=>{
                            handleProfitChange(value)
                            setDataUpdate(true)
                        }}
                        />
                    <Text style={styles.profitText}>%</Text>
                </View>
            </View>
            <ScrollView style={styles.page}>
                    
                        <>
                        <View style={styles.imageDisplay}>
                            <Image source={bolo} style={styles.itemImage}/>
                        </View>
                        <View style={styles.productInfo}>
                            <InputEdit label="Nome" value={name} main={true}
                                onChange={(value: string)=>{
                                    setName(value)
                                    setDataUpdate(true)    
                                }}/>
                            <InputEdit
                                label="Descrição" 
                                value={description} 
                                onChange={(value: string)=>{
                                    setDescription(value)
                                    setDataUpdate(true)    
                                }}/>

                            <InputNumber 
                                label={'Custo de Produção'}
                                beforeHolder="R$"
                                value={productionCost}
                                onChange={(value)=>{
                                    setProductionCost(handleSetNumericValue(value)); 
                                    setDataUpdate(true)
                                }}
                            />
                            <InputNumber
                                label="Valor de venda" 
                                beforeHolder="R$"
                                value={productValue} 
                                onChange={(value)=>{
                                    setProductValue(handleSetNumericValue(value))
                                    setDataUpdate(true)
                                }}/>
                            <InputPicker label="Categoria" values={categories} selected={categoryId} 
                                onSelect={(value:string)=>{
                                    setCategoryId(parseInt(value))
                                    setDataUpdate(true)    
                                }}/>
                        </View>
                    </>
                    
            </ScrollView>
            </>
            }   
        </>
    );
};

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user,
    products: state.productsReducer.products
})
const mapDispatchToProps = (dispatch: Dispatch)=>({
    setProductInfo: (payload: any)=> dispatch(setProductInfo(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)