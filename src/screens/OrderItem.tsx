import React, { useEffect, useRef, useState } from "react";
import { Modal, ScrollView, Text, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/screen.OrderItem";
import { HorizontalLine } from "../components/HorizontalLine";
import Icon from "react-native-vector-icons/FontAwesome";
import RoundCheckBox from "../components/RoundCheckBox";
import { ProgressBar } from "react-native-paper";
import { COLORS } from "../styles/global";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OrderItems } from "../types/OrderItem";
import { addProductToOrder, getByOrderId, updateOrCreateOrderItems } from "../services/OrderItems";
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

type Props = {
    user: User,
    products: Product[]
}

const OrderItem = ({user, products}: Props) => {
    const [status, setStatus] = useState<any>([]);
    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
    const [orderData, setOrderData] = useState<any>();
    const [totalValue, setTotalValue] = useState(0);
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
    
    const contentRef = useRef<View>(null);


    useEffect(() => {
        const handleGetData = async () => {
            try {
                const data = await getByOrderId(id);
                setOrderData(data);
                setOrderItems(data.items);
                calculateTotal(data.items)
                
                const statusArray = data.items.map((el: any) => el.finished);
                setStatus(statusArray);
                
                const concluded = statusArray.filter((status: any) => status).length
                const percentage = concluded / statusArray.length;
                setPercentage(percentage);

                if(!products || products.length ==0){
                    const products = await getAllProductsByUserId(user.id);
                    
                    const filteredProducts = products.filter((product: any) => {
                        const isInOrder = data.items.some((orderItem: any) => orderItem.productId === product.id);
            
                        const isSelected = selectedProducts.some(selectedProduct => selectedProduct.id === product.id);
            
                        return !isInOrder && !isSelected;
                    });

                    setProductsList(sortProducts(products));
                    setFilteredProducts(sortProducts(filteredProducts))
                } else {
                    const filteredProducts = products.filter(product => {
                        const isInOrder = orderItems.some(orderItem => orderItem.productId === product.id);
            
                        const isSelected = selectedProducts.some(selectedProduct => selectedProduct.id === product.id);
            
                        return !isInOrder && !isSelected;
                    });

                    setProductsList(sortProducts(products));
                    setFilteredProducts(sortProducts(filteredProducts))
                }
            } catch (error) {
                console.error("Failed to fetch order data:", error);
            }
        }

        handleGetData();
    }, []);

    const handleNavigate = (url: string, id: number)=>{
        navigate.navigate(url, {id})
    }

    const handleCheck = (itemId: number) => {
        const updatedOrderItems = orderItems.map(item =>{
           return item.orderItemId === itemId ? { ...item, finished: !item.finished } : item
        });
        console.log(updatedOrderItems, itemId)
        
        setOrderItems(updatedOrderItems);
        
        const statusArray = updatedOrderItems.map(item => item.finished);
        setStatus(statusArray);
        
        const concluded = statusArray.filter(status => status).length;
        const percentage = concluded / statusArray.length;
        setPercentage(percentage);
    };

    const handleBudget = ()=>{

    }
    const handleFinishOrder = ()=>{
        if(percentage !== 1) return setMessageWithTimer('Conclua todos os itens do pedido', 'error')
    }
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
        console.log(id, quantity)
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
        
        setTotalValue(totalValue + (orderItem.value * orderItem.quantity))

        const filteredSelected = selectedProducts.filter((el)=>{
            return el.id !== orderItem.productId
        })
        const updatedOrderItems = [...orderItems, orderItem];
        setSelectedProducts(filteredSelected)
        setOrderItems(updatedOrderItems);
        
        calculateTotal(updatedOrderItems)
    }

    const calculateTotal = (updatedOrderItems: OrderItems[])=>{
        const statusArray = updatedOrderItems.map(item => item.finished);
        setStatus(statusArray);
        
        const concluded = statusArray.filter(status => status).length;
        const percentage = concluded / statusArray.length;
        setPercentage(percentage);
        const totalValue = updatedOrderItems.map((el)=>el.value * el.quantity).reduce((a: any, b: any)=>a+b)
        setTotalValue(totalValue)
    }
    const removeOrderItem = (id: number)=>{
        const updatedOrderItems = orderItems.filter((el)=>el.productId !== id)
        setOrderItems(updatedOrderItems);
        calculateTotal(updatedOrderItems)
    }

    const handleSave = async ()=>{
        console.log(orderItems)
        const updatedOrderItems = orderItems.map((el)=>({productId: el.productId, quantity: el.quantity, finished: Boolean(el.finished), value: el.value}))
        const update = await updateOrCreateOrderItems(orderData.orderId, updatedOrderItems);

        console.log(update)
        if(update.status !== 200) return setMessageWithTimer('Erro ao atualizar', 'error')

        return setMessageWithTimer('Alterado com sucesso', 'success')
    }

    return (
        <>
            <MessageDisplay />
            <ScrollView style={styles.page}>
                <Text style={styles.save} onPress={handleSave}>Salvar</Text>
                <View style={styles.orderInfo}>
                    <Text style={{ ...styles.orderInfoStatus, color: COLORS.primary }}>Status: Aberto</Text>
                    <Text style={styles.orderInfoText}>Cliente: {orderData?.clientName}</Text>
                    <Text>Progresso: {Math.round(percentage * 100)}% ({status.filter((status: any) => status).length}/{status.length})</Text>
                    <Text>Valor total: R${totalValue.toFixed(2).replace('.', ',')}</Text>
                    <ProgressBar progress={percentage} color={COLORS.primary} style={{ borderRadius: 10, height: 7 }} />
                    <View style={styles.finishOrderArea}>
                        <TouchableHighlight style={styles.finishOrder}
                            underlayColor={COLORS.primaryPressed} onPress={() => { handleBudget() }}>
                            <Text style={[styles.newProductText, {color: '#000'}]}>Enviar orçamento</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={[styles.finishOrder, 
                                {backgroundColor: percentage == 1 ?  COLORS.primary : COLORS.grayScaleSecondary}]}
                            underlayColor={COLORS.primaryPressed} onPress={() => { handleFinishOrder() }}>
                            <Text style={styles.newProductText}>
                                Pedido entregue
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <TouchableOpacity style={styles.paymentArea} onPress={()=>{handleNavigate('orderPayment', id)}}>
                        <Icon name={'money'} size={18} color={COLORS.primary}/>
                        <Text style={styles.payment}>Pagamentos</Text>
                    </TouchableOpacity>
                </View>
                <HorizontalLine />
                {selectedProducts.length > 0 && (
                    <View style={styles.newProducts}>
                    <Text style={styles.separator}>Edite os produtos:</Text>
                        {selectedProducts.map((el: any, key: number) => (
                            <View key={key}>
                                <ProductListItem name={el.name} 
                                    price={el.value} 
                                    removeItem={()=>removeProduct(el.id)} 
                                    setProductQuantity={(quantity: number)=>handleSetQuantity(el.id, quantity)}
                                    confirm confirmItem={()=>{confirmProduct(el.id)}}
                                />
                            </View>
                        ))}
                    </View>
                )}
                {['Pendentes', 'Concluídos'].map((section, key) => (
                    <View key={key}>
                        <Text style={styles.separator}>{section} ↆ</Text>
                        <View style={styles.orders} >
                            {orderItems.filter((product: any) => product.finished == (key == 1)).map((item: any, key: number) => (
                                <OrderProduct
                                    key={key}
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
                ))}
                <TouchableHighlight style={styles.newProduct}
                        underlayColor={COLORS.primaryPressed} onPress={() => { handleNewProduct() }}>
                    <Text style={styles.newProductText}>Adicionar produto</Text>
                </TouchableHighlight>
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
    products: state.productsReducer.products
})

export default connect(mapStateToProps)(OrderItem)
