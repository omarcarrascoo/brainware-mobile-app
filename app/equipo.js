import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
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

const Equipo = () =>{
    console.log("Hola home");
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/challenges');
                setChallenges(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching challenges:', error);
                setError('Error fetching challenges');
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);



    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Stack.Screen
                options={{
                    autoHideHomeIndicator:true,
                    header: () =>(
                        <View style={{minHeight:100, margin:0, paddingTop:70, alignItems:'center',  backgroundColor:COLORS.lightWhite}}>
                            <View style={{justifyContent:'space-between', flexDirection: "row", width:"92%"}}>
                                <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />
                                <ScreenHeaderProfile imageUrl={"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} dimension = '100%'/>
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
                    autoHideHomeIndicator:true,
                    header: () =>(
                        <View style={{minHeight:100, margin:0, paddingTop:70, alignItems:'center',  backgroundColor:COLORS.lightWhite}}>
                            <View style={{justifyContent:'space-between', flexDirection: "row", width:"92%"}}>
                                <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />
                                <ScreenHeaderProfile imageUrl={"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} dimension = '100%'/>
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
                    autoHideHomeIndicator:true,
                    header: () =>(
                        <MainHeader/>
                    )
                }}
            />
            <View style={{paddingHorizontal:SIZES.large}}>
                <Text style={{fontSize:32, color: COLORS.primary, fontWeight:600, marginTop:SIZES.xLarge*2}}>MI EQUIPO</Text>
                <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:SIZES.large}}>
                    <Text style={{fontSize: SIZES.medium, color:COLORS.DarkBlue}}>Integrantes</Text>
                    <Text style={{fontSize: SIZES.medium, color:COLORS.DarkBlue}}>Comportamientos</Text>
                </View>
                <ScrollView style={{marginBottom:260}} showsVerticalScrollIndicator={false}>
                    <TeamLister/>
                </ScrollView>
            </View>
            <View style={{position:"absolute", backgroundColor:COLORS.lightWhite, bottom:0, paddingVertical:20}}>
             <MainFooter home={true} />
            </View>
            
        </SafeAreaView>
    );
}



export default Equipo;
