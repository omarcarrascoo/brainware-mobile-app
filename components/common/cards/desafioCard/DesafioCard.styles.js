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
        marginTop: 8,
    },
    parr:{
        fontSize:SIZES.medium,
        color: COLORS.secondary,
        marginTop: 3
    },
    count:{
        fontSize: SIZES.large * 2,
        color: COLORS.secondary
    },
    img:{
       width: "100%",
       height: "45%" 
    },
    btn:{
        backgroundColor:COLORS.secondary,
        alignItems:'center',
        justifyContent:'center',
        padding: 12,
        borderRadius:8, 
        marginTop:20
    },
    btnTitle:{
        color:COLORS.white
    }
})

export default styles;