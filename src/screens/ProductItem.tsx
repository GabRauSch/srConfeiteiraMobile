import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
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
import { handleSetNumericValue } from "../util/numeric";
import { findCategories } from "../services/Categories";
import InputNumber from "../components/InputNumber";

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
    const { message, MessageDisplay, setMessageWithTimer } = useMessage();
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
        const categories = await findCategories(1);
        if (!categories) return false;

        setCategory(categories.find((el: any) => el.description === category).id);
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
            setProfit((((parseFloat(foundProduct.value) - parseFloat(foundProduct.productionCost)) / parseFloat(foundProduct.value)) * 100).toFixed(2).replace('.', ','));
        }

        handleCategories(foundProduct.category);
    }, [id, products, findProduct, handleCategories]);

    const validateProduct = useCallback((product: any) => {
        let error;
        if (product.name.length <= 3) return 'Nome deve ter mais que 3 caractéres';
        if (product.description.length <= 3) return 'Descrição deve ter mais que 3 caractéres';
        if (product.value < product.productionCost) return 'Valor deve ser maior que o custo de produção';
        if (product.productionCost == 0) return 'Custo de produção não pode ser igual a 0';
        if (product.value == 0) return 'Valor de venda não pode ser igual a 0';
        return error;
    }, []);

    const handleSave = async () => {
        if (!dataUpdate) return setMessageWithTimer('Nenhum dado foi alterado', 'error');

        const categoryItem = categories.find((el: any) => el.id == category);
        const updateData: any = {
            name, description, productionCost: parseFloat(productionCost.replace(',', '.')),
            value: parseFloat(productValue.replace(',', '.')),
        };

        if (category) updateData.categoryId = category;
        const validation = validateProduct(updateData);
        if (validation) return setMessageWithTimer(validation, 'error');

        const update = await updateProduct(id, updateData);
        const responseMapping = handleResponse(update.code);
        if (update.status != 200) { return setMessageWithTimer(responseMapping.message, 'error') }
        setMessageWithTimer('Produto alterado', 'success');
        setProductInfo({ id, ...updateData, category: categoryItem.description });
    };

    const handleProfitChange = (value: string) => {
        const percentage = parseFloat(handleSetNumericValue(value)) / 100;
        const newCost = parseFloat(productionCost.replace(',', '.')) * (1 + percentage);
        setProductValue(newCost.toFixed(2).replace('.', ','));
        setProfit(handleSetNumericValue(value));
        setDataUpdate(true);
    };
    

    const calculateProfit = () => {
        const cost = parseFloat(productionCost.replace(',', '.'));
        const value = parseFloat(productValue.replace(',', '.'));
        if (cost && value) {
            setProfit(((value - cost) / value * 100).toFixed(2).replace('.', ','));
        }
    };

    return (
        <>
            <View>
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
                    <ScrollView style={styles.page}>
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
                                        setProductionCost(handleSetNumericValue(value));
                                        setDataUpdate(true);
                                        calculateProfit()
                                    }}
                                />
                                <InputNumber
                                    label="Valor de venda"
                                    beforeHolder="R$"
                                    value={productValue}
                                    onChange={(value) => {
                                        setProductValue(handleSetNumericValue(value));
                                        setDataUpdate(true);
                                        calculateProfit()
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
                                    <View>
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
            </View>
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
