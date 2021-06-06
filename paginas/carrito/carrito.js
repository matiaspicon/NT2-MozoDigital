import React, { useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import Menu from "../menu/index";
import Contador from "../../components/contador/contador";

import GlobalContext from "../../components/global/context";

export default function Carrito({ navigation, route }) {
  const context = useContext(GlobalContext);

  useEffect(() => {
    console.log("State dentro de Carrito: ", context);
  }, []);

  function submitPedido() {
    const pedido = {
      // "cliente": {...context.user},
      menuItems: [...context.carritoItems],
      estado: "En Preparacion",
    };
    console.log("Pedido: ", pedido);
    context.setCarritoItems([]);
  }

  function devolverTotal() {
    let total = 0;
    console.log(context.carritoItems);
    context.carritoItems.forEach((carritoItem) => {
      total = total + carritoItem.precio * carritoItem.cantidad;
    });
    return total.toLocaleString("de-DE");
  }

  const CartCard = ({ item }) => {
    const cambiarCantidad = function (cantidad) {
      let carritoPivot = [...context.carritoItems];
      carritoPivot.find((itemFind) => itemFind._id == item._id).cantidad =
        cantidad;
      context.setCarritoItems(carritoPivot);
    };

    return (
      <View style={styles.cartCard}>
        <Image
          source={{ uri: item.url_imagen }}
          style={{ height: 80, width: 80, borderRadius: 10 }}
        />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View styles={{ justifyContent: "flex-end" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {item.titulo}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontStyle: "italic",
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              ${item.precio}
            </Text>
          </View>

          <View
            style={{
              justifyContent: "flex-end",
              marginLeft: "auto",
            }}
          >
            <Contador
              style={{ marginTop: 20 }}
              cantidad={item.cantidad}
              cambiarCantidad={cambiarCantidad}
              // aumentarCantidad={() => context.setData({...context, carritoItems: [...context.carritoItems,{...item, cantidad: item.cantidad+1}]})}
              // disminuirCantidad={() => context.setData({...context, carritoItems: [...context.carritoItems,{...item, cantidad: item.cantidad-1}]})}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Carrito</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={context.carritoItems}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                ${devolverTotal()}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.realizarPedidoBtn}
              onPress={submitPedido}
            >
              <Text style={styles.realizarPedidoTitle}>Realizar pedido</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
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
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: "grey",
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  realizarPedidoBtn: {
    alignItems: "center",
    backgroundColor: "#EE3D3D",
    borderRadius: 40,
    padding: 8,
    marginHorizontal: 30,
  },
  realizarPedidoTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});
