import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import Menu from "./menu";
import { SearchBar } from "react-native-elements";
import Pedidos from '../pedido'

export default function Index({ navigation }) {
 
  console.log("NAVIGATION HISTORICOS:", navigation);
  const [filtro, setFiltro] = useState("")
  function filtroRol(pedido) {
    return pedido.estado == "Entregado" || (filtro && pedido.titulo.toLowerCase() == filtro.toLowerCase())
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