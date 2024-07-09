import { Image, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/screen.Categories";
import { Picker } from "@react-native-picker/picker";
import { ReactNode, useCallback, useEffect, useState } from "react";
import InputEdit from "../components/InputEdit";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getClientById, getClientProducts, updateClient } from "../services/Clients";
import { Client } from "../types/Client";
import { connect } from "react-redux";
import { RootReducer } from "../reducers";
import AddButton from "../components/AddButton";
import CreateButton from "../components/CreateButton";
import useMessage from "../hooks/useMessage";
import { validateClientEdit } from "../util/validation";
import { handleResponse } from "../services/responseMapping";
import { Dispatch } from "redux";
import { setClientInfo } from "../reducers/clientsReducer";
import { removeCategory, setCategories, updateCategory } from "../reducers/categoriesReducer";
import { Category } from "../types/Category";
import { User } from "../types/User";
import { findCategories, updateCateogoryById } from "../services/Categories";
import { HorizontalLine } from "../components/HorizontalLine";
import SearchInput from "../components/SearchInput";
import { COLORS, LABEL } from "../styles/global";
import Icon from 'react-native-vector-icons/FontAwesome';
import EditModal from "../modals/EditModal";
import ExcludeModal from "../modals/ExcludeModal";
import { Product } from "../types/Product";
import { setProducts } from "../reducers/productsReducer";
import { getAllProductsByUserId } from "../services/Products";
import { HeaderCreation } from "../components/HeaderCreation";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import LoadingPage from "../components/LoadingPage";
import useOrders from "../hooks/useOrders";
import { Order } from "../types/Order";
import useClients from "../hooks/useClients";
import { sortOrders } from "../util/sorter";
import { formatDate } from "date-fns";


type Props = {
    user: User,
}

type ClientProduct = {
    id: number,
    name: string,
    deliveryDate: Date,
    value: number,
    quantity: number
}

const ClientOrdersAndProducts = ({user}: Props) => {
    const [products, setProducts] = useState<ClientProduct[]>([]);
    const [ordersList, setOrdersList] = useState<Order[]>([]);
    const [client, setClient] = useState<Client>()
    const [loading, setLoading] = useState(true)
    const route = useRoute() as any;
    const {id: clientId} = route.params as any;
    const [uniqueDays, setUniqueDays] = useState<any[]>([])

    const orders = useOrders(user.id);
    const clients = useClients(user.id);

    useEffect(()=>{
        
        try {
            setOrdersList(orders)
            const getData = async ()=>{
                const clientProducts = await getClientProducts(clientId);
                if(clientProducts.status !== 200) return 
                
                const uniqueDates = new Set();
                clientProducts.data.map((el: any)=>{
                    uniqueDates.add(formatDate(el.deliveryDate, 'dd/MM/yyyy'))
                })

                setUniqueDays(Array.from(uniqueDates).reverse());

                console.log(Array.from(uniqueDates))
                setProducts(sortOrders(clientProducts.data))

                const foundClient = clients.find((el)=> el.id == clientId);
                console.log(foundClient)

                setClient(foundClient)
            }
            getData()
        } catch (error) {
            console.error(error)
        } finally{
            setLoading(false)
        }
    }, [clientId, orders, clients])

    if(loading){
        return (
            <LoadingPage />
        )
    }

    return (
        <View style={{padding:20}}>
            <View>
                <HeaderCreation url="clients" title={`Pedidos por ${client?.name}`}/>
            </View>
            <HorizontalLine />
            <View style={styles.page}>
                <ScrollView style={styles.categories}>
                    {uniqueDays.map((day, key)=>(
                        <View key={key}>
                        <Text style={{...LABEL}}>{day}</Text>
                            {products.filter((product)=>formatDate(product.deliveryDate, 'dd/MM/yyyy') == day).map((el, key)=>{
                                return (
                                    <View
                                        style={styles.category} 
                                        key={key}>
                                        <Text style={{fontSize: 16, flex: 6}}>{el.name}</Text>
                                        <Text style={{fontSize: 16, flex: 1}}>{el.quantity}</Text>
                                        <Text style={{fontSize: 16, flex: 2}}>R${el.value}</Text>
                                        <Text style={{fontSize: 16, flex: 2}}>R${el.value * el.quantity}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    ))}
                    <View style={{marginBottom: 360}}></View>
                </ScrollView>
            </View>
        </View>
    );
};

const mapStateToProps = (state: RootReducer)=>({
    user: state.userReducer.user
})

const mapDispatchToProps = (dispatch: Dispatch)=>({
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientOrdersAndProducts)