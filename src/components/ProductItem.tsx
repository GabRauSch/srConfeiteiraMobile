import { Text, View, TouchableOpacity, TouchableHighlight, Modal, Pressable } from "react-native";
import { styles } from '../styles/component.ProductsList';
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../styles/global";
import ExcludeModal from "../modals/ExcludeModal";

type Props = {
    id: number;
    name: string;
    value: number;
    image: string;
    description: string;
    onPress: () => void;
};

const ProductItem = ({id, name, value, description, image, onPress }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [excludeModal, setExcludeModal] = useState(false)

    const handleModalOpen = (event: any) => {
        const { pageX, pageY } = event.nativeEvent;
        setModalPosition({ x: pageX - 105, y: pageY - 150});
        setModalVisible(true);
    };


    return (
        <TouchableOpacity style={styles.productItem} onPress={onPress}>
            <Icon name="birthday-cake" size={30} color={COLORS.primary} />
            <View style={styles.productDisplay}>
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.productDescription}>{description}</Text>
            </View>
            <Text style={styles.value}>
                R${value.toFixed(2).replace('.', ',')} 
            </Text>
            <TouchableOpacity style={{zIndex: 99999, padding: 10, width: 45, alignItems: 'flex-end'}} 
                onPress={(e) => handleModalOpen(e)}>
                <Icon name="ellipsis-v" size={15} color="black" />
            </TouchableOpacity>
            {modalVisible && (
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableHighlight style={styles.modal} onPress={() => setModalVisible(false)} underlayColor={'transparent'}>
                        <View style={[styles.productModal, { position: 'absolute', top: modalPosition.y, left: modalPosition.x }]}>
                            <TouchableHighlight style={styles.productModalText} onPress={()=>{onPress(); setModalVisible(false)}} underlayColor={COLORS.secondary}>
                                <Text>Editar</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.productModalText} onPress={()=>{setModalVisible(false)}} underlayColor={COLORS.secondary}>
                                <Text>Ver Pedidos</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.productModalText} onPress={()=>{setExcludeModal(true); setModalVisible(false)}} underlayColor={'#f88'}>
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
                    description={description}
                    image={image}
                    onClose={()=>{setExcludeModal(false)}}
                />
            }
        </TouchableOpacity>
    );
};

export default ProductItem;
