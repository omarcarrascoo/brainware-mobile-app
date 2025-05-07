import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { COLORS, SIZES } from '../../../../constants/theme'
import BrainWareChallengeCount from '../../counters/BrainWareChallengeCount';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TeamCard({userInfo, userId}) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

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
    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/challenges`);
                const filteredChallenges = response.data.filter(challenge => challenge.userId === userId);
                setChallenges(filteredChallenges);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching challenges:', error);
                setError('Error fetching challenges');
                setLoading(false);
            }
        };
        fetchChallenges();
    }, [user]);


  return (
    <View style={{flexDirection:"row", alignItems:'center', justifyContent:"space-between"}}>
        <View style={{flexDirection:"row", alignItems:'center', gap: 10}}>
            <Image style={{width:50, height:50, borderRadius:100}} resizeMode='cover' source={{uri:"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"}}/>
            <View>
                <Text style={{fontSize:SIZES.small, color:COLORS.DarkBlue, fontWeight:700}}>{userInfo.username}</Text>
                <Text style={{color:COLORS.secondary, fontSize:SIZES.small, fontWeight:700}}>Equipo</Text>
            </View>
        </View>
        <View>
            <BrainWareChallengeCount userId={userInfo.id} challenges={challenges}/>
        </View>
    </View>
  )
}

export default TeamCard