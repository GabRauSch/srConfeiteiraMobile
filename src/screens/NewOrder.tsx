import { Modal, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { styles } from '../styles/screen.NewProduct'
import { useEffect, useState, useRef } from "react"
import InputPicker from "../components/InputPicker"
import CreateButton from "../components/CreateButton"
import useMessage from "../hooks/useMessage"
import Message from "../modals/Message"
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
import { Product } from "../types/Product"
import { getAllProductsByUserId } from "../services/Products"

type Props = {
    user: User,
    clients: Client[],
    products: Product[],
    newClientAction: (payload: any) => void
}

type SelectedProducts = {
    id: number,
    name: string,
    value: number,
    quantity: number
}

const NewClient = ({ user, clients, products, newClientAction }: Props) => {
    const { message, MessageDisplay, setMessageWithTimer } = useMessage();
    const [clientId, setClientId] = useState<string>();
    const [clientsList, setClientList] = useState<any[]>([]);
    const [productModal, setProductModal] = useState(false);
    const [productsList, setProductsList] = useState<any[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([])
    const [scrollViewHeight, setScrollViewHeight] = useState(0);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [totalSum, setTotalSum] = useState(0)

    const contentRef = useRef<View>(null);

    useEffect(() => {
        const getData = async () => {
            const clients = await getAllClientsByUserId(user.id);
            const clientsMapped = clients.map((client: any) => ({ id: client.id, description: client.name }));
            setClientList(clientsMapped)
            setProductsList(products);
            if(products.length ==0){
                const products = await getAllProductsByUserId(user.id);
                setProductsList(products)
            }
        }
        getData()
    }, [])

    useEffect(()=>{
        sumProducts()
    }, [selectedProducts])

    const validateOrder = (order: any) => {
        return validateOrderCreate(order)
    }

    const handleSetClient = (value: string) => {
        const selected = clientsList.find((el) => el.id == value).id
        setClientId(selected)
    }

    const handleCreate = async () => {
        const totalValue = 20;


        const orderData: any = {
            userId: 1, clientId, 
            value: totalValue, deliveryDate,
            products
        }
        // if(phone) clientData.phone = phone;
        // if(email) clientData.email = email;
        // if(address) console.log('address')

        // const validation = validateClient(clientData);
        // if(validation) return setMessageWithTimer(validation, 'error')

        // const creation: any = await createClient(clientData);
        // if(creation.status !== 200){
        //     return setMessageWithTimer(creation.data.message, 'error')
        // } 

        // const newClient: any = {
        //     id: creation.data.id,
        //     name: creation.data.name,
        //     orderCount: 0,
        //     totalOrderValue: 0,
        //     phone: creation.data.phone,
        //     email: creation.data.email
        // }

        // newClientAction(newClient);
        // navigate.navigate('Clients', {screen: 'clients'})
    }

    const handleNewProduct = () => {
        setProductModal(true);
    }
    const handleSelectProduct = (newProduct: any) => {
        const selectedProduct = {
            id: newProduct.id,
            name: newProduct.name,
            quantity: 1,
            value: newProduct.value 
        }
        setProductsList((prevProducts: any) => prevProducts.filter((product: any) => product.id !== newProduct.id));
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
        setSelectedProducts(products)
        setProductsList([...productsList, ...product]);
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

    }

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.measure((x, y, width, height, pageX, pageY) => {
                setScrollViewHeight(height);
            });
        }
    }, [productsList]);



    return (
        <>
            <MessageDisplay />
            <ScrollView style={styles.page}>
                <View style={styles.inputsDisplay}>
                    <InputPicker
                        label="Cliente"
                        values={clientsList}
                        selected={clientId}
                        onSelect={(value) => handleSetClient(value)}
                        createOption={"Novo cliente"}
                    />
                    <View >
                        <Text>entrega: 15/02/2024</Text>
                    </View>
                    <View style={styles.products}>
                        <Text style={styles.productsTitle}>Produtos:</Text>
                        {selectedProducts.map((el: any, key: number) => (
                            <ProductListItem key={key} name={el.name} 
                                price={el.value} 
                                removeItem={()=>removeProduct(el.id)} 
                                changeProductQuantity={(increase: boolean)=>changeProductQuantity(el.id, increase)}   
                                setProductQuantity={(quantity: number)=>handleSetQuantity(el.id, quantity)}
                            />
                        ))}
                        <TouchableHighlight style={styles.newProduct}
                            underlayColor={COLORS.primaryPressed} onPress={() => { handleNewProduct() }}>
                            <Text style={styles.newProductText}>+ Novo produto</Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <Text>Total: R${totalSum.toFixed(2).replace('.',',')}</Text>
                    </View>
                    <View style={styles.createButton}>
                        <CreateButton text={'Criar pedido'} action={handleCreate} />
                    </View>
                </View>
            </ScrollView>
            {(productModal && productsList.length > 0) && (
                <Modal
                    transparent={true}
                    visible={productModal}
                    onRequestClose={() => setProductModal(false)}
                >
                    <TouchableOpacity style={styles.modal} onPress={() => setProductModal(false)} activeOpacity={1}>
                        <View style={styles.productModalContainer}>
                            <ScrollView style={[styles.productModal, { maxHeight: scrollViewHeight || 500 }]}>
                                <View ref={contentRef}>
                                    {productsList.map((el: any, key: number) => (
                                        <TouchableHighlight style={styles.productItem}
                                            key={key}
                                            underlayColor={COLORS.grayScalePrimary}
                                            onPress={() => { handleSelectProduct(el) }}>
                                            <Text style={styles.productItemText}>{el.name}</Text>
                                        </TouchableHighlight>
                                    ))}
                                </View>
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
    newClientAction: (payload: any) => dispatch(newClient(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewClient)
