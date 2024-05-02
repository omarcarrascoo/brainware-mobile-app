
import { Image, Text, View } from "react-native"
import styles from "./DesafioCard.styles"

const DesafioCard = () =>{
        // img2 = Objeto de la foto
        // img2 = img2.replaceFirst("/sharedBy/appLinkName/","/file/elecantoclubapp/democlubembers/");
		// img2 = img2.replaceFirst("appLinkName”,”democlubembers”);
		// img2 = img2.replaceFirst("viewLinkName","ImagenesNoticias");
		// img2 = img2.replaceFirst("fieldName”,img2.ID + “/img”);
		// img2 = img2.replaceFirst("image","image-download?filepath=");
		// img2 = img2.replaceAll("<img ","<img height=200px width=200px ");

        // https://creator.zoho.com/api/v2/file/elecantoclubapp/democlubembers/report/Noticias1/4386661000002914119/img/image-download?filepath=1705941427090_docu.jpeg
        // https://creator.zoho.com/api/v2/file/elecantoclubapp/democlubembers/Noticias1/4386661000002914119/img/image-download?filepath=1705941427090_docu.jpeg
        // https://creator.zoho.com/api/v2/file/elecantoclubapp/democlubembers/report/Noticias1/4386661000002914119/img/download?filepath=1705941427090_docu.jpeg

    return(
        <View style = {styles.container}>
            <Image
                style={styles.img}
                source={{uri:"https://www.lanacion.com.ar/resizer/v2/el-ejercicio-moderado-contribuye-a-la-salud-O3YUOSSVLBDITOASJGAWK7D4DM.jpg?auth=f4c43867890f9ac53c66f888f3a617a6814c4bf30e2d18e49994bc32e33ea029&width=420&height=280&quality=70&smart=true"}}
            />
            <Text style = {styles.title}>Desafio</Text>
            <Text style = {styles.parr}>Comunicar de forma efectiva una idea o mensaje</Text>

            <Text style = {styles.title}>Comportaminetos</Text>
            <Text style = {styles.parr}>4/7</Text>
        </View>
    )
}

export default DesafioCard



