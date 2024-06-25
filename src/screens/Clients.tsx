import { SafeAreaView, ScrollView, Text, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "../styles/screen.Clients";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAllClientsByUserId } from "../services/Clients";
import { User } from "../types/User";
import { connect } from "react-redux";
import { RootState } from "../store";
import { Client } from "../types/Client";
import SearchInput from "../components/SearchInput";
import OptionItem from "../components/OptionItem";
import ClientItem from '../components/ClientItem'
import { remainingTimeFrom } from "../util/transform";
import { Dispatch } from "redux";
import { setClients } from "../reducers/clientsReducer";
import { sortClients } from "../util/sorter";

type Props = {
    user: User,
    clients: Client[]
    setClientsAction: (payload: any[])=>void
}

const ClientsScreen = ({user, clients, setClientsAction}: Props)=>{
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigation() as any
    const [clientsList, setClientsList] = useState<any[]>([]);
    const options = ['Todos', 'Com pedidos'];
    const [activeKey, setActiveKey] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); 

    useEffect(()=>{
        const handleGetData = async ()=>{
            const response = await getAllClientsByUserId(user.id as number);
            console.log(response.data)
            if(response.status !== 200) return
            const sortedClients =  sortClients(response.data)
            setClientsList(sortedClients);
            setClientsAction(sortedClients)
        };
        handleGetData()
    }, [user.id]); 

    useEffect(() => {
        console.log(clients)
        const sortedClients = sortClients(clients)
        console.log('sorted', sortedClients)
        setClientsList(sortedClients);
    }, [clients]);

    const toggleModal = ()=>{
        setModalVisible(!modalVisible)
    }
    const closeModal = ()=>{
        setModalVisible(false)
    }

    const handleCategorySelect = (category: string, key: number) => {
        console.log(category);
        setSelectedCategory(category === "Todos" ? null : category);
        console.log(clientsList)
        setActiveKey(key);
    };

    const handleNavigate = (url: string, id: number)=>{
        console.log(id)
        navigate.navigate(url, {id})
    }
    const search = (value: string)=>{
        let clientsFiltered = clients.filter((el)=> el.name.toLowerCase().includes(value.toLowerCase()));
        
        if(clientsFiltered)
        setClientsList(clientsFiltered)
    }
    const completeSearch = ()=>{

    }

    return(
        <>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalBackground} />
            </TouchableWithoutFeedback>
            <SearchInput onChange={search} onSearch={completeSearch} />
            <View>
                <ScrollView horizontal={true} style={styles.options}
                    showsHorizontalScrollIndicator={false}
                    >
                    {options.map((option, key) => (
                        <OptionItem
                            key={key}
                            option={option}
                            handleActive={() => {
                                handleCategorySelect(option, key);
                            }}
                        active={activeKey == key}
                        />
                    ))} 
                </ScrollView>
            </View>
            <ScrollView style={styles.scroll}>
                <View style={styles.scrollView}>

                {clientsList.length > 0 ? (
                    clientsList.filter((el)=>el.orderCount >= activeKey).map((client: Client, key)=>(
                        <ClientItem 
                            key={key}
                            id={client.id}
                            name={client.name}
                            phone={client.phone}
                            orderCount={client.orderCount}
                            totalOrderValue={client.totalOrderValue}
                            nextDeliveryDate={remainingTimeFrom(client.nextDeliveryDate)}
                            onPress={()=>handleNavigate('client', client.id)}
                        />
                    ))
                ) : (
                    <Text style={styles.messageNoRegister}>Nenhum cliente encontrado</Text>
                )}
            </View>

            </ScrollView>
        </>
    )    
}

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user,
    clients: state.clientsReducer.clients
})

const mapDispatchToProps = (dispatch: Dispatch)=>({
    setClientsAction: (payload: any)=>dispatch(setClients(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientsScreen)