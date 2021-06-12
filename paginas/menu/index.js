import React, { useEffect, useState } from "react";
import { ScrollView, TextInput } from "react-native";
import Menu from "./menu";
import { SearchBar } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

export default function Index({ navigation }) {
  const [platos, setMenu] = useState([]);
  const [filtro, setFiltro] = useState("");

  console.log("NAVIGATION INDEX:", navigation);

  async function buscaMenu() {

    /*
    const f = fetch(
      "https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/60ad9d02a7ec12baac4d59e1/sucursales/0"
    );
    return f
      .then((res) => res.json())
      .then((json_extraido) => {
        console.log("Platos: ", json_extraido);
        setMenu(
          json_extraido.menu.filter((plato) =>
            plato.titulo.toLowerCase().includes(filtro.toLowerCase())
          )
        );
      })
      .catch((error) => console.log("Fallo:" + error));*/

      await axios.get("http://localhost:3000/api/restaurantes/60ad9d02a7ec12baac4d59e1/sucursales/0")
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
}
