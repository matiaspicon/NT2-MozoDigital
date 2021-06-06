import React, { useEffect, useState } from "react";
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

export default function Cliente({ navigation }) {  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function validarLogin() {
    fetch("https://gentle-hamlet-44521.herokuapp.com/api/usuarios/login", {
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
        console.log(respuestaJson);        
        return respuestaJson;
      })
      .catch((error) => {
        console.error(error);
      });

      navigation.navigate("Encargado")
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
