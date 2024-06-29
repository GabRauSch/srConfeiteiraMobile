import { Modal, Platform, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { styles } from '../styles/screen.NewProduct'
import { useEffect, useState, useRef } from "react"
import InputPicker from "../components/InputPicker"
import CreateButton from "../components/CreateButton"
import useMessage from "../hooks/useMessage"
import { RootState } from "../store"
import { User } from "../types/User"
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Dispatch } from "redux"
import { validateClientCreate, validateOrderCreate, validateProductCreate } from "../util/validation"
import { createClient, getAllClientsByUserId } from "../services/Clients"
import { Client } from "../types/Client"
import { newClient } from "../reducers/clientsReducer"
import { COLORS, MODAL } from "../styles/global"
import ProductListItem from "../components/ProductListItem"
import { Product, SelectedProducts } from "../types/Product"
import { getAllProductsByUserId } from "../services/Products";
import DateTimePicker from '@react-native-community/datetimepicker';
import { sortClientNames, sortClients, sortProducts } from "../util/sorter"
import InputEdit from "../components/InputEdit"
import SearchInput from "../components/SearchInput";
import Icon from 'react-native-vector-icons/FontAwesome';
import { createOrder } from "../services/Orders"
import { newOrder } from "../reducers/ordersReducer"
import { Order } from "../types/Order"
import { constructNow, format } from "date-fns"
import { HeaderCreation } from "../components/HeaderCreation"


type Props = {
    user: User,
    clients: Client[],
    products: Product[],
    newOrderAction: (payload: any) => void
}


