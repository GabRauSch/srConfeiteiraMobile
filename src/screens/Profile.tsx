import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import {styles} from '../styles/screen.Profile'
import Icon from "react-native-vector-icons/FontAwesome";
import InputEdit from "../components/InputEdit";
import { COLORS } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { User } from "../types/User";
import { connect } from "react-redux";
import { RootState } from "../store";
import { validateEditProfile } from "../validation/Profile";
import useMessage from "../hooks/useMessage";
import { updateUser } from "../services/User";
import { setUser } from "../reducers/userReducer";
import { Dispatch } from "redux";

type Props = {
    user: User,
    setUserAction: (payload: any)=>void
}

const Profile = ({user, setUserAction}: Props)=>{
    const person = require('../assets/images/person.png');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const {setMessageWithTimer, MessageDisplay} = useMessage()

    const iconSize = 12

    useEffect(()=>{
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone)
    }, [])

    const navigate = useNavigation() as any
    const handleNavigate = (url: string)=>{
        navigate.navigate(url)
    }   

    const handleCancel = ()=>{

    }
    const handleSave = async ()=>{
        const validation = validateEditProfile(name, phone)
        if(validation) return setMessageWithTimer(validation, 'error');

        const updated = await updateUser(user.id, {name, phone});
        if(updated.status !== 200) return setMessageWithTimer('Erro ao editar', 'error');

        const updatedUser = {
            ...user,
            phone, name
        }
        setUserAction(updatedUser)
        setMessageWithTimer('Editado com sucesso', 'success')
    }

    return (
        <>
            <MessageDisplay />
            <View style={styles.page}>

                <View style={styles.save}>
                    <Text onPress={handleCancel} style={{fontWeight: 'bold', color: '#555'}}>Cancelar</Text>
                    <Text onPress={handleSave} style={{fontWeight: 'bold', color: COLORS.primary}}>Salvar</Text>
                </View>
                <TouchableOpacity style={styles.home} onPress={()=>handleNavigate('main')} activeOpacity={.9}>
                    <Icon name="home" color={COLORS.primary} size={15}/>
                </TouchableOpacity>
                <View style={styles.imageDisplay}>
                    <Image source={person} style={styles.itemImage}/>
                    <Icon name="pencil" size={15} color={COLORS.primary} style={styles.pencil} />
                </View>
                <View style={styles.profileInfo}>
                    <InputEdit onChange={setName} label="Nome" value={name} main={true}/>
                    <InputEdit onChange={()=>{}} label="Email" value={email} lockEdit={true}/>
                    <InputEdit onChange={setPhone} label="Telefone" value={phone} />
                </View>
                <View style={styles.editArea}>
                    <View  style={styles.editItem}>
                        <Icon name="history" size={iconSize} color={COLORS.primary}/>
                        <Text style={styles.editItemText}>Histórico de pagamentos</Text>
                    </View>
                    <View  style={styles.editItem}>
                        <Icon name="money" size={iconSize} color={COLORS.primary}/>
                        <Text style={styles.editItemText}>Editar Orçamento</Text>
                    </View>
                    <View style={styles.editItem}>
                        <Icon name="newspaper-o" size={iconSize} color={COLORS.primary}/>
                        <Text style={styles.editItemText}>Alterar plano</Text>
                    </View>
                    <View style={styles.editItem}>
                        <Icon name="pencil" size={iconSize} color={COLORS.primary}/>
                        <Text style={styles.editItemText}>Trocar senha</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user
})

const mapDispatchProps = (dispatch: Dispatch)=>({
    setUserAction: (payload: any)=>dispatch(setUser(payload))
})

export default connect(mapStateToProps, mapDispatchProps)(Profile)