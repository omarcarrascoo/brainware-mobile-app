import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
import icons from '../constants/icons';
import ScreenHeaderProfile from '../components/common/header/ScreenHeaderProfile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo';
import images from '../constants/images';
import MainHeader from '../components/common/header/MainHeader';

const Bitacora = () => {
    const router = useRouter();
    const localParams = useLocalSearchParams();
    const [challenge, setChallenge] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState(() => {
        return new Date().toISOString().slice(0, 10);
    });
    const [behaviors, setBehaviors] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);

    const statusOptions = [
        { label: 'NA', value: 'NA' },
        { label: 'HECHO', value: 'HECHO' },
        { label: 'FALLO', value: 'FALLO' }
    ];

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/challenges/${localParams.id}`);
                setChallenge(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching challenges:', error);
                setError('Error fetching challenges');
                setLoading(false);
            }
        };
        fetchChallenge();
    }, []);

    useEffect(() => {
        if (challenge.rules) {
            const progressForDate = challenge.progress?.find(progress => progress.date.slice(0, 10) === currentDate);
            const behaviorsWithStatus = challenge.rules.map(rule => {
                const completedRule = progressForDate?.completedRules.find(cr => cr.rule._id === rule._id);
                return {
                    ...rule,
                    status: completedRule?.status ? completedRule.status : "FALLO"
                };
            });
            setBehaviors(behaviorsWithStatus);
        }
    }, [challenge, currentDate]);

    const handleStatusChange = async (index, id, newValue) => {
        if (currentDate !== new Date().toISOString().slice(0, 10)) return;

        const updatedBehaviors = [...behaviors];
        updatedBehaviors[index].status = newValue;
        setBehaviors(updatedBehaviors);

        await axios.post(`http://localhost:9090/api/challenges/${localParams.id}/progress`, {
            date: currentDate,
            completedRules: updatedBehaviors,
            status: newValue
        }).then(response => {
            console.log('Progress updated successfully:', response.data);
        }).catch(error => {
            console.error('Error updating progress:', error);
        });

        if (newValue == "FALLO") {
            router.push({ pathname: `/preguntas`, params: { id: id, ruleStatus: newValue, challengeData: challenge, challengeTitle: challenge.title, ciclo: challenge.ciclo, date: new Date().toISOString().slice(0, 10) } });
        }
    };
    const handleNavigate = () => {
        router.back('/home');
    };

    const handleDateChange = (direction) => {
        const [year, month, day] = currentDate.split('-').map(Number);
        const newDate = new Date(year, month - 1, day);

        newDate.setDate(newDate.getDate() + direction);

        const today = new Date().toISOString().slice(0, 10);
        const newDateString = newDate.toISOString().slice(0, 10);

        if (!challenge.startDate || !challenge.endDate) {
            console.error('Start date or end date is not defined');
            return;
        }

        const startDateString = new Date(challenge.startDate).toISOString().slice(0, 10);
        const endDateString = new Date(challenge.endDate).toISOString().slice(0, 10);

        if (newDateString > today) return;
        if (newDateString > endDateString) return;
        if (newDateString < startDateString) return; 
       setCurrentDate(newDateString);
    };

    const isPrevDisabled = !challenge.startDate || currentDate <= new Date(challenge.startDate).toISOString().slice(0, 10);
    const isNextDisabled = !challenge.endDate || currentDate >= new Date(challenge.endDate).toISOString().slice(0, 10) || currentDate >= new Date().toISOString().slice(0, 10);

    const openModal = (index, value) => {

        if (currentDate !== new Date().toISOString().slice(0, 10)) return;
        setSelectedIndex(index);
        setSelectedValue(value);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const selectStatus = (value) => {
        if (selectedIndex !== null) {
            handleStatusChange(selectedIndex, behaviors[selectedIndex]._id, value);
        }
        closeModal();
    };

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Stack.Screen
                    options={{
                        header: () => (
                            <MainHeader />
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
                <Stack.Screen />
                <Text>{error}</Text>
            </SafeAreaView>
        );
    }

    const startDate = new Date(challenge.startDate).toISOString().split('T')[0];
    const endDate = new Date(challenge.endDate).toISOString().split('T')[0];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <View style={{ minHeight: 100, margin: 0, paddingTop: 70, alignItems: 'center', backgroundColor: COLORS.lightWhite }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: "row", width: "90%" }}>
                                <ScreenHeaderBtn handlePress={() => handleNavigate()} iconUrl={icons.close} dimension='100%' />
                                <ScreenHeaderProfile imageUrl={"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} dimension='100%' />
                            </View>
                        </View>
                    )
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, paddingTop: 50, padding: SIZES.medium }}>
                    <View style={styles.container}>
                        <Text style={styles.subTitle}>DESAFIO</Text>
                        <Text style={styles.parr}>{challenge.title}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.subTitle}>FECHA DE DESAFIO</Text>
                        <Text style={styles.parr}>Inicio: {startDate}</Text>
                        <Text style={styles.parr}>Final: {endDate}</Text>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.subTitle}>BITACORA DIA </Text>
                        <Text style={styles.done}>{behaviors.filter(b => b.status === 'HECHO').length}/{challenge.rules.length}</Text>
                    </View>
                    <View style={styles.container2}>
                        <TouchableOpacity onPress={() => handleDateChange(-1)} disabled={isPrevDisabled}>
                            <Icon name="chevron-left" size={40} color={isPrevDisabled ? COLORS.gray : COLORS.secondary} />
                        </TouchableOpacity>
                        <Text style={styles.parrBig}>
                            {new Date(currentDate).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric',
                                timeZone: 'UTC'
                            })}
                        </Text>
                        <TouchableOpacity onPress={() => handleDateChange(1)} disabled={isNextDisabled}>
                            <Icon name="chevron-right" size={40} color={isNextDisabled ? COLORS.gray : COLORS.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerR}>
                        <Text style={styles.parrT}>Comportamiento</Text>
                        <Text style={styles.parrT}>Valor %</Text>
                        <Text style={styles.parrT}>Status</Text>
                    </View>
                    <View>
                        {behaviors.map((behavior, index) => (
                            <View style={styles.containerR} key={index}>
                                <View style={{ flexDirection: "row", alignItems: 'center', width: "33.3%", height: 120 }}>
                                    <Text style={styles.parr}>{index + 1}. </Text>
                                    <Text style={{ maxWidth: "100%", ...styles.parr }}>{behavior.description}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: 'center', width: "33.3%", justifyContent: "center" }}>
                                    <Text style={styles.parr}>{behavior.points} %</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: 'center', width: "33.3%", justifyContent: "center" }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: behavior.status === 'NA' ? '#2B3859' : behavior.status === 'HECHO' ? '#8CBB38' : '#BB3838',
                                            borderRadius: 10,
                                            padding: 10,
                                        }}
                                        onPress={() => openModal(index, behavior.status)}
                                    >
                                        <Text style={{ color: COLORS.white }}>{behavior.status}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Modal for Status Selection */}
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {statusOptions.map((option, index) => (
                            <Pressable
                                key={index}
                                style={styles.modalOption}
                                onPress={() => selectStatus(option.value)}
                            >
                                <Text style={styles.modalOptionText}>{option.label}</Text>
                            </Pressable>
                        ))}
                        <Pressable style={styles.modalCloseButton} onPress={closeModal}>
                            <Text style={styles.modalCloseButtonText}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    subTitle: {
        color: COLORS.primary,
        fontSize: 22,
        marginBottom: 5
    },
    done: {
        color: COLORS.secondary,
        fontSize: 22,
        marginBottom: 5
    },
    parr: {
        color: COLORS.gray,
        fontSize: 14,
        marginBottom: 5
    },
    parrBig: {
        color: COLORS.gray,
        fontSize: 18,
        marginBottom: 5
    },
    parrT: {
        color: COLORS.gray,
        fontSize: 14,
        width: "33.3%",
        textAlign: "center"
    },
    container: {
        marginBottom: 20
    },
    container2: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    containerR: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
        minHeight: 40,
    },
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

export default Bitacora;
