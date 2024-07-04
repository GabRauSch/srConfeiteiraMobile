import { Modal, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import {styles} from '../styles/component.InputPicker'
import { Picker } from '@react-native-picker/picker'
import { COLORS } from '../styles/global'
import { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductListItem from './ProductListItem';
import { Category } from '../types/Category';


type Props = {
    label: string,
    values: any[],
    selected: any,
    onSelect: (value: any)=>void,
    createOption?: string,
    dataType: string,
}  

const InputPicker = ({label, values, selected, onSelect, createOption, dataType }: Props)=>{
    const [pickerModal, setPickerModal] = useState(false);
    const contentRef = useRef<View>(null);
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [scrollViewHeight, setScrollViewHeight] = useState(0);
    const [selectedData, setSelectedData] = useState<any>()

    useEffect(()=>{
        setSelectedData(selected)
        setFilteredData(values)
    }, [values, selected])
    
    const search = (value: string)=>{
        let filteredData = values.filter((el)=> {
            return el.description.toLowerCase().includes(value.toLowerCase())
        }); 
        
        if(filteredData)
        setFilteredData(filteredData);
    }
    return (
        <View style={styles.productInfoItem}>
            {selected &&
                <TouchableOpacity style={styles.inputPicker} activeOpacity={1} onPress={()=>{setPickerModal(true)} }>
                    <Text>{selected.description}</Text>
                    <Icon name='arrow-down' color={COLORS.primary} />
                </TouchableOpacity>
            }
            <Modal
                    transparent={true}
                    visible={pickerModal}
                    onRequestClose={() => setPickerModal(false)}
                >
                    <TouchableOpacity style={styles.modal} onPress={() =>{search(''); setSearchValue(''); setPickerModal(false)}} activeOpacity={1}>
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
                                {filteredData.length > 0 ? (
                                    <View ref={contentRef}>
                                        {filteredData.map((el: any, key: number) => (
                                            <TouchableHighlight style={styles.productItem}
                                                key={key}
                                                underlayColor={COLORS.grayScalePrimary}
                                                onPress={() => { onSelect(el); setPickerModal(false) }}>
                                                <Text style={styles.productItemText}>{el.description}</Text>
                                            </TouchableHighlight>
                                        ))}
                                    </View>
                                ) : (
                                    <Text style={styles.noProducts}>Sem {dataType}</Text>
                                )}
                            </ScrollView>
                        </View>
                        <Text style={styles.closeModal}>Fechar</Text>
                    </TouchableOpacity>
                </Modal>
        </View>
    )
}

export default InputPicker