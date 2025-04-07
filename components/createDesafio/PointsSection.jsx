import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { COLORS } from "../../constants/theme";

const BrainWarePointSection = ({ behaviors, onPercentageChange, onContinue }) => {

    const getTotalPercentageUsed = () => {
        let total = 0;
        behaviors.forEach((behavior) => {
            if (behavior.points && !isNaN(behavior.points)) {
                total += parseFloat(behavior.points);
            }
        });
        return total;
    };

    return (
        <View style={styles.containerDesafio}>
            <Text style={styles.title}>PONDERACIÓN</Text>
            <Text style={styles.parrcenter}>Recuerda dar la ponderacion mas alta al comportamiento que representa tu mayor desafio.</Text>

            <View style={styles.container}>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>{getTotalPercentageUsed()} / 100</Text>
                    <Text style={styles.parr}>% utilizado</Text>
                </View>
            </View>
            <View style={styles.container}>
                <ScrollView style={styles.list}>
                    {behaviors.map((behavior, index) => (
                        <View style={styles.listComponent} key={index}>
                            <View style={{ flexDirection: "row", alignItems: 'center', maxWidth: "76%" }}>
                                <Text style={styles.parr}>{index + 1}. </Text>
                                <Text style={styles.parr}>{behavior.name}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={behavior.points}
                                    onChangeText={(value) => onPercentageChange(index, value)}
                                />
                                <Text style={styles.parr}> %</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    },
    textInput: {
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 0,
        width: 50,
        textAlign: "center",
        color: COLORS.white
    },
    continueButton: {
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20
    },
    continueButtonText: {
        color: COLORS.white,
        fontSize: 18
    }
});

export default BrainWarePointSection;
