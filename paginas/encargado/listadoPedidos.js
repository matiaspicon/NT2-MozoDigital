import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";
import Pedidos from "../pedido";
import { SearchBar } from "react-native-elements";
import axios from "axios";


export default function Index({ navigation }) {

  console.log("LISTADO PEDIDOS:", navigation);

  function filtroRol(pedido){
    return pedido.estado == "Pedido" || pedido.estado == "En preparacion" || pedido.estado == "Listo"
  }


  return (
    <SafeAreaView style={styles.container}>
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
