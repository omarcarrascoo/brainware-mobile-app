import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from "../../constants/theme";

const BrainWareCompSection = ({ behaviors, onAddBehavior, onDeleteBehavior }) => {
    const [text, setText] = useState('');
    console.log("Hola comportamientos");
    const handleAddBehavior = () => {
        if (text.trim() !== '') {
            if (behaviors.length >= 7) {
                // Maximum limit reached, show alert message
                Alert.alert(
                    'Limit Exceeded',
                    'You can only add up to 7 behaviors.',
                    [{ text: 'OK', onPress: () => {} }]
                );
            } else {
                onAddBehavior(text.trim());
                setText(''); // Clear input after adding behavior
            }
        }
    };
    return (
        <View style={styles.containerDesafio}>
            <Text style={styles.title}>COMPORTAMIENTOS</Text>
            <Text style={styles.parrcenter}>ANOTA LOS COMPORTAMIENTOS QUE TE AYUDARAN A CUMPLIR TU DESAFIO</Text>

            <View style={styles.container}>
                <Text style={styles.subTitle}>NUEVO COMPORTAMIENTO</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Escribe acerca de tu desafio... Ej. Tener mayor participación en las juntas del trabajo"
                        value={text}
                        onChangeText={setText}
                    />
                    <TouchableOpacity style={styles.btnContainer} onPress={handleAddBehavior}>
                        <View style={styles.shadow}>
                            <Icon name="plus" size={30} color={COLORS.primary} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.container}>
                <ScrollView style={styles.list}>
                {behaviors.map((behavior, index) => (
                    <View style={styles.listComponent} key={index}>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Text style={styles.parr}>{index + 1}.</Text>
                            <Text style={styles.parr}>{behavior}</Text>
                        </View>
                        <TouchableOpacity onPress={() => onDeleteBehavior(index)}>
                            <Icon name="trash" size={30} color={COLORS.tertiary} />
                        </TouchableOpacity>
                    </View>
                ))}

                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    subTitle: {
        color: COLORS.white,
        fontSize: 22,
        marginBottom: 5
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        width: "84%",
        marginRight: 10,
        padding: 10,
        color: COLORS.white
    },
    shadow: {
        backgroundColor: COLORS.secondary,
        width: 45,
        height: 45,
        borderRadius: 26,
        alignItems: "center",
        justifyContent: "center"
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
        fontSize: 16,
        marginBottom: 8
    },
    container: {
        marginBottom: 20
    },
    listComponent: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});

export default BrainWareCompSection;
