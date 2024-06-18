// import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
// import {View, Text, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity} from 'react-native'
// import { COLORS, SIZES } from '../constants/theme';
// import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
// import icons from '../constants/icons';
// import ScreenHeaderProfile from '../components/common/header/ScreenHeaderProfile';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo';
// import images from '../constants/images';



// const Bitacora = () =>{
//     console.log("bitacora");
//     const router = useRouter();
//     const localParams = useLocalSearchParams();
//     const [challenge, setChallenge] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [date, setDate] = useState(Date.now)
//     const [completeRules, setCompletedRules]= useState()

//     useEffect(()=>{
//         const fetchChallenge = async () =>{
//             try {
//                 const response = await axios.get(`http://localhost:9090/api/challenges/${localParams.id}`)
//                 setChallenge(response.data)
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching challenges:', error);
//                 setError('Error fetching challenges');
//                 setLoading(false);
//             }
//         }
//         fetchChallenge()
//     },[])

//     const [behaviors, setBehaviors] = useState([
//         { name: "Comp1", percentage: "25", status:"NA" },
//         { name: "Comp2", percentage: "25", status:"HECHO" },
//         { name: "Comp3", percentage: "25", status:"FALLO" },
//         { name: "Comp3", percentage: "25", status:"NA" },
//     ]);


//     const handleStatusChange = (index) => {
//         const updatedBehaviors = [...behaviors];
//         const currentStatus = updatedBehaviors[index].status;
        
//         // Cycle through statuses: NA -> HECHO -> FALLO -> NA
//         if (currentStatus === "NA") {
//             updatedBehaviors[index].status = "HECHO";
//         } else if (currentStatus === "HECHO") {
//             updatedBehaviors[index].status = "FALLO";
//         } else if (currentStatus === "FALLO") {
//             updatedBehaviors[index].status = "NA";
//         }

//         setBehaviors(updatedBehaviors);
//     };
//     useEffect(()=>{
//         const getCompletedRulesCount = (challenge) => {
//             // Get today's date in ISO string without time
//             const todayDate = new Date().toISOString().slice(0, 10);                // Filter progress for today's date
//             const progressToday = challenge?.progress?.filter(progress => progress.date.slice(0, 10) === todayDate);
//             // Sum the number of completed rules for each progress entry
//             const completedRulesCount = progressToday?.reduce((total, progress) => total + progress.completedRules.length, 0);
//             return completedRulesCount;
//         }
//         var completados = getCompletedRulesCount(challenge)
//         if (completados == undefined) {
//             setCompletedRules(0)
//         }
//         setCompletedRules(completados)
//     }, [challenge])
//     console.log(completeRules);
//     const handleNavigate = () => {
//         router.push('/home');
//     };

//     if (loading) {
//         return (
//             <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Stack.Screen
//                     options={{
//                         header: () =>(
//                             <View style={{minHeight:100, margin:0, paddingTop:70, alignItems:'center',  backgroundColor:COLORS.lightWhite}}>
//                                 <View style={{justifyContent:'space-between', flexDirection: "row", width:"90%"}}>
//                                     <ScreenHeaderBtn handlePress={()=>handleNavigate()} iconUrl={icons.close} dimension = '100%'/>
//                                     <ScreenHeaderProfile imageUrl={"http://localhost:9090/public/images/pp.png"} dimension = '100%'/>
//                                 </View>
//                             </View>
//                         )
//                     }}              
//                 />
//                 <Text>Loading...</Text>
//             </SafeAreaView>
//         );
//     }
//     if (error) {
//         return (
//             <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Stack.Screen
//                 x
                
//                 />
//                 <Text>{error}</Text>
//             </SafeAreaView>
//         );
//     }
//     return (
//         <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
//             <Stack.Screen
//                 options={{
//                     header: () =>(
//                         <View style={{minHeight:100, margin:0, paddingTop:70, alignItems:'center',  backgroundColor:COLORS.lightWhite}}>
//                             <View style={{justifyContent:'space-between', flexDirection: "row", width:"90%"}}>
//                                 <ScreenHeaderBtn handlePress={()=>handleNavigate()} iconUrl={icons.close} dimension = '100%'/>
//                                 <ScreenHeaderProfile imageUrl={"http://localhost:9090/public/images/pp.png"} dimension = '100%'/>
//                             </View>
//                         </View>
//                     )
//                 }}
                
