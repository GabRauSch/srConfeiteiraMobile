import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { styles } from '../styles/screen.ProductItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../store';
import { setProductInfo } from '../reducers/productsReducer';
import { Product } from '../types/Product';
import { Category } from '../types/Category';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import InputEdit from '../components/InputEdit';
import InputPicker from '../components/InputPicker';
import InputNumber from '../components/InputNumber';
import CreateButton from '../components/CreateButton';
import { updateProduct } from '../services/Products';
import { handleResponse } from '../services/responseMapping';
import { validateProductEdit } from '../util/validation';
import { handleSetNumericValue, handleSetValue } from '../util/numeric';
import { HeaderCreation } from '../components/HeaderCreation';
import useMessage from '../hooks/useMessage';
import { COLORS } from '../styles/global';
import { User } from '../types/User';

type Props = {
    user: User,
    setProductInfo: (payload: any) => void
}

const ProductItem = ({ user, setProductInfo }: Props) => {
    const bolo = require('../assets/images/bolo.png');
    const route = useRoute();
    const { id } = route.params as any;
    const { MessageDisplay, setMessageWithTimer } = useMessage();
    const [productionCost, setProductionCost] = useState('0,00');
    const [productValue, setProductValue] = useState('0,00');
    const [dataUpdate, setDataUpdate] = useState(false);
    const [profit, setProfit] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Category>();
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState<string>('');
    const navigation = useNavigation() as any;

    const products = useProducts(user.id);
    const categories = useCategories(user.id);

    useEffect(() => {
        const foundProduct = products.find((product: Product) => product.id === id);
        if (foundProduct) {
            setName(foundProduct.name);
            setDescription(foundProduct.description);
            setProductionCost(foundProduct.productionCost.toFixed(2).replace('.', ','));
            setProductValue(foundProduct.value.toFixed(2).replace('.', ','));
            setProfit(calculateProfit(foundProduct.productionCost, foundProduct.value));
            setCategory(categories.find((el: any) => el.id === foundProduct?.categoryId));
            setCategoriesList(categories);
        }
    }, [id, products, categories]);

    const validateProduct = (product: any) => {
        return validateProductEdit(product, categoriesList, products);
    };

    const handleSave = async () => {
        if (!dataUpdate) return setMessageWithTimer('Nenhum dado foi alterado', 'error');

        const categoryItem = categoriesList.find((el: Category) => el.id === category?.id);
        if (!categoryItem) return setMessageWithTimer('Erro ao encontrar categoria', 'error');

        const updateData: any = {
            name,
            description,
            productionCost: parseFloat(productionCost.replace(',', '.')),
            value: parseFloat(productValue.replace(',', '.')),
        };

        if (category?.description === '+ Nova categoria') {
            updateData.categoryData = { description: newCategory };
        } else if (category) {
            updateData.categoryId = category.id;
        }

        const validation = validateProduct(updateData);
        if (validation) return setMessageWithTimer(validation, 'error');

        const update = await updateProduct(id, updateData);
        if (update.status !== 200) {
            const responseMapping = handleResponse(update.data.code);
            return setMessageWithTimer(responseMapping.message, 'error');
        }

        const updatedCategory = update.data.category || categoryItem;
        const productInfo = { id, ...updateData, category: updatedCategory.description };

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

    const handleProfit = (value: number, input: 'productionCost' | 'productValue') => {
        const newCost = input === 'productValue' ? parseFloat(productionCost.replace(',', '.')) : value;
        const newValue = input === 'productValue' ? value : parseFloat(productValue.replace(',', '.'));

        if (newCost && newValue) {
            const newProfit = calculateProfit(newCost, newValue);
            setProfit(newProfit);
        }
    };

    const calculateProfit = (newCost: number, newValue: number) => {
        return (((newValue / newCost) - 1) * 100).toFixed(2).replace('.', ',');
    };

    const handleNavigate = (url: string) => {
        navigation.navigate(url);
    };

    return (
        <>
            <SafeAreaView>

                <MessageDisplay />
                <Text style={styles.save} onPress={handleSave}>Salvar</Text>
                <View style={styles.profit}>
                    <View style={styles.profitDisplay}>
                        <TextInput
                            value={profit}
                            style={styles.profitText}
                            keyboardType="decimal-pad"
                            onChangeText={handleProfitChange}
                        />
                        <Text style={styles.profitText}>%</Text>
                    </View>
                </View>
                <ScrollView style={styles.page} contentContainerStyle={{ paddingBottom: 100 }}>
                    <HeaderCreation url="products" title="Edite o produto"/>
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
                            label="Custo de Produção"
                            beforeHolder="R$"
                            value={productionCost}
                            onChange={(value) => {
                                setProductionCost(value);
                                setDataUpdate(true);
                                handleProfit(handleSetValue(value), 'productionCost');
                            }}
                        />
                        <InputNumber
                            label="Valor de venda"
                            beforeHolder="R$"
                            value={productValue}
                            onChange={(value) => {
                                setProductValue(value);
                                setDataUpdate(true);
                                handleProfit(handleSetValue(value), 'productValue');
                            }}
                        />
                        <InputPicker
                            label="Categoria"
                            values={categoriesList}
                            selected={category}
                            createOption="+ Nova categoria"
                            onSelect={(value: Category) => {
                                setCategory(value);
                                setDataUpdate(true);
                            }}
                            dataType="categorias"
                        />
                        <TouchableHighlight style={styles.changeInfo}
                            underlayColor={COLORS.primaryPressed} onPress={() => {handleNavigate('categories') }}>
                            <Text style={styles.changeInfoText}>Nova categoria</Text>
                        </TouchableHighlight>
                        {category?.description === '+ Nova categoria' && (
                            <View style={styles.newCategoryContainer}>
                                <InputEdit
                                    label="Nova categoria"
                                    value={newCategory}
                                    onChange={setNewCategory}
                                />
                            </View>
                        )}
                    </View>
                    <CreateButton text="Salvar" action={handleSave} />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setProductInfo: (payload: any) => dispatch(setProductInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
