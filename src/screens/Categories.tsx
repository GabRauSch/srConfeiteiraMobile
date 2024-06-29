import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { styles } from "../styles/screen.Categories";
import { Picker } from "@react-native-picker/picker";
import { ReactNode, useCallback, useEffect, useState } from "react";
import InputEdit from "../components/InputEdit";
import { useRoute } from "@react-navigation/native";
import { getClientById, updateClient } from "../services/Clients";
import { Client } from "../types/Client";
import { connect } from "react-redux";
import { RootReducer } from "../reducers";
import AddButton from "../components/AddButton";
import CreateButton from "../components/CreateButton";
import useMessage from "../hooks/useMessage";
import { validateClientEdit } from "../util/validation";
import { handleResponse } from "../services/responseMapping";
import { Dispatch } from "redux";
import { setClientInfo } from "../reducers/clientsReducer";
import { setCategories } from "../reducers/categoriesReducer";
import { Category } from "../types/Category";
import { User } from "../types/User";
import { findCategories } from "../services/Categories";
import { HorizontalLine } from "../components/HorizontalLine";
import SearchInput from "../components/SearchInput";
import { COLORS } from "../styles/global";
import Icon from 'react-native-vector-icons/FontAwesome';


type Props = {
    categories: Category[],
    user: User,
    setCategoriesAction: (payload: any)=>void
}

const Categories = ({user, categories, setCategoriesAction}: Props) => {
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
    const route = useRoute();
    const { MessageDisplay, setMessageWithTimer } = useMessage();


    const person = require(`../assets/images/person.png`);

    const getData = async ()=>{
        const newCategories = await findCategories(user.id);
        if(newCategories.status)
        setCategoriesAction(newCategories.data)
        setCategoriesList(newCategories.data);
        setFilteredCategories(newCategories.data)
    }

    useEffect(() => {
        getData()
        
    }, [user.id]);

    useEffect(() => {
        setCategoriesList(categories);
    }, [categories]);

    const search = (value: string)=>{
        setFilteredCategories(categoriesList.filter((el)=>el.description.toLowerCase().includes(value.toLowerCase())))
    }

    

    return (
        <>
            <MessageDisplay />
            <View>
                <SearchInput onChange={search} onSearch={()=>{}} />
            </View>
            <HorizontalLine />
            <ScrollView style={styles.page}>
                <Text style={styles.separator} >Suas categorias</Text>
                <View style={styles.categories}>
                    {filteredCategories.map((el, key)=>(
                        <View style={styles.category} key={key}>
                            <>
                                <Text style={{fontSize: 16, flex: 1}}>{el.description}</Text>
                                <View style={styles.actions}>
                                    <View>
                                        <Icon name="pencil" color={COLORS.primary} size={17}/>
                                    </View>
                                    <View>
                                        <Icon name="trash" color={COLORS.primary} size={17}/>
                                    </View>
                                </View>
                            </>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

const mapStateToProps = (state: RootReducer)=>({
    categories: state.categoriesReducer.categories,
    user: state.userReducer.user
})

const mapDispatchToProps = (dispatch: Dispatch)=>({
    setCategoriesAction: (payload: any)=>dispatch(setCategories(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)