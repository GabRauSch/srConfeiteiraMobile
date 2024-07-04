import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/screen.ProductItem";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState, useCallback } from "react";
import InputEdit from "../components/InputEdit";
import InputPicker from "../components/InputPicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Product } from "../types/Product";
import { connect } from "react-redux";
import { RootState } from "../store";
import { Dispatch } from "redux";
import { setProductInfo } from "../reducers/productsReducer";
import { User } from "../types/User";
import { getAllProductsByUserId, getProductById, updateProduct } from "../services/Products";
import { handleResponse } from "../services/responseMapping";
import useMessage from "../hooks/useMessage";
import { handleSetNumericValue, handleSetValue } from "../util/numeric";
import { findCategories } from "../services/Categories";
import InputNumber from "../components/InputNumber";
import { validateProductEdit } from "../util/validation";
import CreateButton from "../components/CreateButton";
import { Category } from "../types/Category";
import { COLORS } from "../styles/global";
import { HeaderCreation } from "../components/HeaderCreation";

type Props = {
    user: User,
    products: Product[],
    categories: Category[],
    setProductInfo: (payload: any) => void
}

const ProductItem = ({ user, products, categories, setProductInfo }: Props) => {
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
    const navigation = useNavigation() as any

    const getData = async () => {
        let foundProducts = products;

        if (!products.length) {
            const { data, status } = await getAllProductsByUserId(user.id);
            if (status !== 200) return setMessageWithTimer('Não foi possível encontrar os produtos', 'error');
            foundProducts = data;
        }

        const foundProduct = foundProducts.find((product: Product) => product.id === id);
        if (foundProduct) {
            setName(foundProduct.name);
            setDescription(foundProduct.description);
            setProductionCost(foundProduct.productionCost.toFixed(2).replace('.', ','));
            setProductValue(foundProduct.value.toFixed(2).replace('.', ','));
            setProfit(calculateProfit(foundProduct.productionCost, foundProduct.value));
        }

        let foundCategories = categories;
        if (!categories.length) {
            const { data, status } = await findCategories(user.id);
            if (status !== 200) return setMessageWithTimer('Não foi possível encontrar as categorias', 'error');
            foundCategories = data;
        }

        setCategory(foundCategories.find((el: any) => el.id === foundProduct?.categoryId));
        setCategoriesList(foundCategories);
    };

    useEffect(() => {
        getData();
    }, [user.id]);

    const validateProduct = useCallback((product: any) => {
        return validateProductEdit(product, categories, products);
    }, [categories, products]);

    const handleSave = async () => {
        if (!dataUpdate) return setMessageWithTimer('Nenhum dado foi alterado', 'error');

        console.log(category)

        const categoryItem = categories.find((el: Category) => el.id === category?.id);
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

    const handleNavigate = (url: string)=>{
        navigation.navigate(url)
    }

    return (
        <>
            <HeaderCreation url="products" title="Edite o produto"/>
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
    products: state.productsReducer.products,
    categories: state.categoriesReducer.categories,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setProductInfo: (payload: any) => dispatch(setProductInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
