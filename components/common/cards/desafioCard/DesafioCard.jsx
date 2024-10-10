import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./DesafioCard.styles";
import { useRouter } from 'expo-router';
import axios from 'axios';

const DesafioCard = ({ allChallenge, title, description, progress, imageUrl, id, ciclo }) => {
    const router = useRouter();
    const [progressCycle, setProgressCycle] = useState(null);
    const [today, setToday] = useState(Date.now());

    const handlePress = () => {
        router.push({ pathname: `/bitacora`, params: { id } });
    };
    
    const handleUpdate = () => {
        router.push({ pathname: `/preguntas`, params: { id: id, challengeData: allChallenge, challengeTitle: title, ciclo: ciclo } });
    };

    useEffect(() => {
        const fetchProgressCycle = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/analisis/${id}/progress`);
                const data = response?.data?.progressPercentage;
                setProgressCycle(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProgressCycle();
    }, [id]);

    const endDateTimestamp = new Date(allChallenge.endDate).getTime();
    const isChallengeEnded = endDateTimestamp <= today;

    return (
        <TouchableOpacity onPress={isChallengeEnded ? handleUpdate : handlePress}>
            <View style={styles.container}>
                <Image style={styles.img} source={{ uri: imageUrl }} />
                <Text style={styles.title}>Desafio:</Text>
                <Text style={styles.parr}>{title}</Text>
                {isChallengeEnded?(<View/>):(<><Text style={styles.title}>Comportamientos:</Text>
                    <Text style={styles.parr}>{progress}</Text>
                    <Text style={styles.title}>Ciclo:</Text>
                <Text style={styles.parr}>{progressCycle}%</Text>
                    </>)}
                
                {isChallengeEnded && (
                    <TouchableOpacity onPress={handleUpdate} style={styles.btn}><Text style={styles.btnTitle}>Evaluar</Text></TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default DesafioCard;
 