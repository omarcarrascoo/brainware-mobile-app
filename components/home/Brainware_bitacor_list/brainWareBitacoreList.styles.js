import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container:{
        paddingTop: 40
    },
    title:{
        fontSize: SIZES.large,
        color: COLORS.primary,
        marginBottom: 14
    },
    parr:{
        fontSize:SIZES.small
    },
    count:{
        fontSize: SIZES.large * 2,
        color: COLORS.secondary
    },
})

export default styles;