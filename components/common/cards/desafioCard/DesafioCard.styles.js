import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../constants/theme";

const styles = StyleSheet.create({
    container:{
       backgroundColor: COLORS.primary,
       width: 260,
       padding: 10,
       borderRadius: 5,
       marginRight: 5,
       minHeight: 340
    },
    title:{
        fontSize: SIZES.medium,
        color: COLORS.white,
        marginTop: 5
    },
    parr:{
        fontSize:SIZES.small,
        color: COLORS.white
    },
    count:{
        fontSize: SIZES.large * 2,
        color: COLORS.secondary
    },
    img:{
       width: "100%",
       height: "50%" 
    }
})

export default styles;