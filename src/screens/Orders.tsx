import { SafeAreaView, Text, View } from "react-native";
import {styles} from '../styles/screen.Orders'
import SearchInput from "../components/SearchInput";
import OptionsList from "../components/OptionsList";

export const OrdersScreen = ()=>(
    <SafeAreaView style={styles.page}>
        <SearchInput />
        <View>
            <OptionsList options={["Todas"]}/>
        </View>
        <Text>Home</Text>
    </SafeAreaView>
)