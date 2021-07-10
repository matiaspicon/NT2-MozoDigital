import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Icon } from "react-native-elements";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Platform
} from "react-native";
import { Input } from "react-native-elements";
import GlobalContext from "../../components/global/context";
import axios from "axios";

export default function Login({ navigation, route }) {
  const context = useContext(GlobalContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [emailValidationError, setEmailValidationError] = useState("");

  useEffect(() => {
    console.log("CONTEXTO ACTUALIZADO", context);
  }, [context.user]);

  async function validarLogin() {
    await axios
      .post("https://gentle-hamlet-44521.herokuapp.com/api/usuarios/login", {
        //email: "encargado@mozodigital.com", //email HARDCODEADO
        //email: "cocinero@mozodigital.com", //email HARDCODEADO
        //email: "mozo@mozodigital.com", //email HARDCODEADO
        //email: "cliente@mozodigital.com", //email HARDCODEADO
        password: "1234", //password HARDCODEADO
        //email: email+"@mozodigital.com",
        //password: password
        email: email,
      })
      .then((response) => {
        console.log(response);
        
        console.log("Usuario: ", response.data.usuario);
        
        if (response.data.usuario.rol != "Cliente") {
          context.setRestaurante({...context.restaurante, idRestaurante: response.data.usuario.restaurante, idSucursal: response.data.usuario.sucursal})
        }
        
        if (response.data.usuario.rol == "Mozo") {
          context.setUser({nombre: response.data.usuario.nombre,
            _id: response.data.usuario._id,
            mail: response.data.usuario.email,
            rol: response.data.usuario.rol,
            token: response.data.token,
            mesas: response.data.usuario.mesas});
          navigation.navigate("Mozo");
        }

        context.setUser({
          _id: response.data.usuario._id,
          nombre: response.data.usuario.nombre,
          mail: response.data.usuario.email,
          rol: response.data.usuario.rol,
          token: response.data.token,
        });

        
        //console.log("NAVIGATION POR ACA:", navigation);
        
        if (response.data.usuario.rol == "Cliente") {
          if(Platform.OS != 'web') navigation.navigate("CodigoQR");
          else navigation.navigate("IngresarMesa")
        }


        if (response.data.usuario.rol == "Encargado") {
          navigation.navigate("Encargado");
        }
        if (response.data.usuario.rol == "Cocinero") {
          navigation.navigate("Cocinero");
        }
        
      })
      .catch((error) => {
        console.log("ERROR", error.response);
        setError(error.response);
      });
  }

  function validateEmail(email) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
      setEmailValidationError("");
      setEmail(email);
    } else if (email != "") {
      setEmailValidationError("Ingrese una direccion de mail válida");
    } else {
      setEmailValidationError("");
    }
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
        <View>
          {error && <Text style={styles.errorText}>{error.data}</Text>}
        </View>
        <Input
          placeholder="Email"
          autoCompleteType='email'
          leftIcon={
            <Icon type="font-awesome" name="envelope" size={20} color="grey" />
          }
          style={styles}
          onChangeText={(email) => validateEmail(email)}
          errorMessage={emailValidationError}
        />

        <Input
          placeholder="Password"
          autoCompleteType='password'
          secureTextEntry={true}
          leftIcon={
            <Icon type="font-awesome" name="lock" size={30} color="grey" />
          }
          style={styles}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity
          style={styles.ingresarBtn}
          onPress={() => validarLogin()}
        >
          <Text style={styles.addTitle}>Validar Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ingresarBtn}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.addTitle}>Registrarse</Text>
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
    marginBottom: 10,
  },
  addTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  errorText: {
    color: "#ff0000",
    fontWeight: "600",
    fontSize: 25,
  },
});
