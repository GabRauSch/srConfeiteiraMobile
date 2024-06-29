import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/screen.ProductItem";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState, useCallback, useMemo } from "react";
import InputEdit from "../components/InputEdit";
import InputPicker from "../components/InputPicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Product } from "../types/Product";
import { connect } from "react-redux";
import { RootState } from "../store";
import { Dispatch } from "redux";
import { setProductInfo } from "../reducers/productsReducer";
import { User } from "../types/User";
import { getProductById, updateProduct } from "../services/Products";
import { handleResponse } from "../services/responseMapping";
import useMessage from "../hooks/useMessage";
import { handleSetNumericValue, handleSetValue } from "../util/numeric";
import { findCategories } from "../services/Categories";
import InputNumber from "../components/InputNumber";
import { validateProductEdit } from "../util/validation";

type Props = {
    user: User,
    products: Product[],
    setProductInfo: (payload: any) => void
}

const ProductItem = ({ user, products, setProductInfo }: Props) => {
    const bolo = require('../assets/images/bolo.png');
    const route = useRoute();
    const [productionCost, setProductionCost] = useState('0,00');
    const [productValue, setProductValue] = useState('0,00');
    const [dataUpdate, setDataUpdate] = useState(false);
    const { id } = route.params as any;
    const {MessageDisplay, setMessageWithTimer } = useMessage();
    const [profit, setProfit] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<any>();
    const [categories, setCategories] = useState<any>([]);
    const [newCategory, setNewCategory] = useState('');

    const findProduct = useCallback(async (id: any) => {
        return await getProductById(id);
    }, []);

    const handleCategories = useCallback(async (category: string) => {
        const categories = await findCategories(user.id);
        if (categories.status !== 200) return false;

        setCategory(categories.data.find((el: any) => el.description === category).id);
        setCategories(categories);
    }, []);

    useEffect(() => {
        let foundProduct: any = products.find((product) => product.id == id);
        if (!foundProduct) {
            foundProduct = findProduct(id);
        }
        if (foundProduct) {
            setName(foundProduct.name);
            setDescription(foundProduct.description);
            setProductionCost(foundProduct.productionCost.toFixed(2).replace('.', ','));
            setProductValue(foundProduct.value.toFixed(2).replace('.', ','));
            console.log(foundProduct)
            setProfit((((parseFloat(foundProduct.value) - parseFloat(foundProduct.productionCost)) / parseFloat(foundProduct.value)) * 100).toFixed(2).replace('.', ','));
        }

        handleCategories(foundProduct.category);
    }, [id]);

    const validateProduct = useCallback((product: any) => {
        return validateProductEdit(product, categories, products)
    }, []);

    const handleSave = async () => {
        if (!dataUpdate) return setMessageWithTimer('Nenhum dado foi alterado', 'error');

        let categoryItem = categories.find((el: any) => el.id == category);
        const updateData: any = {
            name, description, productionCost: parseFloat(productionCost.replace(',', '.')),
            value: parseFloat(productValue.replace(',', '.')),
        };

        let categoryId; 
        let categoryDescription;       
        if(category == '+ Nova categoria') {
            updateData.categoryData = {description: newCategory};
        } else if (category) {
            updateData.categoryId = category;
            categoryDescription = categoryItem.description;
            categoryId = category
        }

        
        const validation = validateProduct(updateData);
        if (validation) return setMessageWithTimer(validation, 'error');
        
        const update = await updateProduct(id, updateData);
        
        if (update.status != 200) { 
            const responseMapping = handleResponse(update.data.code);
            return setMessageWithTimer(responseMapping.message, 'error') 
        }

        if(update.data.category && update.data.category.id){
            categoryId = update.data.category.id;
            categoryDescription = update.data.category.description
        };

        const productInfo = { 
            id, 
            ...updateData, 
            category: categoryDescription 
        }
        console.log(productInfo)
        setProductInfo(productInfo);
        setMessageWithTimer('Produto alterado', 'success');
    };

    const handleProfitChange = (value: string) => {
        const percentage = parseFloat(handleSetNumericValue(value)) / 100;
        const newCost = parseFloat(productionCost.replace(',', '.')) * (1 + percentage);
        setProductValue(newCost.toFixed(2).replace('.', ','));
        setProfit(handleSetNumericValue(value));
        setDataUpdate(true);
    };
    

    const calculateProfit = (value: number, input: 'productionCost' | 'productValue') => {
        let newCost, newValue;
        if(input == 'productValue'){
            newCost = parseFloat(productionCost.replace(',', '.'));
            newValue = value;
        } else{
            newCost = value;
            newValue = parseFloat(productValue.replace(',', '.'));
        }
        if (newCost && newValue) {
            const newProfit = (((newValue / newCost) -1) * 100).toFixed(2).replace('.',',')
            setProfit(newProfit);
        }
    };

    return (
        <>
            <SafeAreaView>
                <MessageDisplay />
                <>
                    <Text style={styles.save} onPress={handleSave}>Salvar</Text>
                    <View style={styles.profit}>
                        <View style={styles.profitDisplay}>
                            <TextInput
                                value={profit}
                                style={styles.profitText}
                                keyboardType="decimal-pad"
                                onChangeText={(value) => {
                                    handleProfitChange(value);
                                }}
                            />
                            <Text style={styles.profitText}>%</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.page} contentContainerStyle={{ paddingBottom: 100 }}>
                        <>
                            <View style={styles.imageDisplay}>
                                <Image source={bolo} style={styles.itemImage} />
                            </View>
                            <View style={styles.productInfo}>
                                <InputEdit
                                    label="Nome"
                                    value={name}
                                    main={true}
                                    onChange={(value: string) => {
                                        setName(value);
                                        setDataUpdate(true);
                                    }}
                                />
                                <InputEdit
                                    label="Descrição"
                                    value={description}
                                    onChange={(value: string) => {
                                        setDescription(value);
                                        setDataUpdate(true);
                                    }}
                                />
                                <InputNumber
                                    label={'Custo de Produção'}
                                    beforeHolder="R$"
                                    value={productionCost}
                                    onChange={(value) => {
                                        setProductionCost(value);
                                        setDataUpdate(true);
                                        calculateProfit(handleSetValue(value), 'productionCost')
                                    }}
                                />
                                <InputNumber
                                    label="Valor de venda"
                                    beforeHolder="R$"
                                    value={productValue}
                                    onChange={(value) => {
                                        setProductValue(value);
                                        setDataUpdate(true);
                                        calculateProfit(handleSetValue(value), 'productValue')
                                    }}
                                />

                                <InputPicker
                                    label="Categoria"
                                    values={categories}
                                    selected={category}
                                    createOption="+ Nova categoria"
                                    onSelect={(value: string) => {
                                        setCategory(value);
                                        setDataUpdate(true);
                                    }}
                                />
                                {category === '+ Nova categoria' && (
                                    <View style={styles.newCategoryContainer}>
                                        <InputEdit
                                            label={'Nova categoria'}
                                            value={newCategory}
                                            onChange={(value) => { setNewCategory(value); }}
                                        />
                                    </View>
                                )}
                            </View>
                        </>
                    </ScrollView>
                </>
            </SafeAreaView>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
    products: state.productsReducer.products
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    setProductInfo: (payload: any) => dispatch(setProductInfo(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);