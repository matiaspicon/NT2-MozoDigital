import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DetallesPedido from "./detallePedido";

export default function Pedidos({ navigation, pedidos }) {
  console.log("NAVIGATION PEDIDOS:", navigation);
  return (
    <View>
      {pedidos &&
        pedidos.map((pedido, index) => (
          <TouchableOpacity
            onPress={() => navigation.push("Detalles Pedido", pedido)}
          >
            <View key={index} style={styles.pedidosContainer}>
              <View>
                <View style={styles.pedidosCard}>
                  <Text style={styles.pedidoLabel}>N° Pedido: </Text>
                  <Text>{pedido._id}</Text>
                </View>

                <View style={styles.pedidosCard}>
                  <Text style={styles.pedidoLabel}>Cliente: </Text>
                  <Text>{pedido.cliente}</Text>
                </View>

                <View style={styles.pedidosCard}>
                  <Text style={styles.pedidoLabel}>Estado: </Text>
                  <Text>{pedido.estado}</Text>
                </View>

                <View style={styles.pedidosCard}>
                  <Text style={styles.pedidoLabel}>Total: $ </Text>
                  <Text></Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pedidosContainer: {
    //elevation: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
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
