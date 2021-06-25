import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import Menu from "./menu";
import { SearchBar } from "react-native-elements";
import Pedidos from '../pedido'

export default function Index({ navigation }) {

  console.log("NAVIGATION HISTORICOS:", navigation);

  function filtroRol(pedido) {
    return pedido.estado == "Entregado"
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>PANTALLA DE PEDIDOS HISTORICOS</Text>
        <SearchBar
          placeholder="Buscar"
          //onChangeText={(text) => cambiaFiltro(text)}
          //value={filtro}
          round="true"
        />
        <ScrollView>
          <Pedidos filtroRol={filtroRol}/> 
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