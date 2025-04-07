import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from "../../constants/theme";
import images from "../../constants/images";

const BrainWareCreateDesafio = ({ onTitleChange, onDateChange, setedDate, setedTitle, cycle }) => {
    const [date, setDate] = useState(new Date(setedDate));
    const [show, setShow] = useState(false);

    const handleTextChange = (newText) => {
        onTitleChange(newText);
    };

    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 20);
    console.log(today);
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        onDateChange(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };
    console.log(cycle);
    
    if (cycle) {
        useEffect(()=>{
            onTitleChange(cycle)
        },[])
        return (
            <View style={styles.containerDesafio}>
                <Text style={styles.title}>CREAR CICLO</Text>
                <Text style={styles.parrcenter}>UN DESAFIO ES ALGO QUE TE RETA A SER MEJOR Y ESTO ES SOLO UN TEXTO DE RELLENO</Text>
    
                <View style={styles.container}>
                    <Text style={styles.subTitle}>Desafio</Text>
                    <Text style={styles.parr}>{cycle}</Text>
                </View>
    
                <View style={styles.container}>
                    <Text style={styles.subTitle}>Fecha de finalizacion</Text>
                    {Platform.OS === 'android' && (
                        <Button onPress={showDatepicker} title="Seleccionar fecha" />
                    )}
                    {(show || Platform.OS === 'ios') && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="spinner"
                            onChange={onChange}
                            textColor="#fff"
                            minimumDate={today}
                            maximumDate={maxDate}
                        />
                    )}
                </View>
                <View style={styles.container}>
                    <Text style={styles.subTitle}>Imagen</Text>
                    <Text style={styles.parr}>Agrega una imagen para que sea fácil identificarlo en el panel</Text>
                    <TouchableOpacity onPress={() => console.log("imagen")}>
                        <Image
                            source={images.imageUp}
                            resizeMode='contain'
                            style={styles.logImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.containerDesafio}>
                <Text style={styles.title}>CREAR DESAFIO</Text>
                <Text style={styles.parrcenter}>UN DESAFIO ES ALGO QUE TE RETA A SER MEJOR Y ESTO ES SOLO UN TEXTO DE RELLENO</Text>
    
                <View style={styles.container}>
                    <Text style={styles.subTitle}>Desafio</Text>
                    <Text style={styles.parr}>Escribe acerca de tu desafio... </Text>
                    <Text style={styles.parr}>Ej. Tener mayor participación en las juntas del trabajo</Text>
                    <TextInput
                        style={styles.textArea}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Escribe acerca de tu desafio... Ej. Tener mayor participación en las juntas del trabajo"
                        value={setedTitle}
                        onChangeText={handleTextChange}
                    />
                </View>
    
                <View style={styles.container}>
                    <Text style={styles.subTitle}>Fecha de finalizacion</Text>
                    <Text style={styles.parr}>No puede ser mayor a 20 dias </Text>
                    {Platform.OS === 'android' && (
                        <Button onPress={showDatepicker} title="Seleccionar fecha" />
                    )}
                    {(show || Platform.OS === 'ios') && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="spinner"
                            onChange={onChange}
                            textColor="#fff"
                            minimumDate={today}
                            maximumDate={maxDate}
                        />
                    )}
                </View>
                <View style={styles.container}>
                    <Text style={styles.subTitle}>Imagen</Text>
                    <Text style={styles.parr}>Agrega una imagen para que sea fácil identificarlo en el panel</Text>
                    <TouchableOpacity onPress={() => console.log("imagen")}>
                        <Image
                            source={images.imageUp}
                            resizeMode='contain'
                            style={styles.logImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subTitle: {
        color: COLORS.white,
        fontSize: 22,
        marginBottom: 5
    },
    containerDate: {
        width: "100%",
        backgroundColor: COLORS.white,
        minHeight: 28,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 8,
        borderRadius: 5
    },
    textArea: {
        height: 120,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
        borderRadius: 5,
        color: COLORS.white,
        width:"100%"
    },
    logImage: {
        maxWidth: "100%",
        height: 180
    },
    title: {
        color: COLORS.white,
        fontSize: 32,
        textAlign: "center"
    },
    parrcenter: {
        textAlign: "center",
        color: COLORS.white,
        fontSize: 14,
        marginBottom: 35
    },
    parr: {
        color: COLORS.white,
        fontSize: 14,
        marginBottom: 5
    },
    container: {
        marginBottom: 20,
        alignItems:"flex-start"
    }
});

export default BrainWareCreateDesafio;
