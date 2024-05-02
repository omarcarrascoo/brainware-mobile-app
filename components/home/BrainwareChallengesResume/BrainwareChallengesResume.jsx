import { useRouter } from "expo-router";
import styles from "./BrainwareChallengesResume.style";
import { Text, View } from "react-native";

const BrainWareChallengesResume = () =>{
    const router = useRouter();
    return(
        <View style={styles.counter}>
            <Text style={styles.title}>COMPORTAMIENTOS DE DIA</Text>
            <Text style={styles.parr}>
                Estos son los comportamientos diarios que has cumplido hoy de todos tus desafios. 
            </Text>
            <Text style={styles.count}>20 / 30</Text>
        </View>
    )
}

export default BrainWareChallengesResume