//             />
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <View
//                     style={{
//                         flex:1,
//                         paddingTop:50,
//                         padding: SIZES.medium
//                     }}
//                 >
//                     <View style={styles.container}>
//                         <Text style={styles.subTitle}>DESAFIO</Text>
//                         <Text style={styles.parr}>{challenge.title}</Text>
//                     </View>
//                     <View style={styles.container}>
//                         <Text style={styles.subTitle}>FECHA DE DESAFIO</Text>
//                         <Text style={styles.parr}>Inicio: {challenge.startDate}</Text>
//                         <Text style={styles.parr}>Final: {challenge.endDate}</Text>
//                     </View>
//                     <View style={styles.container2}>
//                         <Text style={styles.subTitle}>BITACORA DIA </Text> 
//                         <Text style={styles.done}>{completeRules}/{challenge.rules.length}</Text>
//                     </View>
//                     <View style={styles.container2}>
//                         <Icon name="chevron-left" size={40} color={COLORS.secondary} />
//                         <Text style={styles.subTitle2}> {date} </Text> 
//                     </View>
//                     <View style={styles.containerR}>
//                         <Text style={styles.parrT}>Comportamiento</Text> 
//                         <Text style={styles.parrT}>Valor %</Text>
//                         <Text style={styles.parrT}>Status</Text> 
//                     </View>
//                     <View>
//                         {challenge?.rules?.map((behavior, index) => (
//                         <View style={styles.containerR} key={index}>
//                             <View style={{ flexDirection: "row", alignItems: 'center', width: "33.3%" }}>
//                                 <Text style={styles.parr}>{index + 1}. </Text>
//                                 <Text style={styles.parr}>{behavior.description}</Text>
//                             </View>
//                             <View style={{ flexDirection: "row", alignItems: 'center', width: "33.3%", justifyContent: "center" }}>
//                                 <Text style={styles.parr}>{behavior.points} %</Text>
//                             </View>
//                             <View style={{ flexDirection: "row", alignItems: 'center', width: "33.3%", justifyContent: "center" }}>
//                                 <TouchableOpacity
//                                     style={{
//                                         backgroundColor: behavior.status === 'NA' ? '#2B3859' : behavior.status === 'HECHO' ? '#8CBB38' : '#BB3838',
//                                         padding: 8,
//                                         borderRadius: 5
//                                     }}
//                                     onPress={() => handleStatusChange(index)}
//                                 >
//                                     <Text style={{ color: COLORS.white }}>{behavior.status}</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     ))}
//                     </View>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     )
// }


// const styles = StyleSheet.create({
//     subTitle:{
//       color: COLORS.primary,
//       fontSize: 22,
//       marginBottom:5
//     },

//     subTitle2:{
//         color: COLORS.gray,
//         fontSize: 22,
//         marginBottom:5
//       },
//     done:{
//         color: COLORS.secondary,
//         fontSize: 22,
//         marginBottom:5
//     },
//     containerDate:{
//       width: "100%",
//       backgroundColor: COLORS.primary,
//       minHeight: 28,
//       alignItems:"center",
//       justifyContent:"space-between",
//       flexDirection: "row",
//       padding: 8,
//       borderRadius: 5
//     },
//     textArea: {
//       height: 120,
//       borderWidth: 1,
//       borderColor: '#ccc',
//       padding: 10,
//       marginBottom: 20,
//       textAlignVertical: 'top',
//       borderRadius: 5,
//       color:COLORS.primary
      
//     },
//     logImage:{
//       maxWidth:"100%",
//       height:180
//     },
//     title:{
//       color: COLORS.primary,
//       fontSize: 32,
//       textAlign:"center"
//     },
//     parrcenter:{
//       textAlign:"center",
//       color: COLORS.primary,
//       fontSize: 14,
//       marginBottom: 35
//     },
//     parr:{
//       color: COLORS.gray,
//       fontSize: 14,
//       marginBottom:5
//     },
//     parrT:{
//         color: COLORS.gray,
//         fontSize: 14,
//         width: "33.3%",
//         textAlign:"center"
//     },
//     container:{
//       marginBottom:20
//     },
//     container2:{
//         marginBottom:20,
//         flexDirection:  "row",
//         alignItems: "center"
//     },
//     containerR:{
//         marginBottom:20,
//         flexDirection:  "row",
//         alignItems: "center",
//         borderTopWidth:.2,
//         borderBottomWidth:.2,
//         height:38
//     }
//   });

// export default Bitacora;





import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
import icons from '../constants/icons';
import ScreenHeaderProfile from '../components/common/header/ScreenHeaderProfile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo';
import images from '../constants/images';

