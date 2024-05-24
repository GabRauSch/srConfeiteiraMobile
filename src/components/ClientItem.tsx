import { Text, View, TouchableOpacity, TouchableHighlight, Modal, Pressable } from "react-native";
import { styles } from '../styles/component.ClientItem';
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../styles/global";
import { remainingTimeFrom } from "../util/transform";
import ExcludeModal from "../modals/ExcludeModal";
import { deleteClient } from "../services/Clients";
import { Dispatch } from "redux";
import { removeClient } from "../reducers/clientsReducer";
import { connect } from "react-redux";

type Props = {
    id: number, 
    name: string, 
    phone: string, 
    orderCount: number, 
    totalOrderValue: number, 
    nextDeliveryDate: string,
    onPress: ()=>void,
    removeClientAction: (payload: any)=>void
};

const ClientItem = ({id, name, phone, orderCount, totalOrderValue, nextDeliveryDate, onPress, removeClientAction }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [excludeModal, setExcludeModal] = useState(false);

    const handleModalOpen = (event: any) => {
        const { pageX, pageY } = event.nativeEvent;
        setModalPosition({ x: pageX - 105, y: pageY - 150});
        setModalVisible(true);
    };

    const handleNavigate = ()=>{

    }

    const excludeItem = async ()=>{
        const deletion = await deleteClient(id);
        if(deletion.status !== 200) return 

        console.log(deletion.data);
        removeClientAction(id)
    }


    return (
        <TouchableOpacity style={{...styles.client, 
            backgroundColor:  nextDeliveryDate === 'Pedido em atraso' ? '#b00' : 'white'
        }} activeOpacity={0.8} onPress={onPress}>
            <View style={styles.clientInfo}>
                <View>
                    <Text style={{...styles.name,
                        color: nextDeliveryDate === 'Pedido em atraso' ? 'white' : COLORS.primary

                    }}>{name}</Text>
                    <View style={styles.clientList}>
                        <View style={styles.clientItem}>
                            <Text style={styles.info}>Contato: </Text>
                            <Text style={styles.listItemText}>{phone}</Text>
                        </View>
                        <View style={styles.clientItem}>
                            <Text style={styles.info}>Pedidos pendentes: </Text>
                            <Text style={styles.listItemText}>{orderCount}</Text>
                        </View>
                        <View style={styles.clientItem}>
                            <Text style={styles.info}>Total:</Text>
                            <Text style={styles.listItemText}>R${totalOrderValue.toFixed(2).replace('.', ',')}</Text>
                        </View>
                    </View>
                </View>
                    {modalVisible && (
                        <Modal
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <TouchableHighlight style={styles.modal} onPress={() => setModalVisible(false)} underlayColor={'transparent'}>
                                <View style={[styles.clientModal, { position: 'absolute', top: modalPosition.y, left: modalPosition.x }]}>
                                    <TouchableHighlight style={styles.clientModalText} onPress={()=>{onPress(); setModalVisible(false)}} underlayColor={COLORS.secondary}>
                                        <Text>Editar</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.clientModalText} onPress={()=>{setModalVisible(false)}} underlayColor={COLORS.secondary}>
                                        <Text>Ver Pedidos</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.clientModalText} onPress={()=>{setExcludeModal(true); setModalVisible(false)}} underlayColor={'#f88'}>
                                        <Text>Excluir</Text>
                                    </TouchableHighlight>
                                </View>
                            </TouchableHighlight>
                        </Modal>
                    )}
                    {excludeModal &&
                        <ExcludeModal 
                            id={id}
                            name={name}
                            objectType="cliente"
                            onClose={()=>{setExcludeModal(false)}}
                            confirmExclude={excludeItem}
                        />
                    }
                <TouchableOpacity style={styles.dots} onPress={handleModalOpen}>
                        <Icon name="ellipsis-v" size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <Text style={{...styles.time, color: nextDeliveryDate === 'Pedido em atraso' ? 'white' : COLORS.primary}}
            > {nextDeliveryDate} </Text>
        </TouchableOpacity>
    );
};

const mapStateToProps = ()=>({

})
const mapDispatchToProps = (dispatch: Dispatch)=>({
    removeClientAction: (payload: any)=>dispatch(removeClient(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientItem);
