import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { COLORS, SIZES } from '../constants/theme';
import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo';
import ScreenHeaderProfile from '../components/common/header/ScreenHeaderProfile';
import images from '../constants/images';
import MainFooter from '../components/common/footer/MainFooter';
import { Stack } from 'expo-router';
import MainHeader from '../components/common/header/MainHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarChartExample from '../components/common/graphs/barChart/BarChart';
import VerticalBarChart from '../components/common/graphs/barChart/VerticalBarChar';
import DotGraph from '../components/common/graphs/barChart/DotGraph';

const Stats = () => {
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
    const [cycleStats, setCycleStats] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await axios.get(`https://administracionalpha.com/api/challenges`);
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
                    const response = await axios.get(`https://administracionalpha.com/api/analisis/challengeProgress?challengeId=${selectedChallenge.key}`);
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
                    const response = await axios.get(`https://administracionalpha.com/api/analisis/ruleProgress?challengeId=${selectedChallenge.key}`);
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

    useEffect(() => {
        const fetchCycleStats = async () => {
            if (selectedChallenge) {
                try {
                    const response = await axios.get(`https://administracionalpha.com/api/analisis/cycleStats?challengeId=${selectedChallenge.key}`);
                    const statsData = response.data;

                    // Transform the response data into the required format
                    const labels = statsData.map(item => `Ciclo ${item.ciclo}`);
                    const data = statsData.map(item => item.accomplishmentPercentage);

                    setCycleStats({
                        labels: labels,
                        datasets: [{ data: data }],
                    });

                    console.log('Cycle Stats:', statsData);
                } catch (error) {
                    console.error('Error fetching cycle stats:', error);
                }
            }
        };

        fetchCycleStats();
    }, [selectedChallenge]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const selectChallenge = (challenge) => {
        setSelectedChallenge(challenge);
        closeModal();
    };

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
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: SIZES.small, marginTop: SIZES.xLarge * 1.5, gap: 5 }}>
                <Icon name='info-circle' size={20} color={COLORS.secondary} />
                <Text style={{
                    color: COLORS.DarkBlue,
                    alignItems: "center",
                    justifyContent: "center",
                    display: 'flex',
                    
                    fontSize: 14
                }}>
                     Secciona el desafío que quieres medir
                </Text>
                </View>
                <TouchableOpacity onPress={openModal}>
                    <Text style={{
                        fontSize: 22,
                        color: COLORS.primary,
                        fontWeight: 600,
                        marginBottom: SIZES.large
                    }}>
                        { 'Seleccionar Desafio'} <Icon name='chevron-down' size={28} color={COLORS.gray} />
                    </Text>
                </TouchableOpacity>
                <Text style={{
                    fontSize: SIZES.large,
                    color: COLORS.primary,
                    fontWeight: 300,
                    marginBottom: SIZES.large
                }}>
                    {selectedChallenge ? selectedChallenge.label : 'Seleccione un desafio'}
                </Text>

                <ScrollView style={{ marginBottom: 60 }} showsVerticalScrollIndicator={false}>
                    <BarChartExample dataAssets={challengeProgress} />
                    <VerticalBarChart dataAssets={ruleProgress} />
                    <DotGraph dataAssets={cycleStats} /> 
                </ScrollView>
            </ScrollView>

            {/* Modal for Challenge Selection */}
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {challenges.map((challenge, index) => (
                            <Pressable
                                key={index}
                                style={styles.modalOption}
                                onPress={() => selectChallenge({ key: challenge._id, label: challenge.title })}
                            >
                                <Text style={styles.modalOptionText}>{challenge.title}</Text>
                            </Pressable>
                        ))}
                        <Pressable style={styles.modalCloseButton} onPress={closeModal}>
                            <Text style={styles.modalCloseButtonText}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={{ position: "absolute", backgroundColor: COLORS.lightWhite, bottom: 0, paddingVertical: 20 }}>
                <MainFooter home={true} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: COLORS.lightWhite,
        borderRadius: 10,
        padding: 20,
    },
    modalOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
    },
    modalOptionText: {
        fontSize: 18,
        color: COLORS.primary,
    },
    modalCloseButton: {
        marginTop: 10,
        padding: 15,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        fontSize: 18,
        color: COLORS.secondary,
    },
});

export default Stats;
