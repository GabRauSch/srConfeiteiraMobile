import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {styles} from '../../styles/screen.auth.Register'
import useMessage from '../../hooks/useMessage';
import { confirmRegister, register } from '../../services/Auth';
import { handleResponse } from '../../services/responseMapping';
import { useRoute } from '@react-navigation/native';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type RootStackParamList = {
    Login: undefined;
    Register: undefined; 
  };
  

interface Props {
  navigation: LoginNavigationProp;
}


const ConfirmationCode : React.FC<Props> = ({ navigation })=> {
    const [confirmationCode, setConfirmationCode] = useState('');
    const {MessageDisplay, setMessageWithTimer} = useMessage();

    const route = useRoute();
    const {email} = route.params as any
  

const verifyCode = async () => {
  const confirm = await confirmRegister({email, confirmationCode});
  if(confirm.status !== 200) return setMessageWithTimer('Código inválido', 'error')
    navigation.navigate('Login', email)
};

const redirectToRegister = () => {
  navigation.navigate('Register');
};
  return (
    <>
    <SafeAreaView style={{position: 'relative', top: 50}}>
        <MessageDisplay />
      </SafeAreaView>
        <View style={styles.container}>
        <Text style={styles.welcome}>Cole o código recebido por email</Text>
        <TextInput
            style={styles.input}
            placeholder="Confirmation code"
            placeholderTextColor={'#ccc'}
            value={confirmationCode}
            onChangeText={(text) => setConfirmationCode(text)}
        />
        <TouchableOpacity style={styles.button} onPress={verifyCode}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.loginText} onPress={redirectToRegister}>Didn't receive a code?</Text>
        </View>

    </>
  );
};
export default ConfirmationCode
