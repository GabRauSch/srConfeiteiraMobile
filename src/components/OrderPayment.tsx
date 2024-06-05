import React, { useEffect, useRef, useState } from "react";
import { Modal, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/screen.OrderPayment";
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
import Message from "../modals/Message";
import useMessage from "../hooks/useMessage";
import { Picker } from "@react-native-picker/picker";
import NumericInput from "react-native-numeric-input";
import { getExtendedDate } from "../util/transform";

type Props = {
    user: User,
    products: Product[]
}

const OrderPayment = ({user, products}: Props) => {
    const [status, setStatus] = useState<any>([]);
    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
    const [orderData, setOrderData] = useState<any>();
    const [totalValue, setTotalValue] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const route = useRoute();
    const { id } = route.params as any;
    const navigate = useNavigation() as any;
    const [paymentModal, setPaymentModal] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [productsList, setProductsList] = useState<any[]>([]);
    const [scrollViewHeight, setScrollViewHeight] = useState(0);
    const { message, MessageDisplay, setMessageWithTimer } = useMessage();
    const [selectedPaymentType, setSelectedPaymentType] = useState(0);
    const [paymentValue, setPaymentValue] = useState(0);
    const [installmentsCount, setInstallmentCount] = useState(1);
    const [installments, setInstallments] = useState<{value: number, count: number}>({value: 10, count: 1});
    const [payments, setPayments] = useState([{
        id: 1, orderId: 1, value: 1, date: new Date(), paid: false
    }])

    const contentRef = useRef<View>(null);
    const paymentTypes = ['À vista', 'Parcelado', 'Pagamentos independentes'];


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
        setPaymentModal(true)
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
        const updatedOrderItems = orderItems.map((el)=>({productId: el.productId, quantity: el.quantity, finished: Boolean(el.finished)}))
        const update = await updateOrCreateOrderItems(orderData.orderId ,updatedOrderItems);

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
                    <Text>Valor pago: R${totalValue.toFixed(2).replace('.', ',')} de R${totalValue.toFixed(2).replace('.', ',')}</Text>
                    <Text style={styles.payment} onPress={()=>{handleNavigate('orderPayment', id)}}>Itens do pedido</Text>
                    <ProgressBar progress={percentage} color={COLORS.primary} style={{ borderRadius: 10, height: 7 }} />
                    <View style={[styles.finishOrderArea, {justifyContent: 'flex-end'}]}>
                        <TouchableHighlight style={[styles.finishOrder, 
                                {backgroundColor: percentage == 1 ?  COLORS.primary : COLORS.grayScaleSecondary}]}
                            underlayColor={COLORS.primaryPressed} onPress={() => { handleFinishOrder() }}>
                            <Text style={styles.newProductText}>
                                Concluir pedido
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <HorizontalLine />
                <View style={styles.paymentDetails}>
                    <View style={styles.paymentType}>
                        <Picker selectedValue={selectedPaymentType} onValueChange={setSelectedPaymentType}>
                            {paymentTypes.map((el, key)=>(
                                <Picker.Item label={el} value={key} key={key}></Picker.Item>
                            ))}
                        </Picker>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                            {selectedPaymentType == 1 && (
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text>Parcelas</Text>
                            <NumberSetter quantity={installments.count} 
                            handleQuantity={(quantity: number)=>{setInstallmentCount(quantity)}}/>
                        </View>
                            )}
                        <View style={{flex: 1}}>
                            <Text style={{textAlign: 'center'}}>Valor</Text>
                            <Text style={styles.installments}>R${installments.value.toFixed(2).replace('.',',')}</Text>
                        </View>
                    </View>
                    {selectedPaymentType == 2 && (
                        <Text style={styles.editInstallments}>Novo pagamento</Text>
                    )}
                    <Text style={{textAlign: 'center', padding: 10, fontWeight: 'bold', color: COLORS.primary}}>Confirmar</Text>
                </View>
                <HorizontalLine />
                <View>
                    {payments.map((el, key)=>(
                        <View key={key} style={styles.orderPayment}>
                            <Text>{getExtendedDate(el.date)}</Text>
                            <Text>R${el.value.toFixed(2).replace('.',',')}</Text>
                            <RoundCheckBox active={el.paid} onCheck={() =>{}} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
    products: state.productsReducer.products
})

export default connect(mapStateToProps)(OrderPayment)
