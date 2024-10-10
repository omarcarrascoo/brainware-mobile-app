import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
import icons from '../constants/icons';
import ScreenHeaderProfile from '../components/common/header/ScreenHeaderProfile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo';
import images from '../constants/images';
import MainHeader from '../components/common/header/MainHeader';

const Preguntas = () => {
    const router = useRouter();
    const localParams = useLocalSearchParams();
    const [challenge, setChallenge] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10)); // Today's date
    const [behaviors, setBehaviors] = useState([]);



    const [text, setText] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');

    const handleNavigate = () =>{
        router.push('/home')
    }

    const hanndleCycle = (cycle) => {
        router.push({pathname:`/createDesafio`, params: { idCycle:localParams.id, challengeData: localParams.challengeData, challengeTitle: localParams.challengeTitle, ciclo: localParams.ciclo }});
    };
    const handleSendData = async () => {
        try {
            const response = await axios.post('http://localhost:9090/api/questions', {
                challengeId: localParams.id,
                q1: text,
                q2: text2,
                q3: text3
            });
            console.log(response);
            Alert.alert("Data sent successfully");
            hanndleCycle()

        } catch (error) {
            Alert.alert("An error occurred", error.message);
        }
    };
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <View style={{ minHeight: 100, margin: 0, paddingTop: 70, alignItems: 'center', backgroundColor: COLORS.lightWhite }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: "row", width: "90%" }}>
                                <ScreenHeaderBtn handlePress={() => handleNavigate()} iconUrl={icons.close} dimension='100%' />
                                <ScreenHeaderProfile imageUrl={"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} dimension='100%' />
                            </View>
                        </View>
                    )
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        paddingTop: 50,
                        padding: SIZES.medium
                    }}
                >
                    <Text style={styles.subTitle}>PREGUNTAS FINALES</Text>
                    <View style={styles.container}>
                        <Text style={styles.parr}>¿Cuáles son los resultados específicos que obtuviste durante el proceso de coaching que consideras importante mantener a lo largo del tiempo?</Text>
                        <TextInput
                        style={styles.textArea}
                        placeholder="Escribe acerca de tu desafio... "
                        value={text}
                        onChangeText={setText}
                        multiline={true}
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.parr}>¿Cuáles consideras que son las acciones clave que te permitirán mantener estos resultados?</Text>
                        <TextInput
                        style={styles.textArea}
                        placeholder="Escribe acerca de tu desafio... "
                        value={text2}
                        onChangeText={setText2}
                        multiline={true}
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.parr}>¿Qué actividades a corto (1 mes) mediano (3 meses) y largo (6 meses) plazo crees que puedas implementar para que contribuyan a mantener y consolidar lo logrado.</Text>
                        <TextInput
                        style={styles.textArea}
                        placeholder="Escribe acerca de tu desafio... "
                        value={text3}
                        onChangeText={setText3}
                        multiline={true}
                        />
                    </View>
                    <TouchableOpacity onPress={handleSendData} style={styles.btn}>
                        <Text style={styles.textBtn}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};






const styles = StyleSheet.create({
    btn:{
        backgroundColor:COLORS.secondary,
        padding: 14,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:30,
        borderRadius:10
    },
    textBtn:{
        color:COLORS.white,

    },
    subTitle:{
      color: COLORS.primary,
      fontSize: 22,
      marginBottom:5
    },

    subTitle2:{
        color: COLORS.gray,
        fontSize: 22,
        marginBottom:5
      },
    done:{
        color: COLORS.secondary,
        fontSize: 22,
        marginBottom:5
    },
    containerDate:{
      width: "100%",
      backgroundColor: COLORS.primary,
      minHeight: 28,
      alignItems:"center",
      justifyContent:"space-between",
      flexDirection: "row",
      padding: 8,
      borderRadius: 5
    },
    textArea: {
      height: 120,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 20,
      textAlignVertical: 'top',
      borderRadius: 5,
      color:COLORS.primary
      
    },
    logImage:{
      maxWidth:"100%",
      height:180
    },
    title:{
      color: COLORS.primary,
      fontSize: 32,
      textAlign:"center"
    },
    parrcenter:{
      textAlign:"center",
      color: COLORS.primary,
      fontSize: 14,
      marginBottom: 35
    },
    parr:{
      color: COLORS.gray,
      fontSize: 14,
      marginBottom:16
    },
    parrT:{
        color: COLORS.gray,
        fontSize: 14,
        width: "33.3%",
        textAlign:"center"
    },
    container:{
      marginVertical:20
    },
    container2:{
        marginBottom:20,
        flexDirection:  "row",
        alignItems: "center"
    },
    containerR:{
        marginBottom:20,
        flexDirection:  "row",
        alignItems: "center",
        borderTopWidth:.2,
        borderBottomWidth:.2,
        height:38
    }
  });
export default Preguntas;
