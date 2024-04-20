import React from 'react';
import { Image, SafeAreaView, Text, View } from "react-native";
import { styles } from '../styles/component.Header';

export const Header = () => {
    const logo = require('../assets/images/logoMOCK.png');
    const profile = require('../assets/images/user.png')
    return (
        <SafeAreaView style={styles.safeArea}> 
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={{ width: 50, height: 50 }} />
                </View>
                <Text style={styles.headerTitle}>S.R. Confeitaria</Text>
                <View style={styles.profile}>
                    <Image source={profile} style={styles.profileImage}/>
                </View>
            </View>
        </SafeAreaView>
    );
};
