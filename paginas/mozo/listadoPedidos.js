import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";
import Pedidos from "../pedido";
import { SearchBar } from "react-native-elements";
import GlobalContext from "../../components/global/context";
import axios from "axios";

export default function ListadoPedidos({ navigation }) {
    const context = useContext(GlobalContext);

  useEffect(() => {
    navigation.setOptions({ title: `${context.user.rol} - Listado Pedidos`});
  }, );

  function filtroRol(pedido){
    return pedido.restaurante == context.restaurante.id && pedido.sucursal == context.restaurante.sucursalId
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

