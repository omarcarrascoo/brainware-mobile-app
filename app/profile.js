import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Button, Image } from 'react-native';
import axios from 'axios';
import { COLORS, SIZES } from '../constants/theme';
import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo';
import ScreenHeaderProfile from '../components/common/header/ScreenHeaderProfile';
import images from '../constants/images';
import MainFooter from '../components/common/footer/MainFooter';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('accessToken');
                const storedUsername = await AsyncStorage.getItem('userId');

                if (storedToken) {
                    setToken(storedToken);
                    setUser(storedUsername);
                }
            } catch (error) {
                console.log('Error retrieving token:', error);
            }
        };
        getToken();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (!user || !token) return;

            try {
                const response = await axios.get(`http://localhost:9090/api/user/find/${user}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserInfo(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching user data');
                setLoading(false);
            }
        };

        fetchUser();
    }, [user, token]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('userId');
            setToken(null);
            setUser(null);
            setUserInfo(null);
            router.push('/login'); // Navigate to the login screen or home screen
        } catch (error) {
            console.log('Error during logout:', error);
        }
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
console.log(userInfo);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, paddingHorizontal: SIZES.medium }}>
                    {userInfo && (
                        <View style={{ marginVertical: SIZES.medium, alignItems: 'center', justifyContent:'center', paddingTop: 150}}>
                            <Image style={{width:140, height:140, borderRadius:100, marginBottom:30}} source={{uri: "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"}}></Image>
                            <Text style={{ fontSize: SIZES.large, fontWeight: 'bold' }}>User Information</Text>
                            {/* <Text>Username: {userInfo.username}</Text> */}
                            <Text>Email: {userInfo.email}</Text>
                            <Text>Company Code: {userInfo.companyCode}</Text>
                            <Button title="Logout" onPress={handleLogout} />
                        </View>
                    )}
                </View>
            </ScrollView>
            <MainFooter />
        </SafeAreaView>
    );
}

export default Home;
