import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";
import Pedidos from "../pedido";
import { SearchBar } from "react-native-elements";
import GlobalContext from "../../components/global/context";


export default function Index({ navigation }) {
  const context = useContext(GlobalContext);
  console.log("LISTADO PEDIDOS:", navigation);

  function filtroRol(pedido){
    return pedido.cliente == context.user._id
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
