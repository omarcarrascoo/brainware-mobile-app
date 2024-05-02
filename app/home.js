import { Stack, useRouter } from 'expo-router';
import {View, Text, SafeAreaView, ScrollView} from 'react-native'
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


const Home = () =>{
    const router = useRouter();


    return (
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft: ()=>(
                        <ScreenHeaderLogo imageUrl={images.logoBrainWare} dimension = '80%'/>
                    ),
                    headerRight: ()=>(
                        <ScreenHeaderProfile imageUrl={"https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"} dimension = '100%'/>
                    ),
                    headerTitle:""
                }}
                
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex:1,
                        padding: SIZES.medium
                    }}
                >
                    <BrainWareChallengesResume/>
                    <BrainWareBitacoreList/>
                    
                </View>
            </ScrollView>
            <View >
                <MainFooter/>
            </View>
        </SafeAreaView>
    )
}

export default Home;