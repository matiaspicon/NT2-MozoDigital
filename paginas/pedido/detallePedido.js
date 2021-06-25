import React, { useEffect, useState, useContext, useReducer } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { Badge } from "react-native-elements";

import Contador from "../../components/contador/contador";

import GlobalContext from "../../components/global/context";

let badge;

function badgeStatus(estado) {
  if (estado == "En Preparacion") {
    badge = "warning";
  }
  if (estado == "Terminado") {
    badge = "success";
  }
  return badge;
}

export default function DetallePlato({ navigation, route }) {
  console.log("ROUTE PEDIDO DETALLE:", route);
  const { _id, cliente, estado, total } = route.params;
  //console.log(route.params.menuItems);
  let items = route.params.menuItems;

  console.log("items:", items);

  const context = useContext(GlobalContext);

  return (
    <ScrollView style={{ flex: 1, flexDirection: "column" }}>
      <View style={styles.pedidosContainer}>
        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>N° Pedido: </Text>
          <Text> {_id}</Text>
        </View>

        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Cliente: </Text>
          <Text>{cliente}</Text>
        </View>

        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Estado: </Text>
          <Badge
            status={badgeStatus(estado)}
            value={estado}
            badgeStyle={{
              paddingHorizontal: 10,
            }}
          />
        </View>

        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Items:</Text>
        </View>

        {items &&
          items.map((item, index) => (
            <View key={index} style={styles.pedidosCard}>
              <Text> - {item.titulo}</Text>
            </View>
          ))}

        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Total: ${total} </Text>
        </View>
      </View>
    </ScrollView>
  );

  function convertirAPesos(total) {
    return "$" + total.toLocaleString("de-DE");
  }
}

const styles = StyleSheet.create({
  pedidosContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  pedidosCard: {
    flexDirection: "row",
    padding: 10,
  },
  pedidoLabel: {
    fontWeight: "bold",
  },
});
