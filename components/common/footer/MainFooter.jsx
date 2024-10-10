import React from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../../constants/theme";
import styles from "./MainFooter.styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const MainFooter = ({home}) => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/createDesafio'); 
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnContainer} onPress={()=>router.push("/equipo")}>
                <View style={styles.normal}>
                    <Icon name="users" size={40} color={COLORS.secondary} />
                </View>
                <Text style={styles.title}>Equipo</Text>
            </TouchableOpacity>
            {home === true?(
                <TouchableOpacity style={styles.btnContainer} onPress={()=>router.push("/home")}>
                    <View style={styles.normal}>
                        <Icon name="home" size={50} color={COLORS.secondary} />
                    </View>
                    <Text style={styles.title}>Home</Text>
                </TouchableOpacity>
            ):(
                <TouchableOpacity style={styles.btnContainer} onPress={handleNavigate}>
                    <View style={styles.shadow}>
                        <Icon name="plus" size={40} color={COLORS.secondary} />
                    </View>
                    <Text style={styles.title}>Desafio</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.btnContainer} onPress={()=>router.push("/estadisticas")}>
                <View style={styles.normal}>
                    <Icon name="signal" size={40} color={COLORS.secondary} />
                </View>
                <Text style={styles.title}>Estadisticas</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MainFooter;
