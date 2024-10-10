import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { COLORS, SIZES } from '../constants/theme';
import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo';
import ScreenHeaderProfile from '../components/common/header/ScreenHeaderProfile';
import images from '../constants/images';
import BrainWareChallengesResume from '../components/home/BrainwareChallengesResume/BrainwareChallengesResume';
import BrainWareBitacoreList from '../components/home/Brainware_bitacor_list/BrainWareBitacoreList';
import MainFooter from '../components/common/footer/MainFooter';
import { Stack } from 'expo-router';
import MainHeader from '../components/common/header/MainHeader';
import TeamLister from '../components/TeamLister';
import BarChartExample from '../components/common/graphs/barChart/BarChart';
import VerticalBarChart from '../components/common/graphs/barChart/VerticalBarChar';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalSelector from 'react-native-modal-selector';

const Stats = () => {
    console.log("Hola home");
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [challengeProgress, setChallengeProgress] = useState(null);
    const [ruleProgress, setRuleProgress] = useState({
        labels: [],
        datasets: [{ data: [] }],
    });
    

    useEffect(() => {
        const getToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('accessToken');
                const storedUsername = await AsyncStorage.getItem('userId');

                if (storedToken) {
                    setUser(storedUsername);
                }
            } catch (error) {
                console.log('Error retrieving token:', error);
            }
        };
        getToken();
    }, []);

    // useEffect(() => {
    //     const fetchChallenges = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:9090/api/challenges');
    //             const filteredChallenges = response.data.filter(challenge => challenge.userId === user);
    //             setChallenges(filteredChallenges);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching challenges:', error);
    //             setError('Error fetching challenges');
    //             setLoading(false);
    //         }
    //     };

    //     fetchChallenges();
    // }, [user]);
    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/challenges`);
                const filteredChallenges = response.data.filter(challenge => challenge.userId === user);

                // Group challenges by title and keep the most recent one
                const challengesMap = filteredChallenges.reduce((acc, challenge) => {
                    const existingChallenge = acc[challenge.title];
                    if (!existingChallenge || new Date(challenge.startDate) > new Date(existingChallenge.startDate)) {
                        acc[challenge.title] = challenge;
                    }
                    return acc;
                }, {});

                const mostRecentChallenges = Object.values(challengesMap);

                setChallenges(mostRecentChallenges);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching challenges:', error);
                setError('Error fetching challenges');
                setLoading(false);
            }
        };

        fetchChallenges();
    }, [user]);

    useEffect(() => {
        const fetchChallengeProgress = async () => {
            if (selectedChallenge) {
                try {
                    const response = await axios.get(`http://localhost:9090/api/analisis/challengeProgress?challengeId=${selectedChallenge.key}`);
                    setChallengeProgress(response.data);
                    console.log('Challenge Progress:', response.data);
                } catch (error) {
                    console.error('Error fetching challenge progress:', error);
                }
            }
        };

        fetchChallengeProgress();
    }, [selectedChallenge]);

    useEffect(() => {
        const fetchRuleProgress = async () => {
            if (selectedChallenge) {
                try {
                    const response = await axios.get(`http://localhost:9090/api/analisis/ruleProgress?challengeId=${selectedChallenge.key}`);
                    const progressData = response.data;
                    
                    // Transform the response data into the required format
                    const labels = progressData.map(item => item.description);
                    const data = progressData.map(item => item.accomplishmentPercentage);
    
                    setRuleProgress({
                        labels: labels,
                        datasets: [{ data: data }],
                    });
                    
                    console.log('Rule Progress:', progressData);
                } catch (error) {
                    console.error('Error fetching rule progress:', error);
                }
            }
        };
    
        fetchRuleProgress();
    }, [selectedChallenge]);
    


    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Stack.Screen
                    options={{
                        autoHideHomeIndicator: true,
                        header: () => (
                            <View style={{ minHeight: 100, margin: 0, paddingTop: 70, alignItems: 'center', backgroundColor: COLORS.lightWhite }}>
                                <View style={{ justifyContent: 'space-between', flexDirection: "row", width: "92%" }}>
                                    <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />
                                    <ScreenHeaderProfile imageUrl={"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} dimension='100%' />
                                </View>
                            </View>
                        )
                    }}
                />
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Stack.Screen
                    options={{
                        autoHideHomeIndicator: true,
                        header: () => (
                            <View style={{ minHeight: 100, margin: 0, paddingTop: 70, alignItems: 'center', backgroundColor: COLORS.lightWhite }}>
                                <View style={{ justifyContent: 'space-between', flexDirection: "row", width: "92%" }}>
                                    <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />
                                    <ScreenHeaderProfile imageUrl={"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} dimension='100%' />
                                </View>
                            </View>
                        )
                    }}
                />
                <Text>{error}</Text>
            </SafeAreaView>
        );
    }

    const challengeOptions = challenges.map(challenge => ({
        key: challenge._id,
        label: challenge.title,
    }));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    autoHideHomeIndicator: true,
                    header: () => (
                        <MainHeader />
                    )
                }}
            />
            <ScrollView style={{ paddingLeft: SIZES.large }}>
                <Text style={{
                    color: COLORS.DarkBlue,
                    alignItems: "center",
                    justifyContent: "center",
                    display: 'flex',
                    marginTop: SIZES.xLarge * 1.5,
                    marginBottom: SIZES.small
                }}>
                    <Icon name='info-circle' size={20} color={COLORS.secondary} /> Secciona el desafío que quieres medir
                </Text>
                <ModalSelector
                    data={challengeOptions}
                    initValue="Seleccionar Desafio"
                    onChange={(option) => setSelectedChallenge(option)}
                    style={styles.selector}
                    initValueTextStyle={styles.initValueTextStyle}
                    selectTextStyle={styles.selectTextStyle}
                >
                    <TouchableOpacity>
                        <Text style={{
                            fontSize: 32,
                            color: COLORS.primary,
                            fontWeight: 600,
                            marginBottom: SIZES.large
                        }}>
                            { 'Desafio'} <Icon name='chevron-down' size={28} color={COLORS.gray} />
                        </Text>
                    </TouchableOpacity>
                </ModalSelector>
                <Text style={{
                    fontSize: SIZES.large,
                    color: COLORS.primary,
                    fontWeight: 300,
                    marginBottom: SIZES.large
                }}>
                    {selectedChallenge? selectedChallenge.label:'Seleccione un desafio'}
                </Text>

                <ScrollView style={{ marginBottom: 60 }} showsVerticalScrollIndicator={false}>
                    <BarChartExample  dataAssets={challengeProgress}/>
                    <VerticalBarChart  dataAssets={ruleProgress}/>
                </ScrollView>
            </ScrollView>
            <View style={{ position: "absolute", backgroundColor: COLORS.lightWhite, bottom: 0, paddingVertical: 20 }}>
                <MainFooter home={true} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    selector: {
        width: '100%',
    },
    initValueTextStyle: {
        color: COLORS.gray,
        fontSize: 16,
    },
    selectTextStyle: {
        color: COLORS.primary,
        fontSize: 18,
    },
});

export default Stats;
