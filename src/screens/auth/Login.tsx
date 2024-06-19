import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {styles} from '../../styles/screen.auth.Register'
import { login } from '../../services/Auth';
import useMessage from '../../hooks/useMessage';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { retrieveUserData } from '../../services/User';
import { decodeToken } from '../../util/token';
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { User } from '../../types/User';
import { setUser } from '../../reducers/userReducer';

// test env
import * as Device from 'expo-device';

type Props = {
  setUserAction: (payload: any)=>void
}

const Login = ({setUserAction}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {MessageDisplay, setMessageWithTimer} = useMessage();
  const route = useRoute() as any;
  const navigation = useNavigation() as any

  
  useEffect(()=>{
    const emailRoute = route.params?.email
    console.log(emailRoute)
    if(emailRoute) setEmail(emailRoute);
    handleLogin()
  }, [route.params])

  const redirectToRegister = () => {
    navigation.navigate('Register', {email});
  };

const handleLogin = async () => {
    if (!email) return setMessageWithTimer('Digite um email para continuar', 'error');
    if (!password) return setMessageWithTimer('Digite uma senha para continuar', 'error');
  
    try {
        const response = await login({ email, password });
        const data = response;

        if (data.status === 200) {
          await SecureStore.setItem('authToken', data.data.token);
          const {id: userId} = decodeToken(data.data.token);
          const userInfo = await retrieveUserData(userId);
          setUserAction(userInfo.data)
          
          if(!userInfo.data){
            return setMessageWithTimer('Falha no login','error')
          } 
          setUserAction(userInfo.data);
        } else {
          if (data.status === 400) {
            setMessageWithTimer('Email ou senha inválidos', 'error');
          } else {
            setMessageWithTimer('Falha ao logar', 'error');
          }
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setMessageWithTimer('Erro inesperado ao tentar logar', 'error');
      }
  };

  return (
    <>
      <SafeAreaView style={{position: 'relative', top: 50}}>
        <MessageDisplay />
      </SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.welcome}>Faça o login!</Text>
        <TextInput
          
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor={'#a78384'}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          autoCapitalize="none"
          />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
          placeholderTextColor={'#a78384'} autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}
          />

        <TouchableOpacity style={styles.button}  onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
        <Text style={styles.loginText} onPress={redirectToRegister}>Criar novo usuário</Text>
      </View>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUserAction: (payload: User)=> dispatch(setUser(payload))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);