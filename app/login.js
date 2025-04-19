import React, { useEffect, useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo';
import images from '../constants/images';


const frases= {
    "FrasesMotivacionales": [
      {
        "quote": "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
        "author": "Albert Schweitzer"
      },
      {
        "quote": "El único lugar donde el éxito viene antes del trabajo es en el diccionario.",
        "author": "Vidal Sassoon"
      },
      {
        "quote": "La acción es la clave fundamental para todo éxito.",
        "author": "Pablo Picasso"
      },
      {
        "quote": "El éxito es ir de fracaso en fracaso sin perder el entusiasmo.",
        "author": "Winston Churchill"
      },
      {
        "quote": "No es lo que te sucede, sino cómo reaccionas a ello lo que importa.",
        "author": "Epicteto"
      },
      {
        "quote": "La diferencia entre un jefe y un líder: un jefe dice 'Vayan', un líder dice 'Vamos'.",
        "author": "E. M. Kelly"
      },
      {
        "quote": "La gente que está lo suficientemente loca como para pensar que pueden cambiar el mundo son los que lo cambian.",
        "author": "Rob Siltanen"
      },
      {
        "quote": "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
        "author": "Robert Collier"
      },
      {
        "quote": "La mejor manera de predecir el futuro es inventarlo.",
        "author": "Alan Kay"
      },
      {
        "quote": "El verdadero progreso es el que pone la tecnología al alcance de todos.",
        "author": "Henry Ford"
      },
      {
        "quote": "Nunca sueñes con el éxito, trabaja para alcanzarlo.",
        "author": "Estée Lauder"
      },
      {
        "quote": "Los líderes no nacen, se hacen.",
        "author": "Vince Lombardi"
      },
      {
        "quote": "Hazlo o no lo hagas, pero no lo intentes.",
        "author": "Yoda"
      },
      {
        "quote": "La mejor manera de empezar algo es dejar de hablar y empezar a hacerlo.",
        "author": "Walt Disney"
      },
      {
        "quote": "El mayor placer en la vida es hacer lo que la gente dice que no puedes hacer.",
        "author": "Walter Bagehot"
      },
      {
        "quote": "El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el valor para continuar.",
        "author": "Winston Churchill"
      },
      {
        "quote": "No mires el reloj; haz lo que él hace. Sigue avanzando.",
        "author": "Sam Levenson"
      },
      {
        "quote": "La calidad no es un acto, es un hábito.",
        "author": "Aristóteles"
      },
      {
        "quote": "El talento gana partidos, pero el trabajo en equipo y la inteligencia ganan campeonatos.",
        "author": "Michael Jordan"
      },
      {
        "quote": "La perfección no es alcanzable, pero si perseguimos la perfección podemos alcanzar la excelencia.",
        "author": "Vince Lombardi"
      },
      {
        "quote": "El éxito consiste en hacer cosas ordinarias de manera extraordinaria.",
        "author": "Jim Rohn"
      },
      {
        "quote": "No se trata de si te derriban, se trata de si te levantas.",
        "author": "Vince Lombardi"
      },
      {
        "quote": "El liderazgo no se trata de ser el mejor. Se trata de hacer a otros mejores.",
        "author": "John C. Maxwell"
      },
      {
        "quote": "La verdadera medida del liderazgo es la influencia, nada más y nada menos.",
        "author": "John C. Maxwell"
      },
      {
        "quote": "El camino hacia el éxito y el camino hacia el fracaso son casi exactamente los mismos.",
        "author": "Colin R. Davis"
      },
      {
        "quote": "No es sobre las ideas. Sino sobre hacer que estas se vuelvan realidad.",
        "author": "Scott Belsky"
      },
      {
        "quote": "El éxito es la capacidad de ir de un fracaso a otro sin perder el entusiasmo.",
        "author": "Winston Churchill"
      },
      {
        "quote": "La clave del éxito es empezar antes de estar listo.",
        "author": "Marie Forleo"
      },
      {
        "quote": "No te limites. Muchas personas se limitan a lo que creen que pueden hacer. Tú puedes ir tan lejos como tu mente te lo permita.",
        "author": "Mary Kay Ash"
      },
      {
        "quote": "La innovación distingue a un líder de un seguidor.",
        "author": "Steve Jobs"
      },
      {
        "quote": "El liderazgo es la capacidad de transformar la visión en realidad.",
        "author": "Warren Bennis"
      },
      {
        "quote": "El éxito es gustarte a ti mismo, gustarte lo que haces y gustarte cómo lo haces.",
        "author": "Maya Angelou"
      },
      {
        "quote": "El secreto de salir adelante es comenzar.",
        "author": "Mark Twain"
      },
      {
        "quote": "No puedes cruzar el mar simplemente mirando el agua.",
        "author": "Rabindranath Tagore"
      },
      {
        "quote": "Las oportunidades no suceden, tú las creas.",
        "author": "Chris Grosser"
      },
      {
        "quote": "La diferencia entre ganar y perder es a menudo no renunciar.",
        "author": "Walt Disney"
      },
      {
        "quote": "El secreto para salir adelante es empezar.",
        "author": "Agatha Christie"
      },
      {
        "quote": "El fracaso es el condimento que da sabor al éxito.",
        "author": "Truman Capote"
      },
      {
        "quote": "El éxito no es la llave de la felicidad. La felicidad es la llave del éxito. Si amas lo que haces, tendrás éxito.",
        "author": "Albert Schweitzer"
      },
      {
        "quote": "Los grandes líderes no se destacan porque tienen todas las respuestas, sino porque hacen las preguntas correctas.",
        "author": "Ron Kaufman"
      },
      {
        "quote": "La mejor venganza es el éxito masivo.",
        "author": "Frank Sinatra"
      },
      {
        "quote": "La cosa más difícil es la decisión de actuar, el resto es mera tenacidad.",
        "author": "Amelia Earhart"
      },
      {
        "quote": "No puedes vencer a alguien que nunca se rinde.",
        "author": "Babe Ruth"
      },
      {
        "quote": "No tengo ningún talento especial. Solo soy apasionadamente curioso.",
        "author": "Albert Einstein"
      },
      {
        "quote": "El secreto de la creatividad es saber cómo esconder tus fuentes.",
        "author": "Albert Einstein"
      },
      {
        "quote": "El éxito no es la ausencia de fracaso; es la persistencia a través del fracaso.",
        "author": "Aisha Tyler"
      },
      {
        "quote": "El éxito es alcanzar tus propias metas, y no necesariamente ser comparado con otros.",
        "author": "Reba McEntire"
      },
      {
        "quote": "El verdadero líder no es el que manda, sino el que enseña.",
        "author": "Confucio"
      },
      {
        "quote": "Las oportunidades no son producto de la casualidad, más bien son resultado del trabajo.",
        "author": "Neil Patel"
      },
      {
        "quote": "La única manera de hacer un gran trabajo es amar lo que haces.",
        "author": "Steve Jobs"
      },
      {
        "quote": "Cuando todo parezca ir contra ti, recuerda que el avión despega contra el viento, no a favor de él.",
        "author": "Henry Ford"
      },
      {
        "quote": "Puedes elegir valentía o puedes elegir comodidad, no puedes tener ambas.",
        "author": "Brené Brown"
      },
      {
        "quote": "El carácter no puede ser desarrollado en tranquilidad y quietud. Sólo a través de pruebas y sufrimiento se puede fortalecer el alma, despejar la visión, inspirar ambición y lograr el éxito.",
        "author": "Helen Keller"
      },
      {
        "quote": "Una pequeña grieta en ti no significa que estés roto, significa que te pusieron a prueba y no te desmoronaste.",
        "author": "Linda Poindexter"
      },
      {
        "quote": "El fracaso no es caer, sino negarse a levantarse.",
        "author": "Proverbio chino"
      },
      {
        "quote": "Soy más que mis cicatrices.",
        "author": "Andrew Davidson"
      },
      {
        "quote": "No es la adversidad, sino tu reacción a la adversidad, la que determinará el desarrollo de tu vida.",
        "author": "Dieter Uchtdorf"
      },
      {
        "quote": "No dejes que lo que no puedes hacer interfiera con lo que puedes hacer.",
        "author": "John Wooden"
      },
      {
        "quote": "Aprende a ser feliz con lo que tienes mientras persigues todo lo que quieres.",
        "author": "Jim Rohn"
      },
      {
        "quote": "Sé que puede parecer que levantarse, respirar e incluso moverse es una lucha. Pero por favor hazlo, muchas puertas están esperando abiertas para ti.",
        "author": "Tamara Brown"
      },
      {
        "quote": "En tres palabras puedo resumir todo lo que he aprendido acerca de la vida: Continúa hacia adelante.",
        "author": "Robert Frost"
      },
      {
        "quote": "La adversidad tiene el don de despertar talentos que en la prosperidad hubieran permanecido dormidos.",
        "author": "Horacio"
      },
      {
        "quote": "Si llevas alegría en tu corazón, puedes sanar en cualquier momento.",
        "author": "Carlos Santana"
      },
      {
        "quote": "La resiliencia es la capacidad de un sistema, empresa o persona para mantener su propósito principal e integridad ante circunstancias radicalmente cambiantes.",
        "author": "Andrew Zolli y Ann Marie Healy"
      }
    ]
  }

const getRandomQuote = () => {
    const quotesArray = frases["FrasesMotivacionales"];
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    return quotesArray[randomIndex];
  };


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [quote, setQuote] = useState(getRandomQuote());
    const router = useRouter();

    const today = new Date().toLocaleDateString('en-US'); // Dynamically get today's date

    useEffect(() => {
        setQuote(getRandomQuote());
    }, []);
    const handleLogin = async () => {
        try {
            const response = await fetch('https://administracionalpha.com/api/auth/login', { // Replace with your actual API URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                // Save the token in AsyncStorage
                await AsyncStorage.setItem('accessToken', data.accessToken);
                await AsyncStorage.setItem('username', data.email);
                await AsyncStorage.setItem('userId', data._id);
                await AsyncStorage.setItem('teamId', data.companyCode);
                Alert.alert("Login successful");
                
                // Navigate to the home screen
                router.push('/home');
            } else {
                Alert.alert("Login failed", data);
            }
        } catch (error) {
            Alert.alert("An error occurred", error.message);
        }
    };

    const handleSignUp = () => {
        router.push('/signin');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <View style={{ minHeight: 100, margin: 0, paddingTop: 70, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.lightWhite }}>
                            <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension='100%' />
                        </View>
                    ),
                }}
            />
            <View style={{ alignItems: 'center', backgroundColor: COLORS.lightWhite, justifyContent: 'space-between' }}>
                <View style={{ display: 'flex', alignItems: "center", width: "80%" }}>
                    <Text style={{ fontSize: 40, color: COLORS.primary, fontWeight: 600 }}>{today}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 300, textAlign: 'center', color: COLORS.primary, marginTop: 10 }}>"{quote.quote}" -{quote.author}</Text>
                </View>
                <View style={{ paddingTop: 40, paddingBottom: 90, marginTop: 40, borderTopLeftRadius: 40, borderTopEndRadius: 40, alignItems: "center", width: "100%", backgroundColor: COLORS.primary }}>
                    <View style={{ width: "90%", alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, textAlign: 'center', color: COLORS.white }}>Iniciar Sesion</Text>
                        <TextInput
                            placeholder='Usuario'
                            placeholderTextColor={COLORS.gray}
                            style={{ marginTop: 20, fontSize: 18, borderColor: COLORS.lightWhite, borderWidth: 1, borderRadius: 9, width: "100%", paddingVertical: 13, paddingHorizontal: 8, color: COLORS.lightWhite }}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            placeholder='Contraseña'
                            placeholderTextColor={COLORS.gray}
                            style={{ marginTop: 18, fontSize: 18, borderColor: COLORS.lightWhite, borderWidth: 1, borderRadius: 9, width: "100%", paddingVertical: 13, paddingHorizontal: 8, color: COLORS.lightWhite }}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: COLORS.secondary, paddingVertical: 12, paddingHorizontal: 20, width: "100%", justifyContent: 'center', alignItems: "center", borderRadius: 10, marginTop: 25 }}>
                            <Text style={{ color: COLORS.white, fontSize: 18 }}>Iniciar Sesion</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 15, fontWeight: 300, textAlign: 'center', color: COLORS.white, marginTop: 100 }}>Si no tienes cuenta ponte en contacto con brainware para empezar a usar la mejor metodologia para la creacion de habitos en tu corportativo <TouchableOpacity onPress={handleSignUp}><Text style={{ fontSize: 15, textAlign: 'center', color: COLORS.white, textDecorationLine: "underline" }}>Registrarse</Text></TouchableOpacity></Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};



  

export default Login;



