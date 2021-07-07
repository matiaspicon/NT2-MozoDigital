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
import { Picker } from "@react-native-picker/picker";

//import { Picker } from 'react-native'

import Contador from "../../components/contador/contador";

import GlobalContext from "../../components/global/context";
import axios from "axios";

export default function DetallePlato({ navigation, route }) {
  //console.log("ROUTE PEDIDO DETALLE:", route);
  const { _id, fecha,  cliente, estado, total, mesa } = route.params.pedido;
  const buscarPedidos = route.params.buscarPedidos;
  const context = useContext(GlobalContext);
  let items = route.params.pedido.menuItems;

  const [nuevoEstado, setNuevoEstado] = useState(estado);

  //console.log("items:", items);

  useEffect(() => {
    navigation.setOptions({ title: `${context.user.rol} - Detalles Pedido` });
  });

  async function modificarEstado() {
    const pedido = {
      estado: nuevoEstado,
    };
    console.log(pedido);

    await axios
      .put(
        "https://gentle-hamlet-44521.herokuapp.com/api/pedidos/" + _id,
        { estado: nuevoEstado },
        { headers: { Authorization: `Bearer ${context.user.token}` } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
    buscarPedidos();
    navigation.navigate("Listado Pedidos");
  }

  function estadosPedidosDisponibles() {
    if (context.user.rol == "Encargado") {
      return (
        <Picker
          onValueChange={(nuevoEstado, itemIndex) => setNuevoEstado(nuevoEstado)}
          selectedValue={nuevoEstado}
          style={{ width: 200 }}
        >
          <Picker.Item label="En preparacion" value="En preparacion" />
          <Picker.Item label="Listo" value="Listo" />
          <Picker.Item label="Entregado" value="Entregado" />
        </Picker>
      );
    }
    if (context.user.rol == "Cocinero") {
      return (
        <Picker
          onValueChange={(nuevoEstado, itemIndex) =>setNuevoEstado(nuevoEstado)}
        >
          <Picker.Item label="En preparacion" value="En preparacion" />
          <Picker.Item label="Listo" value="Listo" />
        </Picker>
      );
    }
    if (context.user.rol == "Mozo") {
      return (
        <Picker
          onValueChange={(nuevoEstado, itemIndex) => setNuevoEstado(nuevoEstado)}
        >
          <Picker.Item label="Listo" value="Listo" />
          <Picker.Item label="Entregado" value="Entregado" />
        </Picker>
      );
    }
  }

  return (
    <ScrollView style={{ flex: 1, flexDirection: "column" }}>
      <View style={styles.pedidosContainer}>
        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>N° Pedido: </Text>
          <Text> {_id}</Text>
        </View>

        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Fecha: </Text>
          <Text> {fecha}</Text>
        </View>

        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Mesa: </Text>
          <Text> {mesa}</Text>
        </View>

        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Cliente: </Text>
          <Text>{cliente}</Text>
        </View>

        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Estado:</Text>
          {estadosPedidosDisponibles()}
        </View>

        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Items:</Text>
        </View>

        {items &&
          items.map((item, index) => (
            <View key={index} style={styles.pedidosCard}>
              <Text> - {item.titulo} x {item.cantidad}</Text>
            </View>
          ))}

        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Total: ${total} </Text>
        </View>

        <TouchableOpacity
          style={styles.realizarPedidoBtn}
          onPress={modificarEstado}
        >
          <Text style={styles.realizarPedidoTitle}>Modificar Estado</Text>
        </TouchableOpacity>
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
    paddingRight: 10,
  },
  realizarPedidoBtn: {
    alignItems: "center",
    backgroundColor: "#EE3D3D",
    borderRadius: 40,
    padding: 8,
    marginHorizontal: 30,
    marginBottom: 30,
    marginVertical: 30,
  },
  realizarPedidoTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});
