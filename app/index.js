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
import Home from './home';


const Index = () =>{
    const router = useRouter();


    return (
        <Home/>
    )
}

export default Index;