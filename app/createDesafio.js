import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
import icons from '../constants/icons';
import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo';
import images from '../constants/images';
import BrainWareCreateDesafio from '../components/createDesafio/CreateDesafio';
import BrainWareCompSection from '../components/createDesafio/CompoSection';
import BrainWarePointSection from '../components/createDesafio/PointsSection';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateChallenge = () => {
    const router = useRouter()
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState("");
    const [endDate, setEndDate] = useState(new Date());
    const [behaviors, setBehaviors] = useState([]);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const localParams = useLocalSearchParams();
    const {idCycle, challengeData, challengeTitle, ciclo} = localParams
    console.log(challengeData);
    
    console.log(idCycle);
    
    useEffect(() => {
        const getToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('accessToken');
                const storedUsername = await AsyncStorage.getItem('userId');

                if (storedToken) {
                    setToken(storedToken);
                    setUser(storedUsername)
                }
            } catch (error) {
                console.log('Error retrieving token:', error);
            }
        };
        getToken();
    }, []);
    console.log("ciclo");
    console.log(ciclo);
    console.log("ciclo sumado");
    console.log(ciclo);
    
    console.log(parseInt(ciclo, 10));
    
    let newCiclo = parseInt(ciclo, 10) + 1
    console.log("ciclo2");
    console.log(newCiclo);
    

    
    const handleContinue = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            const totalPercentage = behaviors.reduce((total, behavior) => total + parseFloat(behavior.points || 0), 0);
            if (totalPercentage !== 100) {
                Alert.alert(
                    'Completa el 100%',
                    'Debes colocar el 100%.\nPor favor hágalo antes de continuar.',
                    [{ text: 'OK', onPress: () => {} }]
                );
            } else {
                const data = {
                    title: title,
                    endDate: endDate.toISOString(),
                    rules: behaviors.map(behavior => ({ description: behavior.name, points: parseFloat(behavior.points) })),
                    userId: user,
                    ciclo:  newCiclo
                };

                if (idCycle) {
                    // Update existing challenge
                    axios.put(`https://administracionalpha.com/api/challenges/${idCycle}`, data)
                        .then(response => {
                            console.log(response.data);
                            Alert.alert(
                                'Desafio Actualizado',
                                'El desafío ha sido actualizado exitosamente.',
                                [{ text: 'OK', onPress: () => router.push('/home') }]
                            );
                        })
                        .catch(error => {
                            console.error('Error updating challenge:', error);
                            Alert.alert(
                                'Error',
                                'Hubo un problema al actualizar el desafío. Por favor, inténtelo de nuevo más tarde.',
                                [{ text: 'OK', onPress: () => {} }]
                            );
                        });
                } else {
                    // Create new challenge
                    axios.post('https://administracionalpha.com/api/challenges/create', data)
                        .then(response => {
                            console.log(response.data);
                            Alert.alert(
                                'Desafio Creado',
                                'Su desafío ha sido creado, empiece a trabajar en él.',
                                [{ text: 'OK', onPress: () => router.push('/home') }]
                            );
                        })
                        .catch(error => {
                            console.error('Error creating challenge:', error);
                            Alert.alert(
                                'Error',
                                'Hubo un problema al crear el desafío. Por favor, inténtelo de nuevo más tarde.',
                                [{ text: 'OK', onPress: () => {} }]
                            );
                        });
                }
            }
        }
    };

    
    const handleDateChange = (newDate) => {
        setEndDate(newDate);
    };

    const handleAddBehavior = (newBehavior) => {
        setBehaviors([...behaviors, { name: newBehavior, points: "" }]);
    };

    const handleDeleteBehavior = (index) => {
        setBehaviors(behaviors.filter((_, i) => i !== index));
    };

    const handlePercentageChange = (index, value) => {
        const updatedBehaviors = [...behaviors];
        updatedBehaviors[index].points = value;
        setBehaviors(updatedBehaviors);
    };
    console.log(ciclo);


    useEffect(()=>{
        if(step == 0){
            router.back("/home")
        }
    }, [step])
    const handleBack = () => {

            setStep(step - 1);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.chevronLeft} dimension='60%' handlePress={handleBack} />
                    ),
                    headerTitle: () => (
                        <ScreenHeaderLogo iconUrl={images.d1} dimension='80%' />
                    ),
                }}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, padding: SIZES.medium }}
            >
                {step === 1 && (
                    <BrainWareCreateDesafio
                        onTitleChange={setTitle}
                        setedTitle={title}
                        setedDate={endDate}
                        onDateChange={handleDateChange}
                        cycle={challengeTitle}
                        
                    />
                )}
                {step === 2 && (
                    <BrainWareCompSection
                        behaviors={behaviors.map(b => b.name)}
                        onAddBehavior={handleAddBehavior}
                        onDeleteBehavior={handleDeleteBehavior}
                    />
                )}
                {step === 3 && (
                    <BrainWarePointSection
                        behaviors={behaviors}
                        onPercentageChange={handlePercentageChange}
                        onContinue={handleContinue}
                    />
                )}
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.secondary,
                        padding: 15,
                        borderRadius: 5,
                        alignItems: 'center',
                        marginBottom: 50
                    }}
                    onPress={handleContinue}
                >
                    <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>
                        {step < 3 ? 'Continuar' : 'Guardar Desafio'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreateChallenge;
