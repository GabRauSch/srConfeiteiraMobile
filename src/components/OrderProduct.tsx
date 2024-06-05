import { Text, View, TouchableOpacity, TouchableHighlight, Modal, Pressable } from "react-native";
import { styles } from '../styles/component.OrderProduct'
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../styles/global";
import ExcludeModal from "../modals/ExcludeModal";
import { deleteProduct } from "../services/Products";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { removeProduct } from "../reducers/productsReducer";
import RoundCheckBox from "./RoundCheckBox";
import EditModal from "../modals/EditModal";
import { ProductOptions } from "../modals/ProductOptions";
import NumberSetter from "./NumberSetter";

type Props = {
    id: number;
    name: string;
    value: number;
    quantity: number;
    finished: boolean;
    orderItemId: number;
    handleCheck: (orderItemId: number)=>void;
    handleQuantity: (id: number, quantity: number)=>void
    removeOrderItem: (id: number)=>void
};

const OrderProduct = ({id, name, value, quantity, finished, orderItemId, handleCheck, handleQuantity, removeOrderItem}: Props) => {
    const [excludeModal, setExcludeModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editModalPosition, setEditModalPosition] = useState({x: 0, y:0});
    const [editProductModal, setEditProductModal] = useState(false);
    const editOptions = [{option: 'Editar',func: ()=>setEditProductModal(true)}, {option: 'Excluir', func: ()=>{setExcludeModal(true)}}]
    const [productQuantity, setProductQuantity] = useState(quantity);

    const handleEditModal = (event: any) => {
        const { pageX, pageY } = event.nativeEvent;
        setEditModalPosition({ x: pageX - 80, y: pageY - 100});
        setEditModal(true)
    };

    return (
        <>
            <View style={styles.order}>
                <Text>{quantity} un.</Text>
                <Text style={styles.orderTitle}>{name}</Text>
                <Text>R${(value * quantity).toFixed(2).replace('.', ',')}</Text>
                <RoundCheckBox active={finished} onCheck={() => handleCheck(orderItemId)} />
                <TouchableOpacity onPress={handleEditModal} style={{padding: 15, alignItems: 'flex-end'}}>
                    <Icon name="ellipsis-v" size={20} color={'#555'}/>
                </TouchableOpacity>
            </View>
            {editModal && (
                <ProductOptions modalPos={editModalPosition} 
                    options={editOptions} onClose={()=>setEditModal(false)}/>
            )}
            {editProductModal && (
                <EditModal
                    id={id}
                    name={name}
                    objectType={'produto'}
                    action={()=>{}}
                    onClose={()=>setEditProductModal(false)}
                >
                    <NumberSetter quantity={quantity} 
                        handleQuantity={(quantity: number)=>{handleQuantity(id, quantity)}} />
                </EditModal>
            )}
            {excludeModal &&
                <ExcludeModal 
                    id={id}
                    name={name}
                    objectType="produto"
                    confirmExclude={()=>{removeOrderItem(id)}}
                    onClose={()=>{setExcludeModal(false)}}
                />
            }
        </>
    );
};

const mapStateToProps = ()=>({
    
})

const mapDispatchToProps = (dispatch: Dispatch)=>({
    removeProductAction: (payload: any)=>dispatch(removeProduct(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderProduct);
