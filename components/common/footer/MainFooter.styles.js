import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container:{
        padding:SIZES.medium,
        paddingHorizontal:SIZES.medium * 2,
        flexDirection: "row",
        justifyContent: "center"
    },
   btnContainer:{

    width: 90,
    alignItems: "center",
    justifyContent:"center"
   },
   title:{
    fontSize: SIZES.medium
   },
   shadow:{
    backgroundColor: COLORS.primary,
    width: 53,
    height: 53,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center"
   }
})

export default styles;