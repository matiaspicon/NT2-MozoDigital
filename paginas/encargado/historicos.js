import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import Menu from "./menu";
import { SearchBar } from "react-native-elements";

export default function Index({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("");

  console.log("NAVIGATION HISTORICOS:", navigation);

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
        <ScrollView></ScrollView>
      </View>
    </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});