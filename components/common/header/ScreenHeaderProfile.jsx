import { Image, TouchableOpacity } from "react-native";

import styles from "./screenheader.style";
import { useRouter } from "expo-router";

const ScreenHeaderProfile = ({ imageUrl, dimension, handlePress }) => {
  const router = useRouter()
  return (
    <TouchableOpacity style={styles.profileContainer} onPress={()=>router.push("/profile")}>
      <Image
        source={{uri:imageUrl}}
        resizeMode='cover'
        style={styles.profileImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderProfile;
