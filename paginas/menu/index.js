import React, { useEffect, useState } from "react";
import { ScrollView, TextInput } from "react-native";
import Menu from "./menu";
import { SearchBar } from "react-native-elements";

export default function Index({ navigation }) {
  const [platos, setMenu] = useState([]);
  const [filtro, setFiltro] = useState("");

  console.log("NAVIGATION INDEX:", navigation);

  function buscaMenu() {
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
      .catch((error) => console.log("Fallo:" + error));
  }

  useEffect(() => {
    buscaMenu();
  }, []);

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
