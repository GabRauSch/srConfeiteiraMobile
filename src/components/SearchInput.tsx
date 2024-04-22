import { TextInput, View } from "react-native"
import {styles} from '../styles/component.SearchInput'
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../styles/global";

const SearchInput = ()=>{
    return (
        <View style={styles.inputArea}>
            <TextInput style={styles.input}>

            </TextInput>
            <Icon name="search" size={15} color={COLORS.primary} />
        </View>
    )
}

export default SearchInput