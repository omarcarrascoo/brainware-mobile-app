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

const Home = () =>{
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
                    // headerStyle: { backgroundColor: COLORS.lightWhite, height: 3000, padding: SIZES.medium, },
                    // headerShadowVisible: false,
                    // headerLeft: () => <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />,
                    // headerTitle: () => "",
                    // headerRight: () => <ScreenHeaderProfile imageUrl={"https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"} dimension='100%' />,
                    header: () =>(
                        <View style={{minHeight:100, margin:0, paddingTop:70, alignItems:'center',  backgroundColor:COLORS.lightWhite}}>
                            <View style={{justifyContent:'space-between', flexDirection: "row", width:"92%"}}>
                                <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />
                                <ScreenHeaderProfile imageUrl={"http://localhost:9090/public/images/pp.png"} dimension = '100%'/>
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
                    // headerStyle: { backgroundColor: COLORS.lightWhite, height: 3000, padding: SIZES.medium, },
                    // headerShadowVisible: false,
                    // headerLeft: () => <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />,
                    // headerTitle: () => "",
                    // headerRight: () => <ScreenHeaderProfile imageUrl={"https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"} dimension='100%' />,
                    header: () =>(
                        <View style={{minHeight:100, margin:0, paddingTop:70, alignItems:'center',  backgroundColor:COLORS.lightWhite}}>
                            <View style={{justifyContent:'space-between', flexDirection: "row", width:"92%"}}>
                                <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />
                                <ScreenHeaderProfile imageUrl={"http://localhost:9090/public/images/pp.png"} dimension = '100%'/>
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
                    // headerStyle: { backgroundColor: COLORS.lightWhite, height: 3000, padding: SIZES.medium, },
                    // headerShadowVisible: false,
                    // headerLeft: () => <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />,
                    // headerTitle: () => "",
                    // headerRight: () => <ScreenHeaderProfile imageUrl={"https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"} dimension='100%' />,
                    header: () =>(
                        <View style={{minHeight:100, margin:0, paddingTop:70, alignItems:'center',  backgroundColor:COLORS.lightWhite}}>
                            <View style={{justifyContent:'space-between', flexDirection: "row", width:"92%"}}>
                                <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />
                                <ScreenHeaderProfile imageUrl={"http://localhost:9090/public/images/pp.png"} dimension = '100%'/>
                            </View>
                        </View>
                    )
                }}
            />
                {/* Header */}
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZES.medium }}>
                    <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='80%' />
                    <ScreenHeaderProfile imageUrl={"https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"} dimension='100%' />
                </View> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex:1,
                        paddingHorizontal: SIZES.medium
                    }}
                >
                    {/* Challenges Resume */}
                    <BrainWareChallengesResume challenges={challenges} />
                    {/* Bitacore List */}
                    <BrainWareBitacoreList challenges={challenges} />
                </View>
            </ScrollView>
            <MainFooter />
        </SafeAreaView>
    );
}



export default Home;
