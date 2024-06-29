import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, View } from "react-native";
import { styles } from '../styles/component.Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../styles/global';
import useSecret from '../hooks/useSecret';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleVision } from '../reducers/visionReducer';
import { RootState } from '../store';

type Props = {
    vision: boolean,
    toogleVision: ()=>void
}
const Header = ({vision, toogleVision}: Props) => {
    const [isSecret, toggleSecret] = useState(false)
    const profile = require('../assets/images/user.png');    

    useEffect(()=>{
        toggleSecret(vision)
    }, [vision])

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
                        <Icon style={{padding: 20, paddingRight: 5}} name="eye-slash" size={20} color={COLORS.primary} onPress={()=>{toogleVision(); toggleSecret(!isSecret)}}/>
                    ) : (
                        <Icon style={{padding: 20, paddingRight: 5}} name="eye" size={20} color={COLORS.primary} onPress={()=>{toogleVision(); toggleSecret(!isSecret)}}/>
                    )}
                    <TouchableOpacity style={{padding: 20, paddingLeft: 5}} activeOpacity={1} onPress={()=>handleNavigate('profile')}>
                        <Image source={profile} style={styles.profileImage} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = (state: RootState)=>({
    vision: state.visionReducer.vision
})
const mapDispatchToProps = (dispatch: Dispatch)=>({
    toogleVision: ()=>dispatch(toggleVision())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)