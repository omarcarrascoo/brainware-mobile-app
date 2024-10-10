

// // BrainWareChallengesResume.js
// import React from 'react';
// import { Text, View } from 'react-native';
// import styles from './BrainwareChallengesResume.style';

// const BrainWareChallengeCount = ({ challenges }) =>{
//     // Get today's date in ISO string without time
//     const todayDate = new Date().toISOString().slice(0, 10);

//     // Calculate the total number of rules completed today across all challenges
//     const totalCompletedRulesToday = challenges.reduce((total, challenge) => {
//         // Filter progress for today's date
//         const progressToday = challenge.progress.filter(progress => progress.date.slice(0, 10) === todayDate);
//         // Sum the number of completed rules for each progress entry
//         const completedRulesToday = progressToday.reduce((acc, progress) => acc + progress.completedRules.length, 0);
//         return total + completedRulesToday;
//     }, 0);

//     // Calculate the total number of rules for each challenge
//     const totalRulesPerChallenge = challenges.map(challenge => challenge.rules.length);

//     // Sum up the total number of rules for all challenges
//     const totalRulesAllChallenges = totalRulesPerChallenge.reduce((total, rules) => total + rules, 0);

//     return(
//         <View style={styles.counter}>
//             <Text style={styles.count}>{totalCompletedRulesToday} / {totalRulesAllChallenges}</Text>
//         </View>
//     )
// }

// export default BrainWareChallengeCount;




// BrainWareChallengesResume.js
import React from 'react';
import { Text, View } from 'react-native';
import styles from './BrainwareChallengesResume.style';

const BrainWareChallengeCount = ({ challenges, userId }) => {
    // Get today's date in ISO string without time
    const todayDate = new Date().toISOString().slice(0, 10);

    // Calculate the total number of rules completed today across all challenges
    const totalCompletedRulesToday = challenges.reduce((total, challenge) => {
        // Filter progress for today's date
        const progressToday = challenge.progress.filter(progress => progress.date.slice(0, 10) === todayDate);
        // Sum the number of completed rules (HECHO or NA) for each progress entry
        const completedRulesToday = progressToday.reduce((acc, progress) => {
            // Filter rules based on their status
            const validRules = progress.completedRules.filter(rule => rule.status === 'HECHO' || rule.status === 'NA');
            return acc + validRules.length;
        }, 0);
        return total + completedRulesToday;
    }, 0);

    // Calculate the total number of rules for each challenge
    const totalRulesPerChallenge = challenges.map(challenge => challenge.rules.length);

    // Sum up the total number of rules for all challenges
    const totalRulesAllChallenges = totalRulesPerChallenge.reduce((total, rules) => total + rules, 0);

    return (
        <View style={styles.counter}>
            <Text style={styles.count}>{totalCompletedRulesToday} / {totalRulesAllChallenges}</Text>
        </View>
    );
};

export default BrainWareChallengeCount;
