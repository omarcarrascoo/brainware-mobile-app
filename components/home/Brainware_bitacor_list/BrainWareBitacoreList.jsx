// BrainWareBitacoreList.js
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import DesafioCard from "../../common/cards/desafioCard/DesafioCard";
import styles from "./brainWareBitacoreList.styles";



const BrainWareBitacoreList = ({ challenges }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BITACORA DE MIS DESAFIOS</Text>
            <ScrollView horizontal>
                {challenges.map(challenge => (
                    
                        <DesafioCard
                        ciclo={challenge.ciclo}
                        allChallenge ={challenge}
                        key={challenge._id}
                        id={challenge._id}
                        title={challenge.title}
                        description={challenge.description}
                        progress={`${getCompletedRulesCount(challenge)}/${challenge.rules.length}`}
                        imageUrl={challenge.image}

                        />
                ))}
            </ScrollView>
        </View>
    );
}

// Function to calculate the number of completed rules for a challenge
const getCompletedRulesCount = (challenge) => {
    // Get today's date in ISO string without time
    const todayDate = new Date().toISOString().slice(0, 10);
    // Filter progress for today's date
    const progressToday = challenge.progress.filter(progress => progress.date.slice(0, 10) === todayDate);
    // Sum the number of completed rules for each progress entry
    const completedRulesCount = progressToday.reduce((total, progress) => total + progress.completedRules.length, 0);
    return completedRulesCount;
}

export default BrainWareBitacoreList;
