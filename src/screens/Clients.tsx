import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from '../styles/screen.Clients';
import { useNavigation } from '@react-navigation/native';
import { Client } from '../types/Client';
import { User } from '../types/User';
import { connect } from 'react-redux';
import { RootState } from '../store';
import SearchInput from '../components/SearchInput';
import OptionItem from '../components/OptionItem';
import ClientItem from '../components/ClientItem';
import { remainingTimeFrom } from '../util/transform';
import { sortClients } from '../util/sorter';
import { HorizontalLine } from '../components/HorizontalLine';
import useClients from '../hooks/useClients'; // Adjust the import based on your file structure
import { Dispatch } from 'redux';
import { setClients } from '../reducers/clientsReducer';
import LoadingPage from '../components/LoadingPage';
import useMessage from '../hooks/useMessage';

type Props = {
    user: User,
    clients: Client[],
    setClientsAction: (payload: any[]) => void
};

const ClientsScreen = ({ user, clients, setClientsAction }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigation() as any;
    const [clientsList, setClientsList] = useState<Client[]>([]);
    const options = ['Todos', 'Com pedidos', 'Sem pedidos'];
    const [activeKey, setActiveKey] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { MessageDisplay, setMessageWithTimer } = useMessage();


    const fetchedClients = useClients(user.id);

    useEffect(() => {
        const sortedClients = sortClients(fetchedClients);
        setClientsList(sortedClients);
        setLoading(false);
    }, [fetchedClients]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleCategorySelect = (category: string, key: number) => {
        setSelectedCategory(category === 'Todos' ? null : category);
        setActiveKey(key);
    };

    const handleNavigate = (url: string, id: number) => {
        navigate.navigate(url, { id });
    };

    const search = (value: string) => {
        let clientsFiltered = clients.filter((el) => el.name.toLowerCase().includes(value.toLowerCase()));
        setClientsList(clientsFiltered);
    };

    const completeSearch = () => {
        // Logic for completing search
    };

    const filteredClientsWithOrders = clientsList.filter(client => client.orderCount > 0);
    const filteredClientsWithoutOrders = clientsList.filter(client => client.orderCount === 0);

    return (
        <>
            <MessageDisplay />
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalBackground} />
            </TouchableWithoutFeedback>
            <SearchInput onChange={search} onSearch={completeSearch} />
            <View>
                <ScrollView horizontal={true} style={styles.options} showsHorizontalScrollIndicator={false}>
                    {options.map((option, key) => (
                        <OptionItem
                            key={key}
                            option={option}
                            handleActive={() => handleCategorySelect(option, key)}
                            active={activeKey === key}
                        />
                    ))}
                </ScrollView>
            </View>
            <HorizontalLine />
            {loading &&
                <LoadingPage />
            }

            <ScrollView style={styles.scroll}>
                <View style={styles.scrollView}>
                    {activeKey !== 2 && filteredClientsWithOrders.length > 0 && (
                        <>
                            <Text style={styles.separator}>Com Pedidos</Text>
                            {filteredClientsWithOrders.map((client: Client, key) => (
                                <ClientItem
                                    key={key}
                                    id={client.id}
                                    name={client.name}
                                    phone={client.phone}
                                    orderCount={client.orderCount}
                                    totalOrderValue={client.totalOrderValue}
                                    nextDeliveryDate={remainingTimeFrom(client.nextDeliveryDate)}
                                    onPress={() => handleNavigate('client', client.id)}
                                    setError={(error)=>setMessageWithTimer(error, 'error')}
                                />
                            ))}
                        </>
                    )}
                    <HorizontalLine />
                    {activeKey !== 1 && filteredClientsWithoutOrders.length > 0 && (
                        <>
                            <Text style={styles.separator}>Sem Pedidos</Text>
                            {filteredClientsWithoutOrders.map((client: Client, key) => (
                                <ClientItem
                                    key={key}
                                    id={client.id}
                                    name={client.name}
                                    phone={client.phone}
                                    orderCount={client.orderCount}
                                    totalOrderValue={client.totalOrderValue}
                                    nextDeliveryDate={remainingTimeFrom(client.nextDeliveryDate)}
                                    onPress={() => handleNavigate('client', client.id)}
                                    setError={(error)=>setMessageWithTimer(error, 'error')}
                                />
                            ))}
                        </>
                    )}
                    {filteredClientsWithOrders.length === 0 && filteredClientsWithoutOrders.length === 0 && (
                        <Text style={styles.messageNoRegister}>Nenhum cliente encontrado</Text>
                    )}
                </View>
            </ScrollView>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
    clients: state.clientsReducer.clients
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setClientsAction: (payload: any) => dispatch(setClients(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsScreen);
