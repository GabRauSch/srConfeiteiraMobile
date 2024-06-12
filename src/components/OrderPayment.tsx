import React, { useEffect, useRef, useState } from "react";
import { Modal, Platform, ScrollView, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "../styles/screen.OrderPayment";
import { HorizontalLine } from "../components/HorizontalLine";
import Icon from "react-native-vector-icons/FontAwesome";
import { ProgressBar } from "react-native-paper";
import { COLORS } from "../styles/global";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OrderItems } from "../types/OrderItem";
import { getByOrderId, createPayments, updatePayments, deletePayments } from "../services/OrderPayments";
import { User } from "../types/User";
import { RootState } from "../store";
import { connect } from "react-redux";
import { TextInput } from "react-native";
import { Product, SelectedProducts } from "../types/Product";
import NumberSetter from "../components/NumberSetter";
import useMessage from "../hooks/useMessage";
import { Picker } from "@react-native-picker/picker";
import { handleSetNumericValue } from "../util/numeric";
import { addMonths, constructNow, format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { handleResponse } from "../services/responseMapping";


type Props = {
    user: User,
    products: Product[]
}

type payment = {
    paymentId: number,
    paymentValue: number,
    paidValue: number,
    dueDate: Date
}

type paymentCreation = {
    value: number,
    dueDate: Date,
    installments?: number
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
    const [paymentValue, setPaymentValue] = useState('0,00');
    const [installments, setInstallments] = useState<number>(1);
    const [payments, setPayments] = useState<payment[]>([]);
    const [independentPayments, setIndependentPayments] = useState<any>([]);
    const [dueDate, setDueDate] = useState(new Date())
    const [showDate, setShowDate] = useState(false);
    const [independentPaymentsDate, setIndependentPaymentsDate] = useState(-1);
    const [showChoosePayment, setShowChoosePayment] = useState(false);
    const [changePaymentModal, setChangePaymentModal] = useState(false);
    const [allowExclusion, setAllowExclusion] = useState(false)

    const contentRef = useRef<View>(null);
    const paymentTypes = ['À vista', 'Parcelado', 'Pagamentos independentes'];
    useEffect(() => {
        const handleGetData = async () => {
            try {
                const {data, status} = await getByOrderId(id);
                if(status !== 200) return setMessageWithTimer('Erro ao carregar dados', 'error')

                const orderData = {id: data.id, name: data.name, orderValue: data.orderValue, selectedPayment: data.selectedPayment};
                setOrderData(orderData);
                setShowChoosePayment(orderData.selectedPayment == null)
                if(data.selectedPayment) setSelectedPaymentType(data.selectedPayment)
                setPayments(data.payments);
                setAllowExclusion(!!data.payments.filter((el: any)=>el.paidValue !== null))

                const statusArray = data.payments.map((el: any) => el.paidValue != null);
                setStatus(statusArray);
                
                const concluded = statusArray.filter((status: any) => status).length
                const percentage = concluded / statusArray.length;
                setPercentage(isNaN(percentage) ? 0 : percentage);
            } catch (error) {
                console.error("Failed to fetch order data:", error);
            }
        }

        handleGetData();
    }, []);


    const handleCheck = (paymentId: number)=>{
        
    }
    const closeChangePayment = ()=>{
        setChangePaymentModal(false)
    }
    const confirmChangePayment = async ()=>{
        setChangePaymentModal(false);
        if(!allowExclusion) return setMessageWithTimer('Você tem pedidos pagos nessa ordem, delete o pagamento para trocar o tipo', 'error') 
        setShowChoosePayment(true);
        
        const {data, status} = await deletePayments(id);
        if(status !== 200) return setMessageWithTimer('Erro ao excluir', 'error')
        setPayments([]);
    }
    const handleSetIndepentendPayments = (value: string, id: number)=>{
        const updatedPayments = [...independentPayments];

        updatedPayments[id].value = handleSetNumericValue(value);
        setIndependentPayments(updatedPayments);
    }
    const handleNavigate = (url: string, id: number)=>{
        navigate.navigate(url, {id})
    }

    const handleCreate = async ()=>{
        const createData: any = {
            orderId: id,
            selectedPayment: selectedPaymentType
        }
        if(selectedPaymentType == 0) createData.payments = [{value: orderData.orderValue, dueDate}]
        if(selectedPaymentType == 1) {
            createData.payments = [];
            for(let i=0;i<installments;i++){
                const installmentDate = addMonths(new Date(dueDate), i);
                createData.payments.push({value: orderData.orderValue / installments, dueDate: installmentDate})
            }
        }
        if(selectedPaymentType == 2) createData.payments = independentPayments.map((el: any)=>({value: parseFloat(el.value.replace(',','.')), dueDate: el.dueDate}))

        const totalValue = createData.payments.reduce((a: any,b: any)=>a.value+b.value).value;
        const currentPayment = payments.reduce((a: number, b: any) => a + b.paymentValue, 0);
        console.log(currentPayment, totalValue, orderData.orderValue)
        if(currentPayment + totalValue > orderData.orderValue) return setMessageWithTimer('Pagamento excede o valor do pedido', 'error')

        const {data, status} = await createPayments(createData);
        console.log(data)
        if(status !== 200) return setMessageWithTimer(handleResponse(data).message, 'error');
        const newPayment = createData.payments.map((el: any)=>({
            dueDate: new Date(el.dueDate),
            paidValue: null,
            paymentValue: el.value
        }))
        setShowChoosePayment(false)
        setPayments([...payments, ...newPayment])
    }

    const handleNewIndependentPayment = ()=>{
        if(independentPayments.length == 0) 
            return setIndependentPayments([{value: handleSetNumericValue('0'), dueDate: new Date()}])
            
        const newPI = {value: handleSetNumericValue('0'), dueDate: addMonths(new Date(independentPayments[independentPayments.length -1].dueDate), 1)}
        setIndependentPayments([...independentPayments, newPI])
    }

    const onSetIndependentPaymentDate = (event: any, selectedDate: any, id: number) => {
        setIndependentPaymentsDate(-1);
        const currentDate = selectedDate || independentPayments[id].dueDate;
        const updatedPayments = [...independentPayments];
        updatedPayments[id].dueDate = currentDate;
        setIndependentPayments(updatedPayments);
    };
    const handleSelectPaymentType = (value: number)=>{
        setSelectedPaymentType(value)
    }

    const handleFinishOrder = ()=>{
        if(percentage !== 1) return setMessageWithTimer('Conclua todos os itens do pedido', 'error')
    }
    const onSetDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || dueDate;
        setShowDate(Platform.OS === 'ios');
        setDueDate(currentDate);
    };

    const mapPaymentType = (type: number)=>{
        if(type == 0) return 'À vista';
        if(type == 1) return  'Parcelado';
        if(type == 2) return 'Pagamentos independentes'
    }

    const confirmProduct = async (id: number)=>{
        // const createdProduct = selectedProducts.find(el=>el.id == id);
        // if(!createdProduct) return

        // const newOrderItem = {
        //     quantity: createdProduct.quantity, 
        //     productId: id
        // }

        // const orderItem = {
        //     quantity: newOrderItem.quantity,
        //     productId: id,
        //     productName: createdProduct.name,
        //     orderItemId: createdProduct.id,
        //     value: createdProduct.value,
        //     finished: false
        // }
        
        // setTotalValue(totalValue + (orderItem.value * orderItem.quantity))

        // const filteredSelected = selectedProducts.filter((el)=>{
        //     return el.id !== orderItem.productId
        // })
        // const updatedOrderItems = [...orderItems, orderItem];
        // setSelectedProducts(filteredSelected)
        // setOrderItems(updatedOrderItems);
        
        // calculateTotal(updatedOrderItems)
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

    const handleSave = async ()=>{
        // const updatedOrderItems = orderItems.map((el)=>({productId: el.productId, quantity: el.quantity, finished: Boolean(el.finished)}))
        // const update = await updatePayments(orderData.orderId ,updatedOrderItems);

        // if(update.status !== 200) return setMessageWithTimer('Erro ao atualizar', 'error')

        // return setMessageWithTimer('Alterado com sucesso', 'success')
    }

    const handleChangeSelectedPayment = ()=>{
        setChangePaymentModal(true)
    }

    return (
        <>
            <MessageDisplay />
            <ScrollView style={styles.page}>
                <Text style={styles.save} onPress={handleSave}>Salvar</Text>
                <View style={styles.orderInfo}>
                    <Text style={{ ...styles.orderInfoStatus, color: COLORS.primary }}>Status: Aberto</Text>
                    <Text style={styles.orderInfoText}>Cliente: {orderData?.name}</Text>
                    <Text>Tipo de pagamento: {mapPaymentType(selectedPaymentType)}
                        <Text> </Text> 
                        <Text style={styles.redirectButtonText} onPress={handleChangeSelectedPayment}>alterar</Text>
                    </Text>
                    <Text>Progresso: {Math.round(percentage * 100)}% ({status.filter((status: any) => status).length}/{status.length})</Text>
                    <Text>Valor pago: R${totalValue.toFixed(2).replace('.', ',')} de R${orderData?.orderValue.toFixed(2).replace('.', ',')}</Text>
                    <Text style={styles.redirectButtonText} onPress={()=>{handleNavigate('order', id)}}>Itens do pedido</Text>
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
                <ScrollView style={styles.paymentDetails}>
                    {showChoosePayment && (
                        <>
                        <View style={styles.paymentType}>
                            <Picker selectedValue={selectedPaymentType} onValueChange={(value)=>{handleSelectPaymentType(value)}}>
                                {paymentTypes.map((el, key)=>(
                                    <Picker.Item label={el} value={key} key={key}></Picker.Item>
                                ))}
                            </Picker>
                        </View>
                        <View style={{flexDirection: 'row', gap: 5}}>
                            {selectedPaymentType == 1 &&
                                <View style={{flex: 1}}>
                                    <Text style={{textAlign: 'center'}}>Parcelas</Text>
                                    <NumberSetter style={{flex:1}} quantity={installments} minValue={1}
                                    handleQuantity={(quantity: number)=>{setInstallments(quantity)}}/>
                                </View>
                            }
                            {selectedPaymentType == 2 ? (
                                <View style={{flex: 1, gap: 10}}>
                                    {independentPayments.map((el: any, key: number) => (
                                    <View style={{ flexDirection: 'row', gap: 5 }} key={key}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'center' }}>Valor</Text>
                                            <View style={styles.installments}>
                                                <Text style={styles.installmentsText}>R$</Text>
                                                <TextInput
                                                    style={styles.installmentsText}
                                                    keyboardType="numeric"
                                                    value={el.value}
                                                    onChangeText={(value) => handleSetIndepentendPayments(value, key)}
                                                />
                                            </View>
                                        </View>
                                        {independentPaymentsDate == key && (
                                            <DateTimePicker
                                                value={el.dueDate}
                                                mode="date"
                                                display="default"
                                                minimumDate={new Date()}
                                                onChange={(event, date) => onSetIndependentPaymentDate(event, date, key)}
                                            />
                                        )}
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'center' }}>Data</Text>
                                            <View style={{ gap: 5 }}>
                                                <Text style={styles.installments}>{format(el.dueDate, 'dd/MM/yy')}</Text>
                                                <Text style={styles.changeDate} onPress={() => setIndependentPaymentsDate(key)}>alterar</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                                    </View>
                                ): (
                                    <>
                                        <View style={{flex: 1}}>
                                            <Text style={{textAlign: 'center'}}>Valor</Text>
                                        
                                            {selectedPaymentType == 1 && (
                                                <Text style={styles.installments}>R${(orderData?.orderValue / installments).toFixed(2).replace('.',',')}</Text>
                                            )}                      
                                            {selectedPaymentType == 0 && (
                                                <Text style={styles.installments}>R${orderData?.orderValue.toFixed(2).replace('.',',')}</Text>
                                            )}      
                                        </View>
                                        {showDate && (
                                            <DateTimePicker
                                                value={dueDate}
                                                mode="date"
                                                display="default"
                                                minimumDate={new Date()}
                                                accentColor="red"
                                                onChange={onSetDate} 
                                            />
                                        )}
                                        <View style={{flex: 1}}>
                                            <Text style={{textAlign: 'center'}}>data</Text>
                                            <View style={{gap: 5}}>
                                                <Text style={styles.installments}>{format(dueDate, 'dd/MM/yy')}</Text>
                                                <Text style={styles.changeDate} onPress={()=>setShowDate(true)}>alterar</Text>
                                            </View>
                                        </View>
                                    </>
                                )}
                            
                        </View>
                        </>
                    )}
                    {selectedPaymentType == 2 && (
                        <>
                            <Text style={styles.editInstallments} onPress={handleNewIndependentPayment}>Novo pagamento</Text>
                        </>
                    )}
                    {showChoosePayment && (
                        <Text onPress={handleCreate} style={{textAlign: 'center', color: COLORS.primary, fontWeight: 'bold', padding: 10}}>Confirmar</Text>
                    )}
                </ScrollView>
                <HorizontalLine />
                <ScrollView style={styles.paymentsList}>
                    <View style={styles.orderPayment}>
                        <Text style={{flex: 1, textAlign: 'center'}}>Data</Text>
                        <Text style={{flex: 1, textAlign: 'center'}}>Valor</Text>
                        {selectedPaymentType == 2 && (
                            <Text style={{flex: 1, textAlign: 'center'}}>Editar</Text>
                        )}
                        <Text style={{flex: 1, textAlign: 'center'}}>Marcar Pago</Text>
                    </View>
                    {payments.map((el, key)=>{
                        return (
                        <View key={key} style={styles.orderPayment}>
                            <Text style={{textAlign: 'center', flex: 1}}>{format(el.dueDate, 'dd/MM/yy')}</Text>
                            <Text style={{textAlign: 'center', flex: 1}}>R${el.paymentValue.toFixed(2).replace('.',',')}</Text>
                            {selectedPaymentType == 2 && (
                                <Icon name="pencil" color={COLORS.primary} style={{flex: 1, textAlign: 'center'}} size={20}/>
                            )}
                            <Icon name="check"  color={COLORS.primary} style={{flex: 1, textAlign: 'center'}} size={20}/>

                        </View>)
                        })}
                    {changePaymentModal && (
                        <Modal
                        animationType="fade"
                        transparent={true}
                    >
                        <TouchableWithoutFeedback onPress={closeChangePayment}>
                            <View style={styles.modalBackground}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalText}>Alterar o tipo de pagamento excluirá os pagamentos anteriores.</Text>
                                    <Text style={{margin: 5}}>Deseja continuar?</Text>
                                    
                                    <View style={styles.buttons}>
                                        <TouchableHighlight 
                                            style={styles.confirmButton} 
                                            onPress={closeChangePayment}
                                            underlayColor={COLORS.secondary}
                                        >
                                            <Text style={styles.confirmButtonText} onPress={confirmChangePayment}>Confirmar</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    )}
                </ScrollView>
            </ScrollView>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
    products: state.productsReducer.products
})

export default connect(mapStateToProps)(OrderPayment)
