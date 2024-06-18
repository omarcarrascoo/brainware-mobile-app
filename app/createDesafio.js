import { Stack, useRouter } from 'expo-router';
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

const CreateChallenge = () => {
    const router = useRouter()
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState("");
    const [endDate, setEndDate] = useState(new Date());
    const [behaviors, setBehaviors] = useState([]);
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
                if (step >= 3) {
                    const data = {
                        title: title,
                        endDate: endDate.toISOString(),
                        rules: behaviors.map(behavior => ({ description: behavior.name, points: parseFloat(behavior.points) }))
                    };
                    axios.post('http://localhost:9090/api/challenges/create', data)
                        .then(response => {
                            console.log(response.data);
                            Alert.alert(
                                'Desafio Creado',
                                'Su desafio ha sido creado, empiece a trabajar en él',
                                [{ text: 'OK', onPress: () => {
                                    console.log('Challenge Saved!');
                                    router.push('/home'); // Navigate to HomeScreen
                                }}]
                            );
                        })
                        .catch(error => {
                            console.error('Error creating challenge:', error);
                            Alert.alert(
                                'Error',
                                'Hubo un problema al crear el desafío. Por favor, inténtelo de nuevo más tarde.',
                                [{ text: 'OK', onPress: () => console.log('Error creating challenge') }]
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
    console.log(endDate);


    useEffect(()=>{
        if(step == 0){
            router.push("/home")
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
