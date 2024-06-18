import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {styles} from '../../styles/screen.auth.Register'
import useMessage from '../../hooks/useMessage';
import { register } from '../../services/Auth';
import { handleResponse } from '../../services/responseMapping';
import { useNavigation, useRoute } from '@react-navigation/native';

const Register = ()=> {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {MessageDisplay, setMessageWithTimer} = useMessage();
  const navigation = useNavigation() as any
  const route = useRoute() as any;

  useEffect(()=>{
    const emailRoute = route.params?.email
    console.log(emailRoute)
    if(emailRoute) setEmail(emailRoute);
  }, [route.params])

const handleRegister = async () => {
  if (!email) return setMessageWithTimer('Digite um email para continuar', 'error');
  if(!name) return setMessageWithTimer('Digite um nome para continuar', 'error')
  if (!password) return setMessageWithTimer('Digite uma senha para continuar', 'error');
  if (!confirmPassword) return setMessageWithTimer('Confirme a senha para continuar', 'error');
  if(password !== confirmPassword) return setMessageWithTimer('Senha e confirmação devem ser iguais', 'error');

  try {
    const {data, status} = await register({name, email, password, planId: 1 });
    if(status !== 200){
      console.log(status)
      return setMessageWithTimer(data.returnMessage, 'error')
    }

    navigation.navigate('ConfirmationCode', {email})
  } catch (error) {
    console.error('Unexpected error:', error);
    setMessageWithTimer('Erro inesperado ao tentar logar', 'error');
  }
};

const redirectToLogin = () => {
  navigation.navigate('Login', {email});
};
  return (
    <>
    <SafeAreaView style={{position: 'relative', top: 50}}>
        <MessageDisplay />
      </SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.welcome}>Realize o cadastro!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#a78384'}
        value={email}
        onChangeText={(text) => setEmail(text)}
         autoCapitalize="none"
        />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'#a78384'}
        value={name}
        onChangeText={(text) => setUsername(text)}
        />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#a78384'}
        secureTextEntry={true}
        autoCapitalize="none"
        value={password}
        onChangeText={(text) => setPassword(text)}
        />
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        placeholderTextColor={'#a78384'}
        secureTextEntry={true}
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        />
      {/* {errorMessage !== '' && <ErrorMessage text={errorMessage}></ErrorMessage>} */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Text style={styles.loginText} onPress={redirectToLogin}>Já possui um login?</Text>
    </View>
    </>
  );
};
export default Register
