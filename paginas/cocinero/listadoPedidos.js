import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";
import Pedidos from "../pedido";
import { SearchBar } from "react-native-elements";
import GlobalContext from "../../components/global/context";
import axios from "axios";

export default function ListadoPedidos({ navigation }) {
  const context = useContext(GlobalContext);
  
  function filtroRol(pedido) {
    return pedido.restaurante == context.restaurante.idRestaurante && pedido.sucursal == context.restaurante.idSucursal;
  }

  useEffect(() => {
    navigation.setOptions({ title: `${context.user.rol} - Listado Pedidos`});
  }, );

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

