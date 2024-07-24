import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import {styles} from '../styles/screen.NewProduct'
import InputEdit from "../components/InputEdit"
import { useState } from "react"
import CreateButton from "../components/CreateButton"
import useMessage from "../hooks/useMessage"
import { RootState } from "../store"
import { User } from "../types/User"
import { connect } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Dispatch } from "redux"
import { HeaderCreation } from "../components/HeaderCreation"
import { createCategory } from "../services/Categories"
import { newCategory } from "../reducers/categoriesReducer"


type Props = {
    user: User,
    newCategoryAction: (payload: any)=>void
}

const NewCategory = ({user, newCategoryAction}: Props)=>{
    const [description, setDescription] = useState('');
    const {MessageDisplay, setMessageWithTimer} = useMessage();
    const navigate = useNavigation() as any

    const handleCreate = async ()=>{
        if(description.length < 3 || description.length > 30) return setMessageWithTimer('Categoria deve ter entre 3 e 30 caractéres', 'error')

        const creation: any = await createCategory({userId: user.id, description});
        if(creation.status !== 200){
            return setMessageWithTimer(creation.data.message, 'error')
        } 
        newCategoryAction({id: creation.data.id, description: creation.data.description});
        navigate.goBack()
    }

    const handleNavigate = (url: string)=>{
        navigate.navigate(url)
    }

    return (
        <>
        <MessageDisplay />
        <ScrollView style={styles.page}>
            <HeaderCreation url="categories" title="Crie uma categoria"/>
            <View style={styles.inputsDisplay}>
                <InputEdit
                    label="Descrição" 
                    value={description} 
                    onChange={(value: string)=>{
                        setDescription(value) 
                    }}/>

                <CreateButton text={'Criar categoria'} action={handleCreate}/>
            </View> 
        </ScrollView>
        </>

    )
}

const mapStateToProps = (state: RootState)=>({
    user: state.userReducer.user
}) 

const mapDispatchToProps = (dispatch: Dispatch)=>({
    newCategoryAction: (payload: any)=> dispatch(newCategory(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewCategory)