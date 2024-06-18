import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./DesafioCard.styles";
import { useRouter } from 'expo-router';

const DesafioCard = ({ allChallenge, title, description, progress, imageUrl, id }) => {
    const router = useRouter();
    
    const handlePress = () => {
        router.push({pathname:`/bitacora`, params: { id }});
    };

    
    
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <Image
                    style={styles.img}
                    source={{ uri: imageUrl }}
                />
                <Text style={styles.title}>Desafio:</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.parr}>{description}</Text>
                <Text style={styles.title}>Comportamientos:</Text>
                <Text style={styles.parr}>{progress}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default DesafioCard;
