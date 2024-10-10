// import React from 'react'
// import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { COLORS } from '../constants/theme'
// import { Stack, useRouter } from 'expo-router'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
// import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo'
// import images from '../constants/images'



// const Login = () =>{
//     const router = useRouter();
//     const handleLogin = () =>{
//         router.push({pathname:'/login'})
//     }
//     return(
//         <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite,  }}>
//             <Stack.Screen
//                 options={{
//                    header: () =>
//                     (
//                         <View style={{minHeight:100, margin:0, paddingTop:70, alignItems:'center', justifyContent:'center', backgroundColor:COLORS.lightWhite}}>
//                             <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />
//                         </View>
//                     )
//                 }}
    
//             />
//                 <View style={{alignItems:'center', backgroundColor:COLORS.lightWhite, justifyContent:'space-between' }}>
//                     <View style={{display:'flex', alignItems:"center", width:"80%"}}>
//                         <Text style={{fontSize:40, color:COLORS.primary, fontWeight:600}}>06-18-2024</Text>
//                         <Text style={{fontSize:18, fontWeight:300, textAlign:'center', color:COLORS.primary, marginTop:10}}>"Lorem ipsus dolor set amen des les morter nor." -Frases</Text>
//                     </View>
//                     <View style={{paddingTop: 40, paddingBottom:60, marginTop:40, borderTopLeftRadius:40, borderTopEndRadius:40, alignItems:"center", width:"100%", backgroundColor:COLORS.primary}}>
//                         <View style={{width:"90%", alignItems: 'center'}}>
//                             <Text style={{fontSize:30, textAlign:'center', color:COLORS.white}}>Registrarse</Text>
//                             {/* <Text style={{fontSize:15, textAlign:'center', color:COLORS.white}}>Inicia en tu cuenta para cumplir tus desafios</Text> */}
//                             <TextInput 
//                                 placeholder='Correo Electronico' 
//                                 placeholderTextColor={COLORS.gray} 
//                                 style={{marginTop:20,fontSize:18, borderColor:COLORS.lightWhite,borderWidth:1, borderRadius:9, width:"100%", paddingVertical: 13, paddingHorizontal:8, color:COLORS.lightWhite}}
//                             />
//                             <TextInput 
//                             textContentType='password'
//                                 placeholder='Codigo Empresa' 
//                                 placeholderTextColor={COLORS.gray} 
//                                 style={{marginTop:18,fontSize:18, borderColor:COLORS.lightWhite,borderWidth:1, borderRadius:9, width:"100%", paddingVertical: 13, paddingHorizontal:8, color:COLORS.lightWhite}}
//                             />
//                             <TextInput 
//                                 placeholder='Contraseña' 
//                                 placeholderTextColor={COLORS.gray} 
//                                 style={{marginTop:18,fontSize:18, borderColor:COLORS.lightWhite,borderWidth:1, borderRadius:9, width:"100%", paddingVertical: 13, paddingHorizontal:8, color:COLORS.lightWhite}}
//                             />
//                             <TextInput 
//                                 placeholder='Repita su contraseña' 
//                                 placeholderTextColor={COLORS.gray} 
//                                 style={{marginTop:18,fontSize:18, borderColor:COLORS.lightWhite,borderWidth:1, borderRadius:9, width:"100%", paddingVertical: 13, paddingHorizontal:8, color:COLORS.lightWhite}}
//                             />
//                             <TouchableOpacity onPress={handleLogin} style={{backgroundColor:COLORS.secondary, width:"auto", paddingVertical:12, paddingHorizontal:20, width: 150, justifyContent:'center', alignItems:"center", borderRadius: 10, marginTop:20}}>
//                                 <Text style={{color:COLORS.white, fontSize:18}}>Registrarse</Text>
//                             </TouchableOpacity>
//                             <View style={{flexDirection:"row", flexWrap:'wrap', marginTop:15, width:'90%', justifyContent: "center"}}>
//                                 {/* <Text style={{fontSize:15, textAlign:'center', color:COLORS.white}}>Olvidaste tu contraseña? <Text style={{fontSize:15, textAlign:'center', color:COLORS.white, textDecorationLine:"underline"}}>Restablecer Contraseña</Text></Text> */}
                                
