import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import GlobalContext from "../../components/global/context";
import axios from "axios";

export default function Cliente({ navigation }) {  
  const context = useContext(GlobalContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    console.log("CONTEXTO ACTUALIZADO", context);
   },[context.user])

 async function validarLogin() {

  /*
    //fetch("https://gentle-hamlet-44521.herokuapp.com/api/usuarios/login", {
      fetch("http://localhost:3000/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //email: email, //-->NO BORRAR 
        //password: password, //-->NO BORRAR 
        email: "admin@mozodigital.com", //email HARDCODEADO
        password: "1234",               //password HARDCODEADO
      }),
    })
      .then((response) => response.json())
      .then((respuestaJson) => {
        context.setUser({
          nombre: respuestaJson.usuario.nombre,
          mail: respuestaJson.usuario.email,
          rol: respuestaJson.usuario.rol,
          token: respuestaJson.token,
        })

        return respuestaJson;
      })
      .catch((error) => {
        console.error(error);
      });*/

      await axios.post("https://gentle-hamlet-44521.herokuapp.com/api/usuarios/login", {
        //email: "encargado@mozodigital.com", //email HARDCODEADO
        //email: "cocinero@mozodigital.com", //email HARDCODEADO
        password: "1234",               //password HARDCODEADO
        email: email, 
        //password: password
      })
      .then(response => { 
        console.log(response)

        context.setUser({
          nombre: response.data.usuario.nombre,
          mail: response.data.usuario.email,
          rol: response.data.usuario.rol,
          token: response.data.token,
        })

        console.log("ACA LO QUE QUIERO VER",response.data.usuario.rol)
        console.log("NAVIGATION POR ACA:",navigation)
  
        if(response.data.usuario.rol == "Encargado") {
          navigation.navigate("Encargado");
        }
        if(response.data.usuario.rol == "Cocinero") {
          navigation.navigate("Cocinero");
        }
      })
      .catch(error => {
        console.log(error.response)
        navigation.navigate("AppCliente")
      });
     
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginVertical: 40,
          marginHorizontal: 20,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Input
          placeholder="Email"
          leftIcon={
            <Icon type="font-awesome" name="envelope" size={20} color="grey" />
          }
          style={styles}
          onChangeText={(email) => setEmail(email)}
        />

        <Input
          placeholder="Password"
          leftIcon={
            <Icon type="font-awesome" name="lock" size={30} color="grey" />
          }
          style={styles}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity
          style={styles.ingresarBtn}
          onPress={() => navigation.navigate("AppCliente")}
        >
          <Text style={styles.addTitle}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ingresarBtn}
          onPress={() => validarLogin()}
        >
          <Text style={styles.addTitle}>Validar Usuario</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBtn: {
    backgroundColor: "#E6E6E6",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 100,
    margin: 20,
    padding: 10,
    height: 40,
  },
  ingresarBtn: {
    alignItems: "center",
    backgroundColor: "#EE3D3D",
    borderRadius: 40,
    padding: 8,
  },
  addTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});
