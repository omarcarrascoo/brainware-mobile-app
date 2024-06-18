import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../../constants/theme";
import styles from "./MainFooter.styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const MainFooter = () => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/createDesafio'); // Ensure the path is correct
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnContainer} onPress={handleNavigate}>
                <View style={styles.shadow}>
                    <Icon name="plus" size={40} color={COLORS.secondary} />
                </View>
                <Text style={styles.title}>Desafio</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MainFooter;
