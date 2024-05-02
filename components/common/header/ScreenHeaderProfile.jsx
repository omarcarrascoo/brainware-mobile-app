import { Image, TouchableOpacity } from "react-native";

import styles from "./screenheader.style";

const ScreenHeaderProfile = ({ imageUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity style={styles.profileContainer} onPress={handlePress}>
      <Image
        source={{uri:imageUrl}}
        resizeMode='cover'
        style={styles.profileImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderProfile;
