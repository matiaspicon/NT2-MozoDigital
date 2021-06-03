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

export default function Cliente({navigation}) {
  const [credenciales, setCredenciales] = useState();

  function login() {
    const loginRequest = fetch("http://localhost:3000/api/usuarios/login");
    return loginRequest
      .then((res) => res.json())
      .then((respuestaJson) => {
        console.log("Totek: ", respuestaJson);
        setCredenciales(respuestaJson);
      })
      .catch((error) => console.log("Fallo:" + error));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginVertical: 40, marginHorizontal: 20 , flex: 1, justifyContent: 'center', }}>
        <Input
          placeholder="Email"
          leftIcon={
            <Icon type="font-awesome" name="envelope" size={20} color="grey" />
          }
          style={styles}
          onChangeText={(value) => this.setState({ comment: value })}
        />

        <Input
          placeholder="Password"
          leftIcon={
            <Icon type="font-awesome" name="lock" size={30} color="grey" />
          }
          style={styles}
          onChangeText={(value) => this.setState({ comment: value })}
        />

        <TouchableOpacity style={styles.ingresarBtn} onPress={() => navigation.navigate("AppCliente")}>
          <Text style={styles.addTitle}>Ingresar</Text>
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
