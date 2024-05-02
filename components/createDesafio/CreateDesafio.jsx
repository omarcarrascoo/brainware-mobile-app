import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import DatePicker from 'react-native-date-picker'
import { COLORS } from "../../constants/theme";
import images from "../../constants/images";

const BrainWareCreateDesafio = ()=>{
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [text, setText] = useState('');

    const handleTextChange = (newText) => {
        setText(newText);
    };

  console.log(date);
    return(
        <View style={styles.containerDesafio}>
            <Text style={styles.title}>CREAR DESAFIO</Text>
            <Text style={styles.parrcenter}>UN DESAFIO ES ALGO QUE TE RETA A SER MEJOR Y ESTO ES SOLO UN TEXTO DE RELLENO</Text>

            <View style={styles.container}>
                <Text style={styles.subTitle}>Desafio</Text>
                <Text style={styles.parr}>Escribe acerca de tu desafio... </Text>
                <Text style={styles.parr}>Ej. Tener mayor participación en las juntas del trabajo</Text>
                <TextInput
                style={styles.textArea}
                multiline={true}
                numberOfLines={4} 
                placeholder="Escribe acerca de tu desafio... Ej. Tener mayor participación en las juntas del trabajo"
                value={text}
                onChangeText={handleTextChange}
                />
            </View>

            <View style={styles.container} >
                <Text style={styles.subTitle}>Fecha de finalizacion</Text>

                <TouchableOpacity onPress={() => setOpen(true)}>
                  <View style={styles.containerDate} >
                    <Text>{date.toLocaleDateString()}</Text>
                  </View>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />    
            </View>
            <View style={styles.container} >
                <Text style={styles.subTitle}>Imagen</Text>
                <Text style={styles.parr}>Agrega una imagen para que sea fácil identificarlo en el panel</Text>
                <TouchableOpacity onPress={() => setOpen(true)}>
                <Image
                  source={images.imageUp}
                  resizeMode='contain'
                  style={styles.logImage}
                />
                </TouchableOpacity>  
            </View>
         </View>
    )
}
const styles = StyleSheet.create({
  subTitle:{
    color: COLORS.white,
    fontSize: 22,
    marginBottom:5
  },
  containerDate:{
    width: "100%",
    backgroundColor: COLORS.white,
    minHeight: 28,
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection: "row",
    padding: 8,
    borderRadius: 5
  },
  textArea: {
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    borderRadius: 5
    
  },
  logImage:{
    maxWidth:"100%",
    height:180
  },
  title:{
    color: COLORS.white,
    fontSize: 32,
    textAlign:"center"
  },
  parrcenter:{
    textAlign:"center",
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 35
  },
  parr:{
    color: COLORS.white,
    fontSize: 14,
    marginBottom:5
  },
  container:{
    marginBottom:20
  }
});

export default BrainWareCreateDesafio
