import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {styles} from '../../styles/screen.auth.Register'

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type RootStackParamList = {
    Login: undefined;
    Register: undefined; 
  };
  

interface Props {
  navigation: LoginNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
//   const logoImage = require('../../assets/images/titserLogo.png');

  const redirectToRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = ()=>{
    
  }

  return (
    <View style={styles.container}>
      {/* <Image source={logoImage} style={styles.logo} /> */}
      <Text style={styles.welcome}>Faça o login!</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor={'#a78384'}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor={'#a78384'}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {/* {errorMessage !== '' && <ErrorMessage text={errorMessage}></ErrorMessage>} */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleLogin}>Acessar</Text>
      </TouchableOpacity>
      <Text style={styles.loginText} onPress={redirectToRegister}>Criar novo usuário</Text>
    </View>
  );
};

export default Login;