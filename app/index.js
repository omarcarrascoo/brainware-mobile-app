// import { Stack, useRouter } from 'expo-router';
import Home from './home';
// import CreateChallenge from './createDesafio';
// import CreateComportamientos from './createComportamientos';
// import Bitacora from './bitacora';


// const Index = () =>{
//     const router = useRouter();


//     return (
//         <Home/>
//         // <CreateChallenge/>
//         // <Bitacora/>
//     )
// }

// export default Index;


import React from 'react';
import { View, Text } from 'react-native';
import MainFooter from '../components/common/footer/MainFooter';
import Login from './login';
import { Redirect } from 'expo-router';
console.log("Hola Index");

const Index = () => {
    return <Redirect href="/login"/>
    // return (
    //     <>
    //         <Login/>
            
    //     </>
    // );
};

export default Index;

