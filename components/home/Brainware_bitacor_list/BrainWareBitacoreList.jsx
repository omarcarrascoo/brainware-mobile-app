import { ScrollView, Text, View } from "react-native"
import DesafioCard from "../../common/cards/desafioCard/DesafioCard"
import styles from "./brainWareBitacoreList.styles"


const BrainWareBitacoreList = ()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>BITACORA DE MIS DESAFIOS</Text>
            <ScrollView horizontal>
                <DesafioCard/>
                <DesafioCard/>
                <DesafioCard/>
                <DesafioCard/>
            </ScrollView>
        </View>
    )
}


export default BrainWareBitacoreList