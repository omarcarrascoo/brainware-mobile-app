

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import TeamCard from './common/cards/TeamCard/TeamCard';
import { SIZES } from '../constants/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TeamLister() {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        async function fetchUsers() {
            try {
               const teamId = await AsyncStorage.getItem('teamId');

                const response = await axios.get('https://administracionalpha.com/api/user');
                const filterEquipo = response.data.filter(user => user.companyCode == teamId)
                setUsers(filterEquipo);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <View style={{ gap: SIZES.large }}>
            {users.map(user => (
                <TeamCard userId={user._id} key={user._id} userInfo={user} />
            ))}
        </View>
    );
}

export default TeamLister;
