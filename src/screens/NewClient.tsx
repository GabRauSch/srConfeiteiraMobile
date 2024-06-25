import { ScrollView, TextInput, TouchableOpacity, View } from "react-native"
import {styles} from '../styles/screen.NewProduct'
import InputEdit from "../components/InputEdit"
import { useEffect, useState } from "react"
import CreateButton from "../components/CreateButton"
import useMessage from "../hooks/useMessage"
import { RootState } from "../store"
import { User } from "../types/User"
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Dispatch } from "redux"
import { validateClientCreate, validateProductCreate } from "../util/validation"
import { createClient } from "../services/Clients"
import { Client } from "../types/Client"
import { newClient } from "../reducers/clientsReducer"
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../styles/global"


type Props = {
    user: User,
    clients: Client[],
    newClientAction: (payload: any)=>void
}

const NewClient = ({user, clients, newClientAction}: Props)=>{
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const {MessageDisplay, setMessageWithTimer} = useMessage();
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigation() as any

    const validateClient = (client: any)=>{
        return validateClientCreate(client)
    }

    const handleCreate = async ()=>{
        const clientData: any = {
            userId: user.id,
            name
        }
        if(phone) clientData.phone = phone;
        if(email) clientData.email = email;
        if(address) clientData.address = address

        const validation = validateClient(clientData);
        if(validation) return setMessageWithTimer(validation, 'error')

        const creation: any = await createClient(clientData);
        console.log(creation.data)
        if(creation.status !== 200){
            return setMessageWithTimer(creation.data.message, 'error')
        } 

        const newClient: Client = {
            id: creation.data.id,
            name: creation.data.name,
            orderCount: 0,
            totalOrderValue: 0,
            phone: creation.data.phone,
            email: creation.data.email,
            nextDeliveryDate: creation.data.nextDeliveryDate
        }
        
        console.log(clients)
        newClientAction(newClient);
        navigate.navigate('Clients', {screen: 'clients'})
    }

    const handleNavigate = (url: string)=>{
        navigate.navigate(url)
    }

    return (
        <>
        <MessageDisplay />
        <TouchableOpacity style={styles.home} onPress={() => handleNavigate('clients')} activeOpacity={.9}>
            <Icon name="arrow-left" color={COLORS.primary} size={15} />
        </TouchableOpacity>
        <ScrollView style={styles.page}>
            <View style={styles.inputsDisplay}>
                <InputEdit
                    label="Nome" 
                    value={name} 
                    onChange={(value: string)=>{
                        setName(value) 
                    }}/>
                <InputEdit
                    keyboard='phone-pad'
                    label="Telefone" 
                    value={phone} 
                    onChange={(value: string)=>{
                        setPhone(value) 
                    }}/>
                <InputEdit
                    optional
                    label="Email" 
                    value={email} 
                    onChange={(value: string)=>{
                        setEmail(value) 
                    }}/>
                <InputEdit
                    optional
                    label="Endereço" 
                    value={address} 
                    onChange={(value: string)=>{
                        setAddress(value) 
                    }}/>
                <CreateButton text={'Cadastrar cliente'} action={handleCreate}/>
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
    newClientAction: (payload: any)=> dispatch(newClient(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewClient)