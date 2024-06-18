

import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
    return (
        <Stack initialRouteName="login">
            <Stack.Screen name="login" />
            {/* <Stack.Screen name="createDesafio" /> */}
            {/* <Stack.Screen name="bitacora" />
            <Stack.Screen name="login" /> */}
        </Stack>
    );
};

export default Layout;
