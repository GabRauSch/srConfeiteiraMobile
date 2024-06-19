import React from 'react';
import { Image, SafeAreaView, Text, View } from "react-native";
import { styles } from '../styles/component.Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../styles/global';
import useSecret from '../hooks/useSecret';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


export const Header = () => {
    const {isSecret, toggleSecret} = useSecret()

    const profile = require('../assets/images/user.png');    

    const navigate = useNavigation() as any
    const handleNavigate = (url: string)=>{
        navigate.navigate(url)
    }

    return (
        <SafeAreaView style={styles.safeArea}> 
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    {/* <Image source={logo} style={{ width: 50, height: 50 }} /> */}
                </View>
                <Text style={styles.headerTitle}>SR Confeiteira</Text>
                <View style={styles.profile}>
                    {isSecret ? (
                        <Icon name="eye-slash" size={20} color={COLORS.primary} onPress={toggleSecret}/>
                    ) : (
                        <Icon name="eye" size={20} color={COLORS.primary} onPress={toggleSecret}/>
                    )}
                    <TouchableOpacity activeOpacity={1} onPress={()=>handleNavigate('profile')}>
                        <Image source={profile} style={styles.profileImage} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
