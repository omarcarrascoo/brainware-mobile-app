import { Stack, useRouter } from 'expo-router';
import {View, Text, SafeAreaView, ScrollView, Button, TouchableOpacity} from 'react-native'
import { COLORS, SIZES } from '../constants/theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
import icons from '../constants/icons';
import ScreenHeaderLogo from '../components/common/header/ScreenHeaderLogo';
import ScreenHeaderProfile from '../components/common/header/ScreenHeaderProfile';
import images from '../constants/images';
import BrainWareChallengesResume from '../components/home/BrainwareChallengesResume/BrainwareChallengesResume';
import BrainWareBitacoreList from '../components/home/Brainware_bitacor_list/BrainWareBitacoreList';
import MainFooter from '../components/common/footer/MainFooter';
import CreateDesafio from '../components/createDesafio/CreateDesafio';
import BrainWareCreateDesafio from '../components/createDesafio/CreateDesafio';


const CreateChallenge = () =>{
    const router = useRouter();


    return (
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.primary}}>
            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor: COLORS.primary},
                    headerShadowVisible: false,
                    headerLeft: ()=>(
                        <ScreenHeaderBtn iconUrl={icons.chevronLeft} dimension = '60%'/>
                    ),
                    // headerRight: ()=>(
                    //     <ScreenHeaderProfile imageUrl={"https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"} dimension = '100%'/>
                    // ),
                    headerTitle:()=>(
                        <ScreenHeaderLogo iconUrl={images.d1} dimension = '80%'/>
                    ),
                }}
            />
            <ScrollView 
                showsVerticalScrollIndicator={false}  
                style={{
                        flex:1,
                        padding: SIZES.medium
                }}
            >
                <BrainWareCreateDesafio/>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.secondary,
                        padding: 15,
                        borderRadius: 5,
                        alignItems: 'center',
                        marginBottom: 50
                    }}
                    onPress={() => {
                        console.log('Button pressed!');
                    }}
                >
                    <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Continuar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateChallenge;