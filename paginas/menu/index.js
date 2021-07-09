import React, { useEffect, useState, useContext } from "react";
import { ScrollView, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import Menu from "./menu";
import { SearchBar } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import GlobalContext from "../../components/global/context";

export default function Index({ navigation }) {
  const [platos, setMenu] = useState([]);
  const [filtro, setFiltro] = useState("");

  const context = useContext(GlobalContext);

  //console.log("NAVIGATION INDEX:", navigation);

  async function buscaMenu() {
      if (context.user.rol != "Encargado") {
        await axios.get("https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/" + context.restaurante.idRestaurante + "/sucursales/" + context.restaurante.idSucursal)
        .then(response => { 
          console.log(response)
          setMenu(
            response.data.menu.filter((plato) =>
              plato.titulo.toLowerCase().includes(filtro.toLowerCase()) && plato.habilitado == true
            )
          );
        })
        .catch(error => {
            console.log(error.response)
        });
      } else {
        await axios.get("https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/" + context.restaurante.idRestaurante + "/sucursales/" + context.restaurante.idSucursal)
        .then(response => { 
          console.log(response)
          setMenu(
            response.data.menu.filter((plato) =>
              plato.titulo.toLowerCase().includes(filtro.toLowerCase())
            )
          );
        })
        .catch(error => {
            console.log(error.response)
        });
      }
  }


  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused.
      //alert('Home Screen was focused');
      console.log("LA PANTALLA ESTA FOCUSED")
      setTimeout(() => {
        buscaMenu();
      }, 1000);
      return () => {
     // Do something when the screen is unfocused
     //alert('Home Screen was unfocused');
      };
    }, [])
  );


  useEffect(() => {
    buscaMenu();
  }, [filtro]);

  const cambiaFiltro = (filtro) => {
    setFiltro(filtro);
  };


  if (context.user.rol != "Encargado") {
    return (
      <>
        <SearchBar
          placeholder="Buscar"
          onChangeText={(text) => setFiltro(text)}
          value={filtro}
          round="true"
        />
        <ScrollView>
          <Menu navigation={navigation} platos={platos} />
        </ScrollView>
      </>
    );
  } else {
    return (
      <>
        <SearchBar
          placeholder="Buscar"
          onChangeText={(text) => setFiltro(text)}
          value={filtro}
          round="true"
        />
        <ScrollView>
          <Menu navigation={navigation} platos={platos} />
          <TouchableOpacity
            style={styles.buttonAddItem}
            onPress={() =>
              navigation.navigate("Agregar Item", {buscaMenu})
            }
          >
            <Text style={styles.addTitle}> Agregar Item</Text>
          </TouchableOpacity>
        </ScrollView>

      </>
    );
  }
}  
  
const styles = StyleSheet.create({
  buttonAddItem: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#EE3D3D",
    borderRadius: 0,
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