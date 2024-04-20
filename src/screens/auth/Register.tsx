import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {styles} from '../../styles/screen.auth.Register'

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type RootStackParamList = {
    Login: undefined;
    Register: undefined; 
  };
  

interface Props {
  navigation: LoginNavigationProp;
}


const Register : React.FC<Props> = ({ navigation })=> {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
//   const logoImage = require('../../assets/images/titserLogo.png');
const redirectToLogin = () => {
  navigation.navigate('Login');
};
  return (
    <View style={styles.container}>
      {/* <Image source={logoImage} style={styles.logo} /> */}
      <Text style={styles.welcome}>Realize o cadastro!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#a78384'}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'#a78384'}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#a78384'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        placeholderTextColor={'#a78384'}
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {/* {errorMessage !== '' && <ErrorMessage text={errorMessage}></ErrorMessage>} */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Text style={styles.loginText} onPress={redirectToLogin}>Já possui um login?</Text>
    </View>
  );
};
export default Register
