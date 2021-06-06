import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";
import Pedidos from "./pedidos";
import { SearchBar } from "react-native-elements";

export default function Index({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("");

  console.log("LISTADO PEDIDOS:", navigation);

  function buscaMenu() {
    const f = fetch("https://gentle-hamlet-44521.herokuapp.com/api/pedidos");
    return f
      .then((res) => res.json())
      .then((pedidos) => {
        console.log("Pedidos: ", pedidos);
        setPedidos(
          pedidos
          //pedidos.menu.filter((plato) =>
          //plato.titulo.toLowerCase().includes(filtro.toLowerCase())
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
    <SafeAreaView style={styles.container}>
      <View>
        <Text>PANTALLA DE PEDIDOS</Text>
        <SearchBar
          placeholder="Buscar"
          //onChangeText={(text) => cambiaFiltro(text)}
          //value={filtro}
          round="true"
        />
        <ScrollView>
        <Pedidos navigation={navigation} pedidos={pedidos} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
