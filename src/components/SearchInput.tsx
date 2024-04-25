import { TextInput, View } from "react-native"
import {styles} from '../styles/component.SearchInput'
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../styles/global";
import { connect } from "react-redux";
import { toggleVision } from "../reducers/visionReducer";
import { Dispatch } from "redux";
import { RootState } from "../store";

type Props = {
    toggleVision: ()=>void
}

const SearchInput = ({toggleVision}: Props)=>{
    return (
        <View style={styles.searchInput}>
            <View style={styles.inputArea}>
                <Icon style={styles.icon} name="exchange" size={18} color={COLORS.primary} onPress={toggleVision} />
                <TextInput style={styles.input}>

                </TextInput>
                <Icon style={styles.icon} name="search" size={15} color={COLORS.primary} />
            </View>
        </View>
    )
}

const mapStateToProps = (state: RootState)=>({
    vision: state.visionReducer.vision
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleVision: ()=> dispatch(toggleVision())
  });

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)