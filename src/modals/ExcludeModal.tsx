import { Modal, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { styles } from '../styles/modal.ExcludeModal';
import { TouchableWithoutFeedback } from "react-native";
import { COLORS } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import { deleteProduct } from "../services/Products";
import { removeProduct, setProducts } from "../reducers/productsReducer";
import { RootState } from "../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";

type Props = {
    id: number,
    name: string,
    objectType: string,
    warning?: string, 
    onClose: ()=>void,
    confirmExclude: ()=>void
};

const ExcludeModal = ({ id, name, objectType, warning, onClose, confirmExclude}: Props) => {
    const navigate = useNavigation() as any;

    

    return (
        <Modal
            animationType="fade"
            transparent={true}

        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Confirmar exclusão do {objectType}:</Text>
                        <Text style={styles.modalItemName}>{name}</Text>
                        <View style={styles.buttons}>
                            <TouchableHighlight 
                                style={styles.cancelButotn} 
                                onPress={onClose}
                                underlayColor={COLORS.secondary}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableHighlight>
                            <TouchableHighlight 
                                style={styles.confirmButton} 
                                onPress={()=>{confirmExclude(); onClose()}}
                                underlayColor={COLORS.secondary}
                            >
                                <Text style={styles.confirmButtonText}>Confirmar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user
})

export default connect(mapStateToProps)(ExcludeModal)