import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import { Dispatch } from "redux";
import { styles } from '../styles/screen.Profile';
import InputEdit from "../components/InputEdit";
import { COLORS } from "../styles/global";
import { User } from "../types/User";
import { RootState } from "../store";
import { validateEditProfile } from "../validation/Profile";
import useMessage from "../hooks/useMessage";
import { updateUser } from "../services/User";
import { loggedOut, setUser } from "../reducers/userReducer";
import Subscription from "../components/Subscription";

type Props = {
    user: User,
    setUserAction: (payload: any) => void
}

const Profile = ({ user, setUserAction }: Props) => {
    const person = require('../assets/images/person.png');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const { setMessageWithTimer, MessageDisplay } = useMessage();
    const iconSize = 12;

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
    }, [user]);

    const navigation = useNavigation() as any;

    const handleNavigate = (url: string) => {
        navigation.navigate(url);
    };

    const handleCancel = () => {
        navigation.goBack()
    };

    const handleSave = async () => {
        const validation = validateEditProfile(name, phone);
        if (validation) return setMessageWithTimer(validation, 'error');

        const updated = await updateUser(user.id, { name, phone });
        if (updated.status !== 200) return setMessageWithTimer('Erro ao editar', 'error');

        const updatedUser = { ...user, phone, name };
        setUserAction(updatedUser);
        setMessageWithTimer('Editado com sucesso', 'success');
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync('authToken');
        setUserAction(loggedOut);
    };

    return (
        <>
            <MessageDisplay />
            <ScrollView>
            <View style={styles.page}>
                <View style={styles.save}>
                    <Text onPress={handleCancel} style={{ fontWeight: 'bold', color: '#555' }}>Cancelar</Text>
                    <Text onPress={handleSave} style={{ fontWeight: 'bold', color: COLORS.primary }}>Salvar</Text>
                </View>
                <TouchableOpacity style={styles.home} onPress={() => handleNavigate('Home')} activeOpacity={.9}>
                    <Icon name="home" color={COLORS.primary} size={15} />
                </TouchableOpacity>
                <View style={styles.imageDisplay}>
                    <Image source={person} style={styles.itemImage} />
                    {/* <Icon name="pencil" size={15} color={COLORS.primary} style={styles.pencil} /> */}
                </View>
                <View style={styles.profileInfo}>
                    <InputEdit onChange={setName} label="Nome" value={name} main={true} />
                    <InputEdit onChange={() => { }} label="Email" value={email} lockEdit={true} />
                    <InputEdit onChange={setPhone} label="Telefone" value={phone} />
                </View>
                <Subscription/>
                <View style={styles.editArea}>
                    <View style={styles.editItem}>
                        <Icon name="history" size={iconSize} color={COLORS.primary} />
                        <Text style={styles.editItemText}>Histórico de pagamentos</Text>
                    </View>
                    <View style={styles.editItem}>
                        <Icon name="money" size={iconSize} color={COLORS.primary} />
                        <Text style={styles.editItemText}>Editar Orçamento</Text>
                    </View>
                    <View style={styles.editItem}>
                        <Icon name="newspaper-o" size={iconSize} color={COLORS.primary} />
                        <Text style={styles.editItemText}>Alterar plano</Text>
                    </View>
                    <View style={styles.editItem}>
                        <Icon name="pencil" size={iconSize} color={COLORS.primary} />
                        <Text style={styles.editItemText}>Trocar senha</Text>
                    </View>
                    <View style={styles.editItem}>
                        <Icon name="tag" size={iconSize} color={COLORS.primary} />
                        <Text style={styles.editItemText}>Indique uma confeiteira</Text>
                    </View>
                    <TouchableOpacity style={styles.editItem} onPress={logout}>
                        <Icon name="sign-out" size={iconSize} color={'red'} />
                        <Text style={[styles.editItemText, { color: 'red' }]}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUserAction: (payload: any) => dispatch(setUser(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
