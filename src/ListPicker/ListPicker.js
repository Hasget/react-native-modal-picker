import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Button
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';

const ListPicker = ({
    items,
    defaultValue,
    placeholder,
    mode,
    onChange,
    disabled,
    loading,
    spinnerSize,
    spinnerColor,
    androidStyle,
    iosStyle,
    placeholderStyle,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [itemValue, setItemValue] = useState('');
    const [tempValue, setTempValue] = useState('');

    useEffect(() => {
        if (defaultValue) {
            setTempValue(defaultValue);
            setItemValue(defaultValue);
        }
    }, []);

    const pressDone = () => {
        setItemValue(tempValue);
        onChange(tempValue);
        setModalVisible(false);
    };

    const pressCancel = () => {
        setTempValue(itemValue);
        setModalVisible(false);
    };

    const select = (value) => {
        setItemValue(value);
        onChange(value)
    }

    const renderIosPicker = () => {
        return (
            <Picker
                style={styles.picker}
                selectedValue={tempValue}
                onValueChange={(value, index) =>
                    setTempValue(value)
                }>
                <Picker.Item label={placeholder} value='' color='#707070' />
                {
                    items !== undefined
                        ?
                        items.map(item => {
                            return <Picker.Item label={item.label} value={item.value} key={item.key || item.label} />
                        })
                        :
                        null
                }
            </Picker>
        );
    };

    const render = () => {
        if(Platform.OS === 'ios'){
            return (
                <View>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        style={{...styles.container, ...styles.iosContainer, ...iosStyle}}
                        disabled={disabled}
                    >
                        {
                            itemValue
                            ?
                            <Text>{items.find(i => i.value === itemValue).label}</Text>
                            :
                            <Text style={{...styles.placeholder, ...placeholderStyle}}>{placeholder ? placeholder : ''}</Text>
                        }

                    </TouchableOpacity>

                    {
                        loading
                            ?
                            <View style={{
                                ...styles.spinner,
                                backgroundColor: styles.container.backgroundColor,
                            }}>
                                <ActivityIndicator size={spinnerSize ? spinnerSize : 'small'} color={spinnerColor ? spinnerColor : '#005fe5'}/>
                            </View>
                            : null
                    }

                    <Modal
                        isVisible={modalVisible}
                        style={styles.modal}
                        backdropOpacity={0.3}>
                        <View style={styles.modalContainer}>
                            <View
                                style={styles.pickerHeaderContainer}>
                                <TouchableOpacity onPress={() => pressCancel(false)}>
                                    <Text style={styles.cancelText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>

                                <View style={styles.doneButton}>
                                    <Button
                                        onPress={() => pressDone(false)}
                                        title="Done"
                                    />
                                </View>
                            </View>

                            <View
                                style={styles.pickerContainer}>
                                {renderIosPicker()}
                            </View>
                        </View>
                    </Modal>
                </View>
            );
        }

        if(Platform.OS === 'android'){
            return (
                <View style={{...styles.container, ...androidStyle}}>
                    <Picker
                        style={styles.picker}
                        selectedValue={itemValue}
                        mode={mode ? mode : 'dialog'}
                        enabled={!disabled}
                        onValueChange={(value, index) =>
                            select(value)
                    }>
                        <Picker.Item label={placeholder} value='' color='#707070' />
                        {
                            items !== undefined
                            ?
                            items.map(item => {
                                return <Picker.Item label={item.label} value={item.value} key={item.key || item.label} />
                            })
                            :
                            null
                        }
                    </Picker>
                    {
                        loading
                        ?
                        <View style={{
                            ...styles.spinner,
                            backgroundColor: styles.container.backgroundColor,
                        }}>
                            <ActivityIndicator size={spinnerSize ? spinnerSize : 'small'} color={spinnerColor ? spinnerColor : '#005fe5'}/>
                        </View>
                        : null
                    }

                </View>
            );
        }
    }
    
    return render();
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        height: 48,
        borderRadius: 4,
        position: 'relative'
    },
    iosContainer: {
        justifyContent: "center",
    },
    picker: {
        height: 48,
        width: '100%'
    },
    spinner: {
        position: 'absolute',
        right: 15,
        top: 14,
    },
    placeholder: {
        color: '#666'
    },
    modal: {
        margin: 0,
    },
    modalContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    pickerHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
        width: '100%',
        borderColor: '#7D7D7D',
        borderBottomWidth: 1,
    },
    pickerContainer: {
        height: 250,
        width: '100%',
    },
    doneButton: {
        marginRight: 7,
    },
    doneText: {
        fontFamily: 'System',
        color: '#007AFF',
        fontWeight: '600',
        fontSize: 17,
        marginRight: 16,
    },
    cancelText: {
        fontFamily: 'System',
        color: '#007AFF',
        fontWeight: '400',
        fontSize: 17,
        marginLeft: 16,
    },
});

export default ListPicker;