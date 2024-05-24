import { Image, Text, TextInput, View } from "react-native";
import { styles } from "../styles/screen.ProductItem";
import { Picker } from "@react-native-picker/picker";
import { ReactNode, useCallback, useEffect, useState } from "react";
import InputEdit from "../components/InputEdit";
import { useRoute } from "@react-navigation/native";
import { getClientById, updateClient } from "../services/Clients";
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

type Props = {
    clients: Client[],
    setClientInfoAction: (payload: any)=>void
}

const ClientItem = ({clients,setClientInfoAction}: Props) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('')
    const [email, setEmail]= useState('');
    const [totalRevenue, setTotalRevenue] = useState(0)
    const route = useRoute();
    const { id } = route.params as any;
    const [dataUpdate, setDataUpdate] = useState(false);
    const { message, MessageDisplay, setMessageWithTimer } = useMessage();


    const person = require(`../assets/images/person.png`);

    useEffect(() => {
        let foundClient: any= clients.find((client) => client.id == id);
        if (!foundClient) {
            foundClient = getClientById(id);
        }
        if (foundClient) {
            setName(foundClient.name);
            setPhone(foundClient.phone);
            setAddress(foundClient.address)
            setTotalRevenue(foundClient.totalOrderValue)
        }
    }, []);

    const validateClient = useCallback((client: any) => {
        return validateClientEdit(client)
    }, []);
    const handleSave = async ()=>{
        if (!dataUpdate) return setMessageWithTimer('Nenhum dado foi alterado', 'error');
        const updateData: any = {
            name, phone
        }
        if(email) updateData.email = email;

        const validation = validateClient(updateData);
        if(validation) return setMessageWithTimer(validation, 'error');

        const updated = await updateClient(id, updateData);
        if(updated.status !== 200) {
            const response = handleResponse(updated.data);
            console.log(updated.data)
            return setMessageWithTimer(response.message, response.type)
        }

        setClientInfoAction({id, ...updateData})

        return setMessageWithTimer('Cliente alterado!', 'success')
    }

    const handleNavigate = (url: string, params: any)=>{
        // 
    }

    return (
        <>
            <MessageDisplay />
            <View style={styles.page}>
                <Text style={styles.save} onPress={handleSave}>Salvar</Text>
                <View style={styles.profit}>
                    <View style={styles.profitDisplay}>
                        <Text style={styles.profitText}>R${totalRevenue.toFixed(2).replace('.', ',')}</Text>
                    </View>
                </View>
                <View style={styles.imageDisplay}>
                    <Image source={person} style={styles.itemImage}/>
                </View>
                <View style={styles.productInfo}>
                    <InputEdit onChange={(value)=>{setDataUpdate(true); setName(value)}} label="Nome" value={name} main={true}/>
                    <InputEdit onChange={(value)=>{setDataUpdate(true); setPhone(value)}} label="Telefone" value={phone}/>
                    <InputEdit optional onChange={(value)=>{setDataUpdate(true); setEmail(value)}} label="Email" value={email}/>
                    <InputEdit optional onChange={(value)=>{setDataUpdate(true); setAddress(value)}} label="Endereço" value={address}/>
                    <CreateButton text={'Novo pedido'} 
                        action={()=>handleNavigate('Orders', {screen: 'newOrder', clientId: id})} />
                </View>
            </View>
        </>
    );
};

const mapStateToProps = (state: RootReducer)=>({
    clients: state.clientsReducer.clients
})

const mapDispatchToProps = (dispatch: Dispatch)=>({
    setClientInfoAction: (payload: any)=>dispatch(setClientInfo(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientItem)