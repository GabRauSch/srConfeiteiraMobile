import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, ScrollView, Text, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/screen.OrderItem";
import { HorizontalLine } from "../components/HorizontalLine";
import Icon from "react-native-vector-icons/FontAwesome";
import RoundCheckBox from "../components/RoundCheckBox";
import { ProgressBar } from "react-native-paper";
import { COLORS, LABEL, SHADOW } from "../styles/global";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OrderItems } from "../types/OrderItem";
import { addProductToOrder, finishOrder, getByOrderId, updateOrCreateOrderItems } from "../services/OrderItems";
import { User } from "../types/User";
import { RootState } from "../store";
import { connect } from "react-redux";
import { TextInput } from "react-native";
import { Product, SelectedProducts } from "../types/Product";
import { sortProducts } from "../util/sorter";
import { getAllProductsByUserId } from "../services/Products";
import ProductListItem from "../components/ProductListItem";
import { ProductOptions } from "../modals/ProductOptions";
import EditProductModal from "../modals/EditModal";
import NumberSetter from "../components/NumberSetter";
import EditModal from "../modals/EditModal";
import OrderProduct from "../components/OrderProduct";
import useMessage from "../hooks/useMessage";
import { mapOrderStatus, mapStatusToText, OrderStatus, Status } from "../util/mappers";
import { formatDate } from "date-fns";
import { setOrderInfo } from "../reducers/ordersReducer";
import { Order } from "../types/Order";
import { Dispatch } from "redux";
import { useProducts } from "../hooks/useProducts";
import { createAndSharePdf } from "../util/budgetGenerator";
import { HeaderCreation } from "../components/HeaderCreation";
import InputNumber from "../components/InputNumber";
import InputEdit from "../components/InputEdit";
import CreateButton from "../components/CreateButton";
import { handleSetNumericValue } from "../util/numeric";
import { getComplementsByOrderId, updateComplements } from "../services/OrderComplements";
import { Complement } from "../types/OrderComplements";
import { calculateOrderValue } from "../util/calculate";
import ExcludeModal from "../modals/ExcludeModal";

type Props = {
    user: User,
    setOrderAction: (data: Partial<Order>)=>void
}
export type OrderData = {
    id: number,
    orderId: number,
    orderStatus: OrderStatus,
    clientName: string,
    deliveryDate: Date,
    orderNumber: number,
    note: string
}

const OrderItem = ({user, setOrderAction}: Props) => {
    const [status, setStatus] = useState<any>([]);
    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
    const [orderData, setOrderData] = useState<OrderData>();
    const [totalValue, setTotalValue] = useState(0);
    const [valueBeforeComplements, setValueBeforeComplemenets] = useState(0)
    const [percentage, setPercentage] = useState(0);
    const route = useRoute();
    const { id } = route.params as any;
    const navigate = useNavigation() as any;
    const [productModal, setProductModal] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [productsList, setProductsList] = useState<any[]>([]);
    const [scrollViewHeight, setScrollViewHeight] = useState(0);
    const { MessageDisplay, setMessageWithTimer } = useMessage();
    const [complementModal, setComplementModal] = useState(false);
    const [newComplementValue, setNewComplementValue] = useState('0,00');
    const [newComplementDescription, setNewComplementDescription] = useState('')
    const [newComplementMultiplier, setNewComplementMultiplier] = useState<-1 | 1>(1)
    const [newComplementType, setNewComplementType] = useState<0 | 1>(1);
    const [complements, setComplements] = useState<Complement[]>([]);
    const [note, setNote] = useState('');
    const [confirmCloseModal, setConfirmCloseModal] = useState(false);

    const contentRef = useRef<View>(null);

    const fetchedProducts = useProducts(user.id)

    useEffect(() => {
        const handleGetData = async () => {
            try {
                console.log('handle get Data: -------------')
                const {data, status} = await getByOrderId(id);
                if(status !== 200) return setMessageWithTimer('erro ao buscar dados', 'error');
                
                const {data: complementsData, status: cStatus} = await getComplementsByOrderId(id);
                console.log(complementsData)
                if(cStatus !== 200) return setMessageWithTimer('erro ao buscar dados de desconto', 'error');

                setComplements(complementsData)
                setOrderData(data);
                setOrderItems(data.items);
                calculateTotal(data.items, complementsData);
                setNote(data.note)
    
                const statusArray = data.items.map((el: any) => el.finished);
                setStatus(statusArray);
                
                const concluded = statusArray.filter((status: any) => status).length
                const percentage = concluded / statusArray.length;
                setPercentage(percentage);
    
                const filteredProducts = fetchedProducts.filter((product: any) => {
                    const isInOrder = data.items.some((orderItem: any) => orderItem.productId === product.id);
        
                    const isSelected = selectedProducts.some(selectedProduct => selectedProduct.id === product.id);
        
                    return !isInOrder && !isSelected;
                });
    
                setProductsList(sortProducts(fetchedProducts));
                setFilteredProducts(sortProducts(filteredProducts))
            } catch (error) {
                console.log('erro')
            }

        }
        handleGetData()
    }, [fetchedProducts, setOrderAction]);
    
    const handleNavigate = (url: string, id: number)=>{
        navigate.navigate(url, {id})
    }

    const handleCheck = (itemId: number) => {
        if(!orderData) return setMessageWithTimer('erro ao buscar os dados', 'error')
        if(orderData.orderStatus == mapOrderStatus('delivered')) return setMessageWithTimer('pedido já foi entregue', 'error')
        const updatedOrderItems = orderItems.map(item =>{
           return item.orderItemId === itemId ? { ...item, finished: !item.finished } : item
        });
        
        const pendent = updatedOrderItems.filter((el)=>!el.finished).length;
         
        setOrderData({...orderData, orderStatus: pendent ? mapOrderStatus('open') : mapOrderStatus('finished')})

        setOrderItems(updatedOrderItems);
        
        const statusArray = updatedOrderItems.map(item => item.finished);
        setStatus(statusArray);
        
        const concluded = statusArray.filter(status => status).length;
        const percentage = concluded / statusArray.length;
        setPercentage(percentage);
    };

    const handleBudget = ()=>{
        createAndSharePdf(orderItems, complements, orderData as OrderData, user)
    }
    const handleDeliverOrder = (oldStatus: OrderStatus) => {
        if (oldStatus === mapOrderStatus('budget') && orderData) {
            return setOrderData({ ...orderData, orderStatus: mapOrderStatus('open')});
        } else if (percentage !== 1 && orderData?.orderStatus === mapOrderStatus('open')) {
            setMessageWithTimer('Conclua todos os itens do pedido', 'error');
        } else if (orderData) {
            const orderStatus =
                orderData.orderStatus === mapOrderStatus('finished')
                    ? mapOrderStatus('delivered')
                    : mapOrderStatus('finished');
            setOrderData({ ...orderData, orderStatus });
        }
    };
    const handleNewProduct = ()=>{
        search('');
        setProductModal(true)
    }    
    const search = (value: string)=>{
        const productsFiltered = productsList.filter(product => {
            const isInOrder = orderItems.some(orderItem => orderItem.productId === product.id);

            const isSelected = selectedProducts.some(selectedProduct => selectedProduct.id === product.id);

            return !isInOrder && !isSelected;
        });
        
        if(productsFiltered)
        setFilteredProducts(productsFiltered);
    }

    const handleSelectProduct = (newProduct: any) => {
        const selectedProduct = {
            id: newProduct.id,
            name: newProduct.name,
            quantity: 1,
            value: newProduct.value 
        }

        search('');
        setSearchValue('');
        setFilteredProducts((prevProducts: any) => prevProducts.filter((product: any) => product.id !== newProduct.id));
        setSelectedProducts([...selectedProducts, selectedProduct]);
    }

    const removeProduct = (id: number)=>{
        const product = selectedProducts.filter((el: any)=>el.id == id)
        const products = selectedProducts.filter((el: any)=>el.id !== id)
        setSelectedProducts(sortProducts(products))
        setFilteredProducts(sortProducts([...productsList, ...product]));
    }
    const handleSetQuantity = (id: number, quantity: number)=>{
        setSelectedProducts(prevProducts => prevProducts.map(product => {
            return product.id === id ? {...product, quantity} : product;
        }));
    }
    const handleSetOrderItemQuantity = (id: number, quantity: number)=>{
        const updatedOrderItems = orderItems.map(oi => {
            return oi.productId === id ? {...oi, quantity} : oi;
        })
        setOrderItems(updatedOrderItems);
        calculateTotal(updatedOrderItems)
    }

    const confirmProduct = async (id: number)=>{
        const createdProduct = selectedProducts.find(el=>el.id == id);
        if(!createdProduct) return

        const newOrderItem = {
            quantity: createdProduct.quantity, 
            productId: id
        }

        const orderItem = {
            quantity: newOrderItem.quantity,
            productId: id,
            productName: createdProduct.name,
            orderItemId: createdProduct.id,
            value: createdProduct.value,
            finished: false
        }
        

        setValueBeforeComplemenets(totalValue + (orderItem.value * orderItem.quantity))

        const filteredSelected = selectedProducts.filter((el)=>{
            return el.id !== orderItem.productId
        })
        const updatedOrderItems = [...orderItems, orderItem];
        setSelectedProducts(filteredSelected)
        setOrderItems(updatedOrderItems);
        
        calculateTotal(updatedOrderItems, complements)
    }

    const calculateTotal = (updatedOrderItems: OrderItems[], updatedComplements: any[]=[])=>{
        console.log('called', updatedComplements)
        if(updatedOrderItems.length == 0) {
            setStatus([]);
            setPercentage(0);
            setValueBeforeComplemenets(0)
            setTotalValue(0);
            return
        }

        const statusArray = updatedOrderItems.map(item => item.finished);
        setStatus(statusArray);
        
        const concluded = statusArray.filter(status => status).length;
        const percentage = concluded / statusArray.length;
        setPercentage(percentage);
        const productsValue = updatedOrderItems.map((el)=>el.value * el.quantity).reduce((a: any, b: any)=>a+b)
        setValueBeforeComplemenets(productsValue)

        const finalValue = calculateOrderValue(productsValue, updatedComplements)

        setTotalValue(finalValue);
    }

    const removeOrderItem = (id: number)=>{
        const updatedOrderItems = orderItems.filter((el)=>el.productId !== id);

        setOrderItems(updatedOrderItems);
        calculateTotal(updatedOrderItems)
    }

    const handleSave = async ()=>{
        if(!orderData) return setMessageWithTimer('erro ao buscar dados', 'error');
        const updatedOrderItems = orderItems.map((el)=>(
            {productId: el.productId, quantity: el.quantity, finished: Boolean(el.finished),  value: el.value}
        ))
        const updateData: any = {orderItems: updatedOrderItems, order: {
            orderStatus: orderData.orderStatus,
        }}
        if (note) updateData.order.note = note
    

        const update = await updateOrCreateOrderItems(orderData.orderId, updateData);
        console.log(update)
        if(update.status !== 200) {
            console.log(update)
            return setMessageWithTimer('Erro ao atualizar', 'error')
        }

        const complementsUpdate = await updateComplements(orderData.id, complements);
        console.log('--- updated ordercomplements response', complementsUpdate)
            
        const dispatchProducts = orderItems.map((el)=>({
            id: el.productId, quantity: el.quantity, name: el.productName, finished: el.finished, value: el.value
        }))

        setOrderAction({
            orderId: orderData.orderId,
            value: totalValue,
            status: orderData.orderStatus,
            products: dispatchProducts,
            orderComplements: complements
        })

        return setMessageWithTimer('Alterado com sucesso', 'success')
    }

    const handleNewComplement = (multiplier: 1 | -1)=>{
        setNewComplementMultiplier(multiplier)
        setComplementModal(true);
    }
    const handleCreateNewComplement = async ()=>{
        if(!newComplementDescription) {
            setComplementModal(true)
            return setMessageWithTimer('Adicione uma descrição à taxa', 'error')
        }
        const newComplement: Complement = {
            complementDescription: newComplementDescription,
            valueType: newComplementType,
            value: parseFloat(newComplementValue.replace(',', '.')),
            complementMultiplier: newComplementMultiplier
        }

        const sorted = [...complements, newComplement].sort((a, b) => {
            if (a.valueType !== b.valueType) {
                return a.valueType === 1 ? 1 : -1;
            } else {
                return a.complementMultiplier === 1 ? -1 : 1;
            }
        })


        setComplements(sorted)
        setComplementModal(false)
        calculateTotal(orderItems, sorted)
    }

    const handleCloseOrder = ()=>{
        if(orderData)
            setOrderData({ ...orderData, orderStatus: mapOrderStatus('closed') })
    }
    return (
        <>
            <MessageDisplay />
            <ScrollView style={styles.page}>
                <HeaderCreation url="orders" title={`Pedido nº ${orderData?.orderNumber}`}/>
                <Text style={styles.save} onPress={handleSave}>Salvar</Text>
                <View style={styles.orderInfo}>
                    <Text style={styles.orderNumber}>Nº {orderData?.orderNumber}</Text>
                    <Text style={{ ...styles.orderInfoStatus, color: COLORS.primary }}>Status: {mapStatusToText(orderData?.orderStatus as OrderStatus)}</Text>
                    <Text style={styles.orderInfoText}>Cliente: {orderData?.clientName}</Text>
                    <Text>Progresso: {Math.round(percentage * 100)}% ({status.filter((status: any) => status).length}/{status.length})</Text>
                    <Text>Valor produtos: R${valueBeforeComplements.toFixed(2).replace('.', ',')}</Text>
                    {orderData?.deliveryDate && (
                        <Text>Data de entrega: {formatDate(orderData.deliveryDate as Date, 'dd/MM/yyyy HH:mm')}</Text>
                    )}
                    <ProgressBar progress={percentage} color={COLORS.primary} style={{ borderRadius: 10, height: 7 }} />

                    <View style={styles.finishOrderArea}>
                        <TouchableHighlight style={styles.sendBudget}
                            underlayColor={COLORS.primaryPressed} onPress={() => { handleBudget() }}>
                            <Text style={[styles.newProductText, {color: '#000'}]}>Enviar orçamento</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.finishOrderArea}>
                        <TouchableHighlight style={[styles.finishOrder, {backgroundColor: '#f66'}]}
                            underlayColor={COLORS.primaryPressed} onPress={() => { setConfirmCloseModal(true) }}>
                            <Text style={[styles.newProductText, {color: '#000'}]}>Cancelar pedido</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={[styles.finishOrder, 
                                {backgroundColor: (percentage !== 1 && orderData?.orderStatus == mapOrderStatus('open'))?  COLORS.grayScaleSecondary : COLORS.primary ,
                                opacity: orderData?.orderStatus == mapOrderStatus('delivered') ?  0.6 : 1 

                                }]}
                            underlayColor={COLORS.primaryPressed} onPress={() => { handleDeliverOrder((orderData as OrderData).orderStatus) }}>
                            <Text style={styles.newProductText}>
                                {orderData?.orderStatus == mapOrderStatus('budget') ? 'Confirmar pedido' : 'Pedido entregue'}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <TouchableOpacity style={styles.paymentArea} onPress={()=>{handleNavigate('orderPayment', id)}}>
                        <Icon name={'money'} size={18} color={COLORS.primary}/>
                        <Text style={styles.payment}>Pagamentos</Text>
                    </TouchableOpacity>
                </View>
                <HorizontalLine />
                {confirmCloseModal && (
                    <ExcludeModal  
                        name={`pedido Nº ${orderData?.orderNumber}`} 
                        onClose={()=>setConfirmCloseModal(false)} id={1} 
                        confirmExclude={handleCloseOrder} 
                        objectType="pedido"
                        type="cancelamento" 
                    />
                )}

                {selectedProducts.length > 0 && (
                    <View style={styles.newProducts}>
                    <Text style={styles.separator}>Edite os produtos:</Text>
                        {selectedProducts.map((el: any, key: number) => (
                            <View key={key}>
                                <ProductListItem name={el.name} 
                                    key={key}
                                    price={el.value} 
                                    removeItem={()=>removeProduct(el.id)} 
                                    setProductQuantity={(quantity: number)=>handleSetQuantity(el.id, quantity)}
                                    confirm confirmItem={()=>{confirmProduct(el.id)}}
                                />
                            </View>
                        ))}
                    </View>
                )}
                {['Pendentes', 'Concluídos'].map((section, key) => {
                    const currentFilter = orderItems.filter((product: any) => product.finished == (key == 1))
                    return currentFilter.length > 0 ? (
                        <View key={key}>
                            <Text style={styles.separator}>{section} ↆ</Text>
                            <View style={styles.orders} >
                                {currentFilter.map((item: any, keyC: number) => (
                                    <OrderProduct
                                        key={keyC + '\''}
                                        id={item.productId}
                                        quantity={item.quantity}
                                        finished={item.finished}
                                        orderItemId={item.orderItemId}
                                        name={item.productName}
                                        handleCheck={handleCheck}
                                        handleQuantity={handleSetOrderItemQuantity}
                                        value={item.value}
                                        removeOrderItem={removeOrderItem}
                                    />
                                ))}
                            </View>
                        </View>
                    ) : null
                })}
                {complements.length > 0 && 
                    (
                        <>
                            <Text style={{marginTop: 10, ...LABEL}}>Descontos e Taxas</Text>
                            {complements.map((el, key)=>(
                                <View key={key} style={{flexDirection: 'row',justifyContent: 'space-between', paddingHorizontal: 10, ...SHADOW, backgroundColor: 'white', margin: 5, padding: 5, borderRadius: 5}}>
                                    <Text style={{flex: 1}}>{el.complementDescription}</Text>
                                    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
                                        <Text>{el.valueType ? 'R$' : ''}</Text>
                                        <Text>{el.complementMultiplier * el.value}</Text>
                                        <Text>{el.valueType ? '' : '%'}</Text>
                                    </View>
                                    <Icon name="remove" size={20} color={COLORS.primary}/>
                                </View>
                            ))}
                        </>

                    )
                }
                <InputEdit label="Nota:" onChange={setNote} value={note} italic />

                <View>
                    <Text style={{fontSize: 22, padding: 10, textAlign: 'right'}}>Total final: R${totalValue}</Text>
                </View>
                <TouchableHighlight style={styles.newProduct}
                        underlayColor={COLORS.primaryPressed} onPress={() => { handleNewProduct() }}>
                    <Text style={styles.newProductText}>Adicionar produto</Text>
                </TouchableHighlight>
                <View style={styles.addComplement}>
                    <TouchableHighlight style={styles.complement}
                            underlayColor={COLORS.primaryPressed} onPress={() => { handleNewComplement(-1) }}>
                        <Text style={styles.newProductText}>Adicionar desconto</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.complement}
                            underlayColor={COLORS.primaryPressed} onPress={() => { handleNewComplement(1) }}>
                        <Text style={styles.newProductText}>Adicionar taxa</Text>
                    </TouchableHighlight>
                </View>
                <View style={{marginTop: 20}}>
                    <CreateButton text="Salvar" action={handleSave} />
                </View>
                <View style={{marginBottom: 100}}></View>
                {(complementModal) && (
                    <Modal
                    transparent={true}
                    visible={complementModal}
                    onRequestClose={() => setComplementModal(false)}
                >
                    <TouchableOpacity style={styles.modal} onPress={() =>{setComplementModal(false)}} activeOpacity={1}>
                        <View style={{width: '80%', backgroundColor: 'white', padding: 20, gap: 10, borderRadius: 5, zIndex: 998}}>
                            <Text>Descrição do {newComplementMultiplier == -1 ? 'desconto' : 'taxa'}</Text>
                            <TextInput 
                                style={{borderWidth: 1, borderRadius: 5, padding: 5}} 
                                value={newComplementDescription} placeholder={newComplementMultiplier == -1 ? 'Ex: desconto de aniversário' : 'Ex: taxa de entrega'} 
                                onChangeText={(value: string)=>{setNewComplementDescription(value)}} />

                            <View style={{flexDirection: 'row', gap: 10}}>
                                <Text 
                                    onPress={()=>setNewComplementType(1)} 
                                    style={{padding: 5, borderRadius: 5, borderWidth: 1, flex: 1, textAlign: 'center', 
                                        backgroundColor: !newComplementType ? 'white' : COLORS.primary, color: !newComplementType ? COLORS.primary : 'white'}}
                                >
                                        R$
                                </Text>
                                <Text 
                                    onPress={()=>setNewComplementType(0)} 
                                    style={{padding: 5, borderRadius: 5, borderWidth: 1, flex: 1, textAlign: 'center', 
                                        backgroundColor: newComplementType ? 'white' : COLORS.primary, color: newComplementType ? COLORS.primary : 'white'}}
                                >
                                    %
                                </Text>
                            </View>
                            <View style={{borderWidth: 1, borderRadius: 5, padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{marginRight: 10}}>{newComplementType ? 'R$' : ''}</Text>
                                <TextInput 
                                    style={{flex: 1}}
                                    value={newComplementValue} onChangeText={(value)=>{setNewComplementValue(handleSetNumericValue(value))}}   
                                />
                                <Text style={{marginRight: 10}}>{!newComplementType && '%'}</Text>

                            </View>
                            <CreateButton action={handleCreateNewComplement} text={`Criar ${newComplementMultiplier == -1 ? 'desconto' : 'taxa'}`} />
                        </View>
                        <Text style={styles.closeModal}>Fechar</Text>
                    </TouchableOpacity>
                </Modal>
                )}
                {(productModal) && (
                    <Modal
                        transparent={true}
                        visible={productModal}
                        onRequestClose={() => setProductModal(false)}
                    >
                        <TouchableOpacity style={styles.modal} onPress={() =>{search(''); setSearchValue(''); setProductModal(false)}} activeOpacity={1}>
                            <View style={styles.productModalContainer}>
                                <ScrollView style={[styles.productModal, { maxHeight: scrollViewHeight || 500 }]}>
                                <View style={styles.searchInput}>
                                    <View style={styles.inputArea}>
                                        <TextInput style={styles.input} 
                                            onChangeText={(value)=>{setSearchValue(value); search(value)}} value={searchValue}/>
                                        <Icon style={styles.icon} name="search" size={15} 
                                            color={COLORS.primary}/>
                                    </View>
                                </View>
                                    
                                    {filteredProducts.length > 0 ? (
                                        <View ref={contentRef}>
                                            {filteredProducts.map((el: any, key: number) => (
                                                <TouchableHighlight style={styles.productItem}
                                                    key={key}
                                                    underlayColor={COLORS.grayScalePrimary}
                                                    onPress={() => { handleSelectProduct(el) }}>
                                                    <Text style={styles.productItemText}>{el.name}</Text>
                                                </TouchableHighlight>
                                            ))}
                                        </View>
                                    ) : (
                                        <Text style={styles.noProducts}>Sem produtos</Text>
                                    )}
                                </ScrollView>
                            </View>
                            <Text style={styles.closeModal}>Fechar</Text>
                        </TouchableOpacity>
                    </Modal>
                )}
            </ScrollView>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
})

const mapDispatchToProps = (dispatch: Dispatch)=>({
    setOrderAction: (data: Partial<Order>)=>dispatch(setOrderInfo(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem)
