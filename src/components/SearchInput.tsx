import { TextInput, View } from "react-native"
import {styles} from '../styles/component.SearchInput'
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../styles/global";
import { connect } from "react-redux";
import { toggleVision } from "../reducers/visionReducer";
import { Dispatch } from "redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";

type Props = {
    onChange: (value: string)=>void,
    onSearch: ()=>void,
    initialValue?: string,
    onToggleVision?: ()=>void
}

const SearchInput = ({onChange, onSearch, initialValue, onToggleVision}: Props)=>{
    const [searchInput, setSearchInput] = useState('');
    useEffect(()=>{
        if(initialValue) setSearchInput(initialValue)
    }, [])
    
    return (
        <View style={styles.searchInput}>
            <View style={styles.inputArea}>
                {onToggleVision &&
                    <Icon style={styles.icon} name="exchange" size={18} color={COLORS.primary} onPress={onToggleVision} />
                }
                <TextInput style={styles.input} onChangeText={(value)=>{setSearchInput(value); onChange(value)}} value={searchInput}/>
                <Icon style={styles.icon} name="search" size={15} 
                    color={COLORS.primary} onPress={onSearch}/>
            </View>
        </View>
    )
}

export default SearchInput