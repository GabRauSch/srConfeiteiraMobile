import { SafeAreaView, Text, View } from "react-native"
import {styles} from '../styles/screen.Orders'
import SearchInput from "../components/SearchInput"
import AddButton from "../components/AddButton"
import OptionsList from "../components/OptionsList"
import { HorizontalLine } from "../components/HorizontalLine"
import { Product } from "../types/Product"
import ProductItem from "../components/ProductItem"

export const ProductsScreen = ()=>{
    const products: Product[] = [
{id: 0, name: 'Bolo de bacalhau', description: 'Um delicioso bolo  de bacalhau', value: 30,cost:20,photo:'',size: 20,format: ''},
{id: 0, name: 'Bolo de bacalhau', description: 'Um delicioso bolo  de bacalhau', value: 30,cost:20,photo:'',size: 20,format: ''},
{id: 0, name: 'Bolo de bacalhau', description: 'Um delicioso bolo  de bacalhau', value: 30,cost:20,photo:'',size: 20,format: ''},
{id: 0, name: 'Bolo de bacalhau', description: 'Um delicioso bolo  de bacalhau', value: 30,cost:20,photo:'',size: 20,format: ''}
    ]

    return (
        <SafeAreaView style={styles.page}>
            <SearchInput />
            <View>
                <OptionsList options={["Todas", 'Docinhos', 'Bolos', 'Mais']}/>
            </View>
            <HorizontalLine />
            <View>
                <Text style={styles.separator}>Bolos</Text>
                <View style={styles.products}>
                    {products.map((product, key)=>{
                        return key < 2 ? (
                            <ProductItem 
                                key={key} image={product.photo} 
                                value={product.value} name={product.name} 
                                description={product.description}
                            />
                        ) : (
                            <View></View>
                        )
                    })}
                </View>
            </View>
            <View style={styles.addButonArea}>
                <AddButton></AddButton>
            </View>
        </SafeAreaView>
    )
}