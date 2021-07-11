import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Badge } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import GlobalContext from "../../components/global/context";

let badge;

function badgeStatus(pedido) {
  if (pedido.estado == "Pedido") {
    badge = "error";
  }
  if (pedido.estado == "En preparacion") {
    badge = "warning";
  }
  if (pedido.estado == "Listo") {
    badge = "primary";
  }
  if (pedido.estado == "Entregado") {
    badge = "success";
  }
  return badge;
}

export default function ListaPedidos({ navigation, filtroRol }) {
  //console.log("NAVIGATION PEDIDOS:", navigation);
  let timeOut;
  const context = useContext(GlobalContext);
  const [pedidos, setPedidos] = useState([]);

  console.log("CONTEXT",context);

  function devolverTotal(pedido) {
    let total = 0;
    pedido.menuItems.forEach((carritoItem) => {
      total = total + carritoItem.precio * carritoItem.cantidad;
    });
    return total.toLocaleString("de-DE");
  }

  useFocusEffect(
    React.useCallback(() => {
      buscarPedidos()   
      return () => {
        clearTimeout(timeOut)
      };
    }, [])
  );
  
  let i = 0;
  function buscarPedidos() {
    
    console.log("BUSCO PEDIDOS 1", i);
    i++;
    axios
      .get("https://gentle-hamlet-44521.herokuapp.com/api/pedidos", {
        headers: { Authorization: `Bearer ${context.user.token}` },
      })
      .then((response) => {
        console.log("ACA LA RESPUESTA", response);
        setPedidos(
          response.data.filter(filtroRol).map((pedido) => {pedido.total = devolverTotal(pedido);
          return pedido;
          })
        );
      })
      .catch((error) => {
        console.log(error.response);
      });
      timeOut = setTimeout(() => {
        buscarPedidos();
      }, 10000)
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {pedidos &&
          pedidos.sort(function (a, b) {
            var dateA = new Date(a.fecha), dateB = new Date(b.fecha)
            return dateB - dateA
          }).map((pedido, index) => (
            <TouchableOpacity
              onPress={() => navigation.push("Detalles Pedido", {pedido, buscarPedidos})}
              key={index}
            >
              <View style={styles.pedidosContainer}>
                <View>
                  <View style={styles.pedidosCard}>
                    <Text style={styles.pedidoLabel}>N° Pedido: </Text>
                    <Text>{pedido._id}</Text>
                  </View>

                  <View style={styles.pedidosCard}>
                    <Text style={styles.pedidoLabel}>Fecha: </Text>
                    <Text>{pedido.fecha}</Text>
                  </View>

                  <View style={styles.pedidosCard}>
                    <Text style={styles.pedidoLabel}>Cliente: </Text>
                    <Text>{pedido.cliente}</Text>
                  </View>

                  <View style={styles.badgeRow}>
                    <Text style={styles.pedidoLabel}>Estado: </Text>

                    <Badge
                      status={badgeStatus(pedido)}
                      value={pedido.estado}
                      badgeStyle={{
                        paddingHorizontal: 10,
                      }}
                    />
                  </View>

                  <View style={styles.pedidosCard}>
                    <Text style={styles.pedidoLabel}>Total: ${pedido.total} </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </SafeAreaView>
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
  badgeRow: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  pedidoLabel: {
    fontWeight: "bold",
  },
});
