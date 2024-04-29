import { Image, Text, TextInput, View } from "react-native";
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
import { setProductInfo } from "../reducers/productsReducer";
import { User } from "../types/User";
import { updateProduct } from "../services/Products";
import { handleResponse } from "../services/responseMapping";

type Props = {
    user: User,
    products: Product[],
    setProductInfo: (payload: any)=>void
}

const ProductItem = ({user, products, setProductInfo}: Props) => {
    const bolo = require('../assets/images/bolo.png');
    const route = useRoute();
    const [product, setProduct] = useState<Product>();

    const {id} = route.params as any;

    const categories =  ["Bolos", "Doces", "Pastéis"]
    useEffect(()=>{
        setProduct(products.find((product)=>product.id == id))
    }, [])

    const handleSave = async ()=>{
        if(!product) return
        const {id, category, ...updateData} = product
        const update = await updateProduct(user.id, updateData);
        console.log(update)
        handleResponse(update)
    }

    return (
        <View style={styles.page}>
            {product &&
                (   
                <>
                    <Text style={styles.save} onPress={handleSave}>Salvar</Text>
                    <View style={styles.profit}>
                        <View style={styles.profitDisplay}>
                            <Text style={styles.profitText}>
                                {`${((product.value/product.productionCost)*100).toFixed(0)}%`} lucro
                            </Text>
                        </View>
                    </View>
                    <View style={styles.imageDisplay}>
                        <Image source={bolo} style={styles.itemImage}/>
                    </View>
                    <View style={styles.productInfo}>
                        <InputEdit label="Nome" value={product.name} main={true}
                            onChange={(value: string)=>{setProduct({...product, name: value})}}/>
                        <InputEdit
                            label="Descrição" 
                            value={product.description} 
                            onChange={(value: string)=>{setProduct({...product, description: value})}}/>
                        <InputEdit
                            label="Custo de produção" 
                            value={`R$${product.productionCost.toFixed(2).replace('.',',')}`} 
                            onChange={(value: any)=>{setProduct({...product, productionCost: value})}}/>
                        <InputEdit
                            label="Valor de venda" 
                            value={`R$${product.value.toFixed(2).replace('.',',')}`} 
                            onChange={(value: any)=>{setProduct({...product, value: value})}}/>
                        <InputPicker label="Categoria" values={categories} selected={product.category} 
                            onSelect={(value:string)=>{setProduct({...product, category: value})}}/>
                    </View>
                </>
                )
            }
        </View>
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