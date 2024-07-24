import { Modal, Platform, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { styles } from '../styles/screen.NewProduct'
import { useEffect, useState, useRef } from "react"
import CreateButton from "../components/CreateButton"
import useMessage from "../hooks/useMessage"
import { RootState } from "../store"
import { User } from "../types/User"
import { connect, useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Dispatch } from "redux"
import {  validateOrderCreate } from "../util/validation"
import { COLORS, MODAL, SHADOW } from "../styles/global"
import ProductListItem from "../components/ProductListItem"
import { SelectedProducts } from "../types/Product"
import DateTimePicker from '@react-native-community/datetimepicker';
import { sortClientNames, sortProducts } from "../util/sorter"
import Icon from 'react-native-vector-icons/FontAwesome';
import { createOrder } from "../services/Orders"
import { newOrder, setOrders } from "../reducers/ordersReducer"
import { Order } from "../types/Order"
import { constructNow, format } from "date-fns"
import { HeaderCreation } from "../components/HeaderCreation"
import useClients from "../hooks/useClients"
import { useProducts } from "../hooks/useProducts"
import { Complement } from "../types/OrderComplements"
import { calculateOrderValue } from "../util/calculate"
import { handleSetNumericValue } from "../util/numeric"
import { mapOrderStatus } from "../util/mappers"
import { toggleVision } from "../reducers/visionReducer"


type Props = {
    user: User,
    newOrderAction: (payload: Order) => void
}


const NewOrder = ({ user, newOrderAction }: Props) => {
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
    const navigate = useNavigation() as any;
    const [complements, setComplements] = useState<Complement[]>([]);
    const [complementModal, setComplementModal] = useState(false);
    const [newComplementValue, setNewComplementValue] = useState('0,00');
    const [newComplementDescription, setNewComplementDescription] = useState('')
    const [newComplementMultiplier, setNewComplementMultiplier] = useState<-1 | 1>(1)
    const [newComplementType, setNewComplementType] = useState<0 | 1>(1);

    const dispatch = useDispatch();

    const contentRef = useRef<View>(null);

    const clients = useClients(user.id);
    const products = useProducts(user.id);

    useEffect(() => {
        const sortedClients = sortClientNames(clients);
        const clientsMapped = sortedClients.map((client: any) => ({ id: client.id, description: client.name }));
        setClientList([...clientsMapped]);
        setFilteredClients(clientsMapped)
        
        setProductsList(sortProducts(products));
        setFilteredProducts(sortProducts(products))

        console.log('its here useEffect 1')
        dispatch(toggleVision())
    }, [clients, products])

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.measure((x, y, width, height, pageX, pageY) => {
                setScrollViewHeight(height);
            });
        }
        console.log('its here useEffect 2')
        dispatch(toggleVision())
    }, [productsList]);
    useEffect(()=>{
        console.log('its here useEffect 3')
        dispatch(toggleVision())
        
        sumProducts()
    }, [selectedProducts])

    const validateOrder = (order: any) => {
        console.log('its here validate order')
        dispatch(toggleVision())
        
        return validateOrderCreate(order)
    }

    const handleSetClient = (value: string) => {
        const selected = clientsList.find((el) => el.id == value)
        setClient(selected)
    }

    const handleCreate = async (orderStatus: number) => {
        console.log('its here handle create part1')
        dispatch(toggleVision())
        
        if (!date || !time) return setMessageWithTimer('Selecione a data de entrega!', 'error');
        if (!client) return setMessageWithTimer('Selecione o cliente para continuar', 'error');
    
        const datePart = format(date, 'yyyy-MM-dd');
        const timePart = format(time, 'HH:mm:ss');
        const combinedDateTimeString = `${datePart}T${timePart}`;
    
        const orderProducts = selectedProducts.map((el: any) => ({ id: el.id, quantity: el.quantity, value: el.value }));
        const orderData: any = {
            userId: user.id, clientId: client.id,
            value: parseFloat(totalSum.toFixed(2)),
            orderStatus,
            deliveryDate: new Date(combinedDateTimeString).toISOString(),
            products: orderProducts,
            orderComplements: complements
        };
    
        const validation = validateOrder(orderData);
        if (validation) return setMessageWithTimer(validation, 'error');
    
        try {
            const creation: any = await createOrder(orderData);
            console.log(creation.data);
    
            if (creation.status !== 200) {
                console.log(creation.data);
                return setMessageWithTimer(creation.data.message, 'error');
            }
    
            const clientName = client.description;
            const newOrder: Order = {
                orderId: creation.data.id,
                clientId: creation.data.clientId,
                client: clientName,
                orderNumber: creation.data.orderNumber,
                deliveryDay: creation.data.deliveryDate,
                value: orderData.value,
                status: 0,
                products: selectedProducts.map((el) => ({ id: el.id, name: el.name, quantity: el.quantity, finished: false })),
                orderComplements: complements,
                delay: false,
                note: ''
            };
    
            console.log('its here handleCreate part 2')
            dispatch(toggleVision())
            newOrderAction(newOrder);
            
    
            navigate.navigate('Orders', { screen: 'orders' });
        } catch (error) {
            console.error("Order creation failed:", error);
            setMessageWithTimer('Failed to create order. Please try again.', 'error');
        }
    };
    
    const handleNewProduct = () => {
        console.log('its here handleNewProduct')
        dispatch(toggleVision())
        
        search('')
        setProductModal(true);
    }
    const handleNewClient = ()=>{
        console.log('its here handleNewClient')
        dispatch(toggleVision())
        
        setClientModal(true)
    }
    const handleSelectClient = (client: any)=>{
        console.log('its here hadnleSelectClient')
        dispatch(toggleVision())
        
     
        const selectedClient = clientsList.find((el)=>el.id == client.id)
        setClient(selectedClient);
        setClientModal(false)
    }
    const handleSelectProduct = (newProduct: any) => {
        
        console.log('its here handleSelectProduct')
        dispatch(toggleVision())
        
        setSelectedProducts(prevProducts => [
            ...prevProducts,
            {
                id: newProduct.id,
                name: newProduct.name,
                quantity: 1,
                value: newProduct.value 
            }
        ]);
        setFilteredProducts(prevProducts => prevProducts.filter(product => product.id !== newProduct.id));

        search('');
        setSearchValue('');
        setFilteredProducts((prevProducts: any) => prevProducts.filter((product: any) => product.id !== newProduct.id));
    }

    const sumProducts = () => {

        console.log('its heres sum products')
        dispatch(toggleVision())
        

        const totalValue = selectedProducts
            .map((el) => el.value * el.quantity)
            .reduce((acc, currentValue) => acc + currentValue, 0);

        setTotalSum(calculateOrderValue(totalValue, complements));
    }
    const removeProduct = (id: number)=>{
        
        console.log('its here remove product')
        dispatch(toggleVision())
        
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
        
        console.log('its here handleSetQuantity')
        dispatch(toggleVision())
        
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

   

    const onSetDate = (event: any, selectedDate: any) => {
        
        console.log('its here onSetDate')
        dispatch(toggleVision())
        

        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        setShowTime(!showTime)
    };
    const onSetTime = (event: any, selectedDate: any)=>{
        
        console.log('its here onSetTime')
        dispatch(toggleVision())
        
        const currentDate = selectedDate || date;
        setShowTime(Platform.OS === 'ios');
        setTime(currentDate)        
    }

    const search = (value: string)=>{
        
        console.log('its here search')
        dispatch(toggleVision())
        

        let productsFiltered = productsList.filter((el)=> {
            if(!selectedProducts.find((sel)=>el.id == sel.id)){
                return el.name.toLowerCase().includes(value.toLowerCase())
            }
        }); 
        
        if(productsFiltered)
        setFilteredProducts(productsFiltered);
    }
    const searchClient = (value: string)=>{
        
        console.log('its here searchClient')
        dispatch(toggleVision())
        
        let clientsFiltered = clientsList.filter((el)=>{
            return el.description.toLowerCase().includes(value.toLowerCase())
        })
        if(clientsFiltered) setFilteredClients(clientsFiltered)
    }

    const handleNewComplement = (multiplier: 1 | -1)=>{
        
        console.log('its here newComplement')
        dispatch(toggleVision())
        
        setNewComplementMultiplier(multiplier)
        setComplementModal(true);
    }

    const handleCreateNewComplement = async ()=>{
        
        console.log('its here handleNewComplement')
        dispatch(toggleVision())
        
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
        console.log(newComplement)

        const sorted = [...complements, newComplement].sort((a, b) => {
            if (a.valueType !== b.valueType) {
                return a.valueType === 1 ? 1 : -1;
            } else {
                return a.complementMultiplier === 1 ? -1 : 1;
            }
        })

        const productsValue = selectedProducts.map((el)=>el.value * el.quantity).reduce((a: any, b: any)=>a+b)

        setComplements(sorted)
        setComplementModal(false)
        setTotalSum(calculateOrderValue(productsValue, sorted))
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
                                        <Text style={styles.noProducts}>Sem clientes</Text>
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
                            underlayColor={COLORS.primaryPressed} onPress={() => { setShowDate(!showDate) }}>
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
                    <View style={styles.products}>
                        <Text style={styles.productsTitle}>Taxas e descontos:</Text>
                        {complements.map((el: Complement, key: number) => (
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
                        <View style={styles.addComplement}>
                            <TouchableHighlight style={styles.complement}
                                underlayColor={COLORS.primaryPressed} onPress={() => { handleNewComplement(-1) }}>
                                <Text style={styles.complementText}>Adicionar desconto</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.complement}
                                    underlayColor={COLORS.primaryPressed} onPress={() => { handleNewComplement(1) }}>
                                <Text style={styles.complementText}>Adicionar taxa</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
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
                    <View>
                        <Text style={styles.total}>Total: R${totalSum.toFixed(2).replace('.',',')}</Text>
                    </View>
                    <View style={styles.createButton}>
                        <CreateButton text={'Criar como orçamento'} inverted action={()=>handleCreate(mapOrderStatus('budget'))} />
                        <CreateButton text={'Criar como pedido'} action={()=>handleCreate(mapOrderStatus('open'))} />
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
    user: state.userReducer.user
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    newOrderAction: (payload: any)=>dispatch(newOrder(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder)
