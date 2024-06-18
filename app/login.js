import React from 'react'
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants/theme'
import { Stack, useRouter } from 'expo-router'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo'
import images from '../constants/images'



const Login = () =>{
    const router = useRouter();
    const handleLogin = () =>{
        router.push({pathname:'/home'})
    }
    const handleSingUp = () =>{
        router.push({pathname:'/signin'})
    }
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite,  }}>
            <Stack.Screen
                options={{
                   header: () =>
                    (
                        <View style={{minHeight:100, margin:0, paddingTop:70, alignItems:'center', justifyContent:'center', backgroundColor:COLORS.lightWhite}}>
                            <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />
                        </View>
                    )
                }}
    
            />
                <View style={{alignItems:'center', backgroundColor:COLORS.lightWhite, justifyContent:'space-between' }}>
                    <View style={{display:'flex', alignItems:"center", width:"80%"}}>
                        <Text style={{fontSize:40, color:COLORS.primary, fontWeight:600}}>12-30-2024</Text>
                        <Text style={{fontSize:18, fontWeight:300, textAlign:'center', color:COLORS.primary, marginTop:10}}>"Lorem ipsus dolor set amen des les morter nor." -Frases</Text>
                    </View>
                    <View style={{paddingTop: 40, paddingBottom:90, marginTop:40, borderTopLeftRadius:40, borderTopEndRadius:40, alignItems:"center", width:"100%", backgroundColor:COLORS.primary}}>
                        <View style={{width:"90%", alignItems: 'center'}}>
                            <Text style={{fontSize:30, textAlign:'center', color:COLORS.white}}>Iniciar Sesion</Text>
                            {/* <Text style={{fontSize:15, textAlign:'center', color:COLORS.white}}>Inicia en tu cuenta para cumplir tus desafios</Text> */}
                            <TextInput 
                                placeholder='Usuario' 
                                placeholderTextColor={COLORS.gray} 
                                style={{marginTop:20,fontSize:18, borderColor:COLORS.lightWhite,borderWidth:1, borderRadius:9, width:"100%", paddingVertical: 7, paddingHorizontal:8, color:COLORS.lightWhite}}
                            />
                            <TextInput 
                                placeholder='Contraseña' 
                                placeholderTextColor={COLORS.gray} 
                                style={{marginTop:18,fontSize:18, borderColor:COLORS.lightWhite,borderWidth:1, borderRadius:9, width:"100%", paddingVertical: 7, paddingHorizontal:8, color:COLORS.lightWhite}}
                            />
                            <TouchableOpacity onPress={handleLogin} style={{backgroundColor:COLORS.secondary, width:"auto", paddingVertical:12, paddingHorizontal:20, width: 150, justifyContent:'center', alignItems:"center", borderRadius: 10, marginTop:20}}>
                                <Text style={{color:COLORS.white, fontSize:18}}>Iniciar Sesion</Text>
                            </TouchableOpacity>
                            <View style={{flexDirection:"row", flexWrap:'wrap', marginTop:15, width:'90%', justifyContent: "center"}}>
                                {/* <Text style={{fontSize:15, textAlign:'center', color:COLORS.white}}>Olvidaste tu contraseña? <Text style={{fontSize:15, textAlign:'center', color:COLORS.white, textDecorationLine:"underline"}}>Restablecer Contraseña</Text></Text> */}
                                
                            </View>
                            <Text style={{fontSize:15, fontWeight:300, textAlign:'center', color:COLORS.white, marginTop:100}}>Si no tienes cuenta ponte en contacto con brainware para empezar a usar la mejor metodologia para la creacion de habitos en tu corportativo <TouchableOpacity onPress={handleSingUp}><Text style={{fontSize:15, textAlign:'center', color:COLORS.white, textDecorationLine:"underline"}}>Registrarse</Text></TouchableOpacity></Text>
                        </View>
                    </View>
                </View>
        </SafeAreaView>
    )
}

export default Login