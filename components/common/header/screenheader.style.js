import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";


const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    // backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),

  profileContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: 30,
  }),


  logoContainer: {
    width: 150,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImg: (dimension) => ({
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }),

});

export default styles;