const NewOrder = ({ user, clients, products, newOrderAction }: Props) => {
    const { MessageDisplay, setMessageWithTimer } = useMessage();
    const [client, setClient] = useState<any>();
    const [clientsList, setClientList] = useState<any[]>([]);
    const [productModal, setProductModal] = useState(false);
    const [productsList, setProductsList] = useState<any[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([])
    const [scrollViewHeight, setScrollViewHeight] = useState(0);
    const [totalSum, setTotalSum] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date())
    const [showDate, setShowDate] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [showTime, setShowTime] = useState(false);
    const [clientModal, setClientModal] = useState(false);
    const [filteredClients, setFilteredClients] = useState<any[]>([]);
    const navigate = useNavigation() as any

    const contentRef = useRef<View>(null);


    const getData = async () => {       
        if(clients.length == 0){
            const newClients = await getAllClientsByUserId(user.id);
            if(newClients.data.status !== 200) {
                setClientList([]);
                setFilteredClients([])
            } 
            const sortedClients = sortClientNames(newClients.data);
            const clientsMapped = sortedClients.map((client: any) => ({ id: client.id, description: client.name }));
            setClientList(clientsMapped);
            setFilteredClients(clientsMapped)
        }

        
        setProductsList(sortProducts(products));
        setFilteredProducts(sortProducts(products))
        if(products.length ==0){
            const products = await getAllProductsByUserId(user.id);
            setProductsList(sortProducts(products));
            setFilteredProducts(sortProducts(products))
        }

    }

    useEffect(() => {
        getData()
    }, [user.id])

    useEffect(()=>{
        if(clients.length > 0){
            const sortedClients = sortClientNames(clients);
            const clientsMapped = sortedClients.map((client: any) => ({ id: client.id, description: client.name }));
            setClientList(clientsMapped);
            setFilteredClients(clientsMapped)
        }

        if(products.length > 0){
            setProductsList(sortProducts(products));
            setFilteredProducts(sortProducts(products))
        }
    }, [])

    useEffect(()=>{
        sumProducts()
    }, [selectedProducts])

    const validateOrder = (order: any) => {
        return validateOrderCreate(order)
    }

    const handleSetClient = (value: string) => {
        const selected = clientsList.find((el) => el.id == value)
        setClient(selected)
    }

    const handleCreate = async () => {
        if(!date || !time) return setMessageWithTimer('Selecione a data de entrega!', 'error');
        if(!client) return setMessageWithTimer('Selecione o cliente para continuar', 'error')
            const datePart = format(date, 'yyyy-MM-dd');
        const timePart = format(time, 'HH:mm:ss');
        const combinedDateTimeString = `${datePart}T${timePart}`;

        console.log(new Date(combinedDateTimeString).toISOString())

        const orderProducts = selectedProducts.map((el: any)=>({id: el.id, quantity: el.quantity, value: el.value}))
        const orderData: any = {
            userId: user.id, clientId: client.id, 
            value: parseFloat(totalSum.toFixed(2)), 
            deliveryDate: new Date(combinedDateTimeString).toISOString(),
            products: orderProducts
        }
        const validation = validateOrder(orderData);
        if(validation) return setMessageWithTimer(validation, 'error')
            
        const creation: any = await createOrder(orderData);
        
        if(creation.status !== 200){
            console.log(creation.data)
            return setMessageWithTimer(creation.data.message, 'error')
        } 
        
        const clientName = clientsList.find((el)=>el.id == creation.data.clientId).description;
        const newOrder: Order = {
            orderId: creation.data.id,
            clientId: creation.data.clientId,
            client: clientName,
            orderNumber: creation.data.orderNumber,
            deliveryDay: creation.data.deliveryDate,
            value: orderData.value,
            status: 0,
            products: selectedProducts.map((el)=>({id: el.id, name: el.name, quantity: el.quantity, finished: false})),
            delay: false
        }

        newOrderAction(newOrder);
        navigate.navigate('Orders', {screen: 'orders'})
    }

    const handleNewProduct = () => {
        search('')
        setProductModal(true);
    }
    const handleNewClient = ()=>{
        setClientModal(true)
    }
    const handleSelectClient = (client: any)=>{
        const selectedClient = clientsList.find((el)=>el.id == client.id)
        setClient(selectedClient);
        setClientModal(false)
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

    const sumProducts = () => {
        const totalValue = selectedProducts
            .map((el) => el.value * el.quantity)
            .reduce((acc, currentValue) => acc + currentValue, 0);

        setTotalSum(totalValue);
    }
    const removeProduct = (id: number)=>{
        const product = selectedProducts.filter((el: any)=>el.id == id)
        const products = selectedProducts.filter((el: any)=>el.id !== id)
        setSelectedProducts(sortProducts(products))
        setFilteredProducts(sortProducts([...productsList, ...product]));
    }

    const changeProductQuantity = (id: number, increase: boolean)=>{
        setSelectedProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: product.quantity + (increase ? 1 : -1)
                    };
                }
                return product;
            });
        });
    }
    const handleSetQuantity = (id: number, quantity: number)=>{
        setSelectedProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity
                    };
                }
                return product;
            });
        });
    }

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.measure((x, y, width, height, pageX, pageY) => {
                setScrollViewHeight(height);
            });
        }
    }, [productsList]);

    const onSetDate = (event: any, selectedDate: any) => {
        setShowTime(true)
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const onSetTime = (event: any, selectedDate: any)=>{
        const currentDate = selectedDate || date;
        setShowTime(Platform.OS === 'ios');
        setTime(currentDate)        
    }

    const search = (value: string)=>{
        let productsFiltered = productsList.filter((el)=> {
            if(!selectedProducts.find((sel)=>el.id == sel.id)){
                return el.name.toLowerCase().includes(value.toLowerCase())
            }
        }); 
        
        if(productsFiltered)
        setFilteredProducts(productsFiltered);
    }
    const searchClient = (value: string)=>{
        let clientsFiltered = clientsList.filter((el)=>{
            return el.description.toLowerCase().includes(value.toLowerCase())
        })
        if(clientsFiltered) setFilteredClients(clientsFiltered)
    }

    return (
        <>
            <MessageDisplay />
            <ScrollView style={styles.page}>
                <HeaderCreation url="orders" title="Crie um pedido"/>
                <View style={styles.inputsDisplay}>
                {clientModal && (
                    <Modal
                        transparent={true}
                        visible={clientModal}
                        onRequestClose={() =>{console.log(filteredClients); setClientModal(false)}}
                    >
                        <TouchableOpacity style={styles.modal} onPress={() =>{searchClient(''); setSearchValue(''); setClientModal(false)}} activeOpacity={1}>
                            <View style={styles.productModalContainer}>
                                <ScrollView style={[styles.productModal, { maxHeight: scrollViewHeight || 500 }]}>
                                <View style={styles.searchInput}>
                                    <View style={styles.inputArea}>
                                        <TextInput style={styles.input} 
                                            onChangeText={(value)=>{setSearchValue(value); searchClient(value)}} value={searchValue}/>
                                        <Icon style={styles.icon} name="search" size={15} 
                                            color={COLORS.primary}/>
                                    </View>
                                </View>
                                    
                                    {clientsList.length > 0 ? (
                                        <View ref={contentRef}>
                                            {filteredClients.map((el: any, key: number) =>(
                                                <TouchableHighlight style={styles.productItem}
                                                    key={key}
                                                    underlayColor={COLORS.grayScalePrimary}
                                                    onPress={() => { handleSelectClient(el) }}>
                                                    <Text style={styles.productItemText}>{el.description}</Text>
                                                </TouchableHighlight>
                                            ))}
                                        </View>
                                    ) : (
                                        <Text style={styles.noProducts}>Sem clients</Text>
                                    )}
                                </ScrollView>
                            </View>
                            <Text style={styles.closeModal}>Fechar</Text>
                        </TouchableOpacity>
                    </Modal>
                )}
                <Text >
                    <Text style={styles.productsTitle}>Cliente: </Text>
                    {client ? (
                        <Text>{client.description}</Text>
                    ): (
                        <Text style={{color: COLORS.grayScaleSecondary}}>Nenhum cliente selecionado</Text>
                    )}
                </Text>
                <TouchableHighlight style={styles.changeInfo}
                    underlayColor={COLORS.primaryPressed} onPress={() => {console.log(filteredClients); handleNewClient() }}>
                    <Text style={styles.changeInfoText}>Selecionar cliente</Text>
                </TouchableHighlight>
                    {showDate &&
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            minimumDate={new Date()}
                            accentColor="red"
                            onChange={onSetDate} 
                        />
                    }
                    {showTime &&
                        <DateTimePicker
                            value={time}
                            mode="time"
                            display="default"
                            minimumDate={new Date()}
                            accentColor="red"
                            onChange={onSetTime} 
                        />
                    }
                    <View style={styles.products}>
                        <Text><Text style={styles.dateDisplay}> Entrega: </Text>{date.toLocaleDateString('pt-BR')} às {time.toLocaleTimeString('pt-BR')}</Text>
                        <TouchableHighlight style={styles.changeInfo}
                            underlayColor={COLORS.primaryPressed} onPress={() => { setShowDate(true) }}>
                            <Text style={styles.changeInfoText}>Alterar data e hora</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.products}>
                        <Text style={styles.productsTitle}>Produtos:</Text>
                        {selectedProducts.map((el: any, key: number) => (
                            <ProductListItem key={key} name={el.name} 
                                price={el.value} 
                                removeItem={()=>removeProduct(el.id)} 
                                setProductQuantity={(quantity: number)=>handleSetQuantity(el.id, quantity)}
                            />
                        ))}
                        <TouchableHighlight style={styles.changeInfo}
                            underlayColor={COLORS.primaryPressed} onPress={() => { handleNewProduct() }}>
                            <Text style={styles.changeInfoText}>+ Adicionar produto</Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <Text style={styles.total}>Total: R${totalSum.toFixed(2).replace('.',',')}</Text>
                    </View>
                    <View style={styles.createButton}>
                        <CreateButton text={'Criar pedido'} action={handleCreate} />
                    </View>
                </View>
            </ScrollView>
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
        </>

    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
    clients: state.clientsReducer.clients,
    products: state.productsReducer.products
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    newOrderAction: (payload: any) => dispatch(newOrder(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder)