const Bitacora = () => {
    const router = useRouter();
    const localParams = useLocalSearchParams();
    const [challenge, setChallenge] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10)); // Today's date
    const [behaviors, setBehaviors] = useState([]);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/challenges/${localParams.id}`);
                setChallenge(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching challenges:', error);
                setError('Error fetching challenges');
                setLoading(false);
            }
        };
        fetchChallenge();
    }, []);

    useEffect(() => {
        if (challenge.rules) {
            const progressForDate = challenge.progress?.find(progress => progress.date.slice(0, 10) === currentDate);
            const behaviorsWithStatus = challenge.rules.map(rule => {
                const completedRule = progressForDate?.completedRules.find(cr => cr.rule._id === rule._id);
                return {
                    ...rule,
                    status: completedRule ? (completedRule.status === 'completed' ? 'HECHO' : 'FALLO') : 'NA'
                };
            });
            setBehaviors(behaviorsWithStatus);
        }
    }, [challenge, currentDate]);

    const handleStatusChange = (index) => {
        if (currentDate !== new Date().toISOString().slice(0, 10)) return; // Only allow changes for today

        const updatedBehaviors = [...behaviors];
        const currentStatus = updatedBehaviors[index].status;

        // Cycle through statuses: NA -> HECHO -> FALLO -> NA
        if (currentStatus === "NA") {
            updatedBehaviors[index].status = "HECHO";
        } else if (currentStatus === "HECHO") {
            updatedBehaviors[index].status = "FALLO";
        } else if (currentStatus === "FALLO") {
            updatedBehaviors[index].status = "NA";
        }

        setBehaviors(updatedBehaviors);

        // Update the backend
        const updatedRules = updatedBehaviors.filter(behavior => behavior.status === "HECHO").map(behavior => behavior._id);
        axios.post(`http://localhost:9090/api/challenges/${localParams.id}/progress`, {
            date: currentDate,
            completedRules: updatedRules
        }).then(response => {
            console.log('Progress updated successfully:', response.data);
        }).catch(error => {
            console.error('Error updating progress:', error);
        });
    };

    const handleNavigate = () => {
        router.push('/home');
    };

    const handleDateChange = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + direction);

        const today = new Date().toISOString().slice(0, 10);
        const newDateString = newDate.toISOString().slice(0, 10);

        if (newDateString > today) return; // Prevent navigation to future dates

        setCurrentDate(newDateString);
    };

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Stack.Screen
                    options={{
                        header: () => (
                            <View style={{ minHeight: 100, margin: 0, paddingTop: 70, alignItems: 'center', backgroundColor: COLORS.lightWhite }}>
                                <View style={{ justifyContent: 'space-between', flexDirection: "row", width: "90%" }}>
                                    <ScreenHeaderBtn handlePress={() => handleNavigate()} iconUrl={icons.close} dimension='100%' />
                                    <ScreenHeaderProfile imageUrl={"http://localhost:9090/public/images/pp.png"} dimension='100%' />
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
                <Stack.Screen />
                <Text>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <View style={{ minHeight: 100, margin: 0, paddingTop: 70, alignItems: 'center', backgroundColor: COLORS.lightWhite }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: "row", width: "90%" }}>
                                <ScreenHeaderBtn handlePress={() => handleNavigate()} iconUrl={icons.close} dimension='100%' />
                                <ScreenHeaderProfile imageUrl={"http://localhost:9090/public/images/pp.png"} dimension='100%' />
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
                    <View style={styles.container}>
                        <Text style={styles.subTitle}>DESAFIO</Text>
                        <Text style={styles.parr}>{challenge.title}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.subTitle}>FECHA DE DESAFIO</Text>
                        <Text style={styles.parr}>Inicio: {challenge.startDate}</Text>
                        <Text style={styles.parr}>Final: {challenge.endDate}</Text>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.subTitle}>BITACORA DIA </Text>
                        <Text style={styles.done}>{behaviors.filter(b => b.status === 'HECHO').length}/{challenge.rules.length}</Text>
                    </View>
                    <View style={styles.container2}>
                        <TouchableOpacity onPress={() => handleDateChange(-1)}>
                            <Icon name="chevron-left" size={40} color={COLORS.secondary} />
                        </TouchableOpacity>
                        <Text style={styles.subTitle2}> {currentDate} </Text>
                        <TouchableOpacity onPress={() => handleDateChange(1)}>
                            <Icon name="chevron-right" size={40} color={COLORS.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerR}>
                        <Text style={styles.parrT}>Comportamiento</Text>
                        <Text style={styles.parrT}>Valor %</Text>
                        <Text style={styles.parrT}>Status</Text>
                    </View>
                    <View>
                        {behaviors.map((behavior, index) => (
                            <View style={styles.containerR} key={index}>
                                <View style={{ flexDirection: "row", alignItems: 'center', width: "33.3%" }}>
                                    <Text style={styles.parr}>{index + 1}. </Text>
                                    <Text style={styles.parr}>{behavior.description}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: 'center', width: "33.3%", justifyContent: "center" }}>
                                    <Text style={styles.parr}>{behavior.points} %</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: 'center', width: "33.3%", justifyContent: "center" }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: behavior.status === 'NA' ? '#2B3859' : behavior.status === 'HECHO' ? '#8CBB38' : '#BB3838',
                                            padding: 8,
                                            borderRadius: 5
                                        }}
                                        onPress={() => handleStatusChange(index)}
                                        disabled={currentDate !== new Date().toISOString().slice(0, 10)}
                                    >
                                        <Text style={{ color: COLORS.white }}>{behavior.status}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};






const styles = StyleSheet.create({
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
      marginBottom:5
    },
    parrT:{
        color: COLORS.gray,
        fontSize: 14,
        width: "33.3%",
        textAlign:"center"
    },
    container:{
      marginBottom:20
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
export default Bitacora;