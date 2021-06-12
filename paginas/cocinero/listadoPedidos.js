import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";
import Pedidos from "./pedidos";
import { SearchBar } from "react-native-elements";
import axios from "axios";

export default function Index({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("");

  console.log("LISTADO PEDIDOS:", navigation);

  function buscarPedidos() {
    let i = 0;
    console.log("BUSCO PEDIDOS 1", i++);
    /*
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
      .catch((error) => console.log("Fallo:" + error));*/

      axios.get("http://localhost:3000/api/pedidos")
      .then(response => { 
        console.log("ACA LA RESPUESTA", response)
        setPedidos(
          response.data.filter((pedido) =>
            //console.log("PEDIDO", pedido.estado)
            pedido.estado == "Pedido" || pedido.estado == "En preparacion"
          )
        );
      })
      .catch(error => {
          console.log(error.response)
      });
  }

  useEffect(() => {
    //buscarPedidos();
    setInterval(buscarPedidos, 10000);
  }, []);

  useEffect(() => {
    buscarPedidos();
  }, [filtro]);

  const cambiaFiltro = (filtro) => {
    setFiltro(filtro);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>PANTALLA DE PEDIDOS</Text>
      {/*<SearchBar
        placeholder="Buscar"
        //onChangeText={(text) => cambiaFiltro(text)}
        //value={filtro}
        round="true"
      />*/}

      <ScrollView>
        <Pedidos navigation={navigation} pedidos={pedidos} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
