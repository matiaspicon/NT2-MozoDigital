import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import Menu from "./menu";
import { SearchBar } from "react-native-elements";
import Pedidos from '../pedido'
import GlobalContext from "../../components/global/context";

export default function Index({ navigation }) {

  const context = useContext(GlobalContext);
   const [filtro, setFiltro] = useState("")
  function filtroRol(pedido) {
    return pedido.restaurante == context.restaurante.idRestaurante && pedido.sucursal == context.restaurante.idSucursal && pedido.estado == "Entregado"
  }

  return (
    <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Buscar"
          onChangeText={(text) => setFiltro(text)}
          value={filtro}
          round="true"
        />
        <ScrollView>
          <Pedidos navigation={navigation} filtroRol={filtroRol} />
        </ScrollView>
      
    </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});