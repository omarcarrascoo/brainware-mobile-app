import { Image, TouchableOpacity } from "react-native";

import styles from "./screenheader.style";

const ScreenHeaderLogo = ({ imageUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.logoContainer} onPress={handlePress}>
      <Image
        source={imageUrl}
        resizeMode='cover'
        style={styles.logoImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderLogo;
