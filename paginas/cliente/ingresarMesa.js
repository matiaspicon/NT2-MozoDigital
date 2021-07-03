import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Input } from "react-native-elements";

export default function IngresarMesa({ navigation }) {
  const [ingresoHabilitado, setIngresoHabilitado] = useState(false);
  const [mesaValidationError, setMesaValidationError] = useState("");
  const [mesa, setMesa] = useState("");

  useEffect(() => {
    if (mesa != "") {
      setIngresoHabilitado(true);
    } else {
      setIngresoHabilitado(false);
    }
  }, [mesa]);

  function validarMesa(mesa) {
    const numberRegex = /^[0-9]+$/;
    if (numberRegex.test(mesa)) {
      setMesaValidationError("");
      setMesa(mesa);
    } else if (mesa != "") {
      setMesaValidationError("Solo se aceptan caracteres numericos");
      setMesa("");
    } else {
      setMesaValidationError("");
      setMesa("");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.tituloBienvenida}>Bienvenido a Mozo Digital</Text>

        <Input
          onChangeText={(mesa) => validarMesa(mesa)}
          placeholder="Ingrese el numero de mesa"
          keyboardType="numeric"
          renderErrorMessage="false"
          inputContainerStyle={styles.inputContainer}
          errorMessage={mesaValidationError}
          errorStyle={styles.errorStyle}
          style={styles.inputMesa}
        />

        <TouchableOpacity
          style={
            !ingresoHabilitado ? styles.irAMenuBtnDisabled : styles.irAMenuBtn
          }
          onPress={() => navigation.navigate("Cliente", mesa)}
          disabled={!ingresoHabilitado}
        >
          <Text style={styles.irAMenuTitle}>Ir a Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    justifyContent: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  irAMenuBtn: {
    alignItems: "center",
    backgroundColor: "#EE3D3D",
    borderRadius: 40,
    padding: 8,
    marginHorizontal: 30,
    marginTop: 20,
    width: 170,
  },
  irAMenuBtnDisabled: {
    alignItems: "center",
    backgroundColor: "#EE3D3D",
    borderRadius: 40,
    padding: 8,
    marginHorizontal: 30,
    marginTop: 20,
    width: 170,
    opacity: 0.5,
  },
  irAMenuTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  inputMesa: {
    borderColor: "black",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 20,
    borderBottomWidth: 0,
  },
  tituloBienvenida: {
    fontSize: 20,
  },
  errorStyle: {
    textAlign: "center",
  },
  inputContainer: {
    borderBottomWidth: 0,
    textAlign: "center",
    borderColor: "red",
  },
});
