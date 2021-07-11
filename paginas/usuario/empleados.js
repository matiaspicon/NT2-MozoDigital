import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import Menu from "./menu";
import { SearchBar } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import GlobalContext from "../../components/global/context";
import Usuario from "./usuario";


export default function Empleados({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const context = useContext(GlobalContext);

  async function buscaUsuarios() {
    await axios.get("https://gentle-hamlet-44521.herokuapp.com/api/usuarios", {
      headers: { Authorization: `Bearer ${context.user.token}` }})
          .then(response => { 
            setUsuarios(
              response.data.filter((usuario) =>
                (usuario.nombre.toLowerCase().includes(filtro.toLowerCase()) || usuario.email.toLowerCase().includes(filtro.toLowerCase()))
                 && usuario.rol != "Cliente" && usuario.restaurante == context.restaurante.idRestaurante && usuario.sucursal == context.restaurante.idSucursal
              )
            );
          })
          .catch(error => {
              console.log(error.response)
          });
  }

  useEffect(() => {
    buscaUsuarios();
  }, [filtro]);



 useFocusEffect(
    React.useCallback(() => {
      buscaUsuarios();  
      const timeOut = setTimeout(() => {
        buscaUsuarios();
      }, 1000);
      return () => {
        clearTimeout(timeOut)
      };
    }, [])
  );

  const cambiaFiltro = (filtro) => {
    setFiltro(filtro);
  };

  return (
    <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Buscar"
          onChangeText={(text) => setFiltro(text)}
          value={filtro}
          round="true"
        />
        <ScrollView>
        {usuarios &&
          usuarios.map((usuario, index) => (
            <View key={index} style={styles.empleadosContainer}>
              <Usuario navigation={navigation} usuario={usuario} buscaUsuarios={buscaUsuarios} />
            </View>
          ))}

          <TouchableOpacity
            style={styles.buttonAddItem}
            onPress={() =>
              navigation.navigate("Agregar Empleado", {buscaUsuarios})
            }
          >
            <Text style={styles.addTitle}> Agregar Empleado</Text>
          </TouchableOpacity>
        </ScrollView>
      
    </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empleadosContainer: {
    //elevation: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonAddItem: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#EE3D3D",
    borderRadius: 40,
    padding: 8,
    margin: 10,
    height: 40,
  },
  addTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  }
});