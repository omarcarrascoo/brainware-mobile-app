import { Text, View } from "react-native"
import { COLORS, SIZES } from "../../../constants/theme"
import styles from "./MainFooter.styles"
import Icon from 'react-native-vector-icons/FontAwesome';


const MainFooter = () =>{
    return(
        <View style={styles.container}>
            {/* <View style={styles.btnContainer}><Icon name="group" size={40} color={COLORS.secondary} /><Text style={styles.title}>Equipo</Text></View> */}
            <View style={styles.btnContainer}><View style={styles.shadow}><Icon name="plus" size={40} color={COLORS.secondary} /></View><Text style={styles.title}>Desafio</Text></View>
            {/* <View style={styles.btnContainer}><Icon name="signal" size={40} color={COLORS.secondary} /><Text style={styles.title}>Estadísticas</Text></View> */}
        </View>
    )
}

export default MainFooter