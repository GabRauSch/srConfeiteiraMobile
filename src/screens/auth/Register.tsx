import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {styles} from '../../styles/screen.auth.Register'
import useMessage from '../../hooks/useMessage';
import { register } from '../../services/Auth';
import { handleResponse } from '../../services/responseMapping';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../styles/global';
import Icon from 'react-native-vector-icons/FontAwesome';


const Register = ()=> {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {MessageDisplay, setMessageWithTimer} = useMessage();
  const navigation = useNavigation() as any
  const route = useRoute() as any;
  const [passwordSecure, setPasswordSecure] = useState(true)
  const [confirmSecure, setConfirmSecure] = useState(true)
  const [refferalCode, setRefferalCode] = useState('');
  const [showRefferalCode, setShowRefferalCode] = useState(false)

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
      <Image source={require('../../assets/images/logo.png')} style={{width: 100, height: 100}} />
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
        placeholder="Nome"
        placeholderTextColor={'#a78384'}
        value={name}
        onChangeText={(text) => setUsername(text)}
        />
      <View   style={styles.input}>
        <TextInput
          placeholder="Senha"
          placeholderTextColor={'#a78384'}
          secureTextEntry={passwordSecure}
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}
          />
        <TouchableOpacity onPress={()=>setPasswordSecure(!passwordSecure)} activeOpacity={1}>
          <Icon name={passwordSecure ? "eye-slash" : "eye"} size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Confirme a senha"
          placeholderTextColor={'#a78384'}
          secureTextEntry={confirmSecure}
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          />
        <TouchableOpacity onPress={()=>setConfirmSecure(!confirmSecure)} activeOpacity={1}>
          <Icon name={confirmSecure ? "eye-slash" : "eye"} size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      {showRefferalCode ?
      <>
        <View style={styles.input}>
          <TextInput
            placeholder="Código de confeiteira"
            placeholderTextColor={'#a78384'}
            autoCapitalize="none"
            value={refferalCode}
            onChangeText={(text) => setRefferalCode(text)}
          />
        </View>
      </>: <Text style={styles.loginText} onPress={()=>setShowRefferalCode(true)}>Possui um código?</Text>
      }
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Text style={styles.loginText} onPress={redirectToLogin}>Já possui um login?</Text>
    </View>
    </>
  );
};
export default Register
