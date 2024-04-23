import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { styles } from "../styles/screen.Products";
import SearchInput from "../components/SearchInput";
import AddButton from "../components/AddButton";
import OptionItem from "../components/OptionItem";
import { HorizontalLine } from "../components/HorizontalLine";
import { Product } from "../types/Product";
import ProductItem from "../components/ProductItem";
import Collapsible from "react-native-collapsible";
import { useEffect, useState } from "react";
import { getUniqueCategories } from "../util/transform";
import { useNavigation } from "@react-navigation/native";
import { products } from "../services/products";
import { CreateOptions } from "../modals/CreateOptions";

export const ProductsScreen = () => {
    const [activeKey, setActiveKey] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 
    const [createOptionsDisplay, setCreateOptionsDisplay] = useState(false)
    const navigate = useNavigation() as any
    
    const categories = getUniqueCategories(products) as string[];
    const options = ["Todas", ...categories.slice(0, 3), 'mais']
    const [categoriesCollapseMap, setCategoriesCollapseMap] = useState(Array.from({length: categories.length}, () => false));

    const handleToggleCategory = (catKey: number)=>{
        const updatedCollapseMap = [...categoriesCollapseMap];
        updatedCollapseMap[catKey] = !updatedCollapseMap[catKey];
        setCategoriesCollapseMap(updatedCollapseMap);
    }
    const filteredCategories = selectedCategory 
        ? categories.filter(category => category === selectedCategory) 
        : categories;

    const handleCategorySelect = (category: string, key: number) => {
        if(category === 'mais') return navigate.navigate('listCategories')
        setSelectedCategory(category === "Todas" ? null : category);
        setActiveKey(key);
    };

    const handleRedirect = (url: string, id: number)=>{
        navigate.navigate(url, {id})
    }

    return (
        <ScrollView style={styles.scroll}>
            {filteredCategories.map((category: any, catKey) => (
                <View key={catKey} style={styles.categoryDivision}>
                    <Text style={styles.separator} onPress={()=>{handleToggleCategory(catKey)}}>{category}</Text>
                    <View style={styles.products}>
                        {products.filter(product => product.category === category).slice(0, categoriesCollapseMap[catKey] ? products.length : 2).map((product, key) => (
                            <ProductItem
                                key={key}
                                image={product.photo}
                                value={product.value}
                                name={product.name}
                                description={product.description}
                                onPress={()=>{handleRedirect(`product`, product.id)}}
                            />
                        ))}
                    </View>
                    {products.filter(product => product.category === category).length > 2 && (
                        <Text style={styles.expandButton} onPress={()=>{handleToggleCategory(catKey)}}>
                            {categoriesCollapseMap[catKey] ? ("Menos") : ("Mais")}
                        </Text>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};
