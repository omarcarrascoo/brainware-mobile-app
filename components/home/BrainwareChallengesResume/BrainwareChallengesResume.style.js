import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    counter:{
        paddingTop: 80
    },
    title:{
        fontSize: SIZES.large,
        color: COLORS.primary
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