//                             </View>
//                             <Text style={{fontSize:15, fontWeight:300, textAlign:'center', color:COLORS.white, marginTop:20}}>Ya tienes una cuenta? <TouchableOpacity onPress={handleLogin}y><Text style={{fontSize:15, textAlign:'center', color:COLORS.white, textDecorationLine:"underline"}}>Inciar Sesion</Text></TouchableOpacity> </Text>
//                         </View>
//                     </View>
//                 </View>
//         </SafeAreaView>
//     )
// }

// export default Login





import React, { useState } from 'react';
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { Stack, useRouter } from 'expo-router';
import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo';
import images from '../constants/images';

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [companyCode, setCompanyCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:9090/api/auth/register', { // Replace with your actual API URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    username: email,
                    password,
                    companyCode
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                Alert.alert("Registration successful");
                router.push('/login'); // Navigate to login page
            } else {
                Alert.alert("Registration failed", data.message || "An error occurred");
            }
        } catch (error) {
            Alert.alert("An error occurred", error.message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <View style={{ minHeight: 100, margin: 0, paddingTop: 70, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.lightWhite }}>
                            <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />
                        </View>
                    )
                }}
            />
            <View style={{ alignItems: 'center', backgroundColor: COLORS.lightWhite, justifyContent: 'space-between' }}>
                <View style={{ display: 'flex', alignItems: "center", width: "80%" }}>
                    <Text style={{ fontSize: 40, color: COLORS.primary, fontWeight: 600 }}>06-18-2024</Text>
                    <Text style={{ fontSize: 18, fontWeight: 300, textAlign: 'center', color: COLORS.primary, marginTop: 10 }}>"Lorem ipsus dolor set amen des les morter nor." -Frases</Text>
                </View>
                <View style={{ paddingTop: 40, paddingBottom: 60, marginTop: 40, borderTopLeftRadius: 40, borderTopEndRadius: 40, alignItems: "center", width: "100%", backgroundColor: COLORS.primary }}>
                    <View style={{ width: "90%", alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, textAlign: 'center', color: COLORS.white }}>Registrarse</Text>
                        <TextInput
                            placeholder='Correo Electronico'
                            placeholderTextColor={COLORS.gray}
                            style={{ marginTop: 20, fontSize: 18, borderColor: COLORS.lightWhite, borderWidth: 1, borderRadius: 9, width: "100%", paddingVertical: 13, paddingHorizontal: 8, color: COLORS.lightWhite }}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            placeholder='Codigo Empresa'
                            placeholderTextColor={COLORS.gray}
                            style={{ marginTop: 18, fontSize: 18, borderColor: COLORS.lightWhite, borderWidth: 1, borderRadius: 9, width: "100%", paddingVertical: 13, paddingHorizontal: 8, color: COLORS.lightWhite }}
                            value={companyCode}
                            onChangeText={setCompanyCode}
                        />
                        <TextInput
                            placeholder='Contraseña'
                            placeholderTextColor={COLORS.gray}
                            style={{ marginTop: 18, fontSize: 18, borderColor: COLORS.lightWhite, borderWidth: 1, borderRadius: 9, width: "100%", paddingVertical: 13, paddingHorizontal: 8, color: COLORS.lightWhite }}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <TextInput
                            placeholder='Repita su contraseña'
                            placeholderTextColor={COLORS.gray}
                            style={{ marginTop: 18, fontSize: 18, borderColor: COLORS.lightWhite, borderWidth: 1, borderRadius: 9, width: "100%", paddingVertical: 13, paddingHorizontal: 8, color: COLORS.lightWhite }}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                        <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: COLORS.secondary, width: "auto", paddingVertical: 12, paddingHorizontal: 20, justifyContent: 'center', alignItems: "center", borderRadius: 10, marginTop: 20 }}>
                            <Text style={{ color: COLORS.white, fontSize: 18 }}>Registrarse</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", flexWrap: 'wrap', marginTop: 15, width: '90%', justifyContent: "center" }}>
                            {/* <Text style={{fontSize:15, textAlign:'center', color:COLORS.white}}>Olvidaste tu contraseña? <Text style={{fontSize:15, textAlign:'center', color:COLORS.white, textDecorationLine:"underline"}}>Restablecer Contraseña</Text></Text> */}
                        </View>
                        <Text style={{ fontSize: 15, fontWeight: 300, textAlign: 'center', color: COLORS.white, marginTop: 20 }}>Ya tienes una cuenta? <TouchableOpacity onPress={() => router.push('/login')}><Text style={{ fontSize: 15, textAlign: 'center', color: COLORS.white, textDecorationLine: "underline" }}>Inciar Sesion</Text></TouchableOpacity> </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Register;
