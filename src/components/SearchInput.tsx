import { TextInput, View } from "react-native"
import {styles} from '../styles/component.SearchInput'
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../styles/global";

const SearchInput = ()=>{
    return (
        <View style={styles.searchInput}>
            <View style={styles.inputArea}>
                <Icon style={styles.icon} name="exchange" size={18} color={COLORS.primary} />
                <TextInput style={styles.input}>

                </TextInput>
                <Icon style={styles.icon} name="search" size={15} color={COLORS.primary} />
            </View>
        </View>
    )
}

export default SearchInput