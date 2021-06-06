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

import Contador from "../../components/contador/contador";

import GlobalContext from "../../components/global/context";

export default function DetallePlato({ navigation, route }) {
  //console.log("ROUTE:", route);
  const {
    _id,
    categoria,
    descripcion,
    habilitado,
    precio,
    titulo,
    url_imagen,
  } = route.params.plato;
  const [cantidad, setCantidad] = useState(1);

  const context = useContext(GlobalContext);

  useEffect(() => {
    console.log("State dentro de Detalle plato", context);
  }, []);

  return (
    <ScrollView style={{ flex: 1, flexDirection: "column" }}>
      <View style={styles.platoDetallesContainer}>
        <View>
          <Image source={{ uri: url_imagen }} style={styles.imagen} />
        </View>

        <View style={styles.platoDetails}>
          <View styles={styles.detalle}>
            <Text style={styles.titulo}>{titulo}</Text>

            <Text style={styles.categoria}>{categoria}</Text>
            <Text style={styles.descripcion}>{descripcion}</Text>
            <View style={{flexDirection: "row"}}>
              <Text style={styles.precio}> ${precio}</Text>

              <Contador
                cantidad={cantidad}
                cambiarCantidad={setCantidad}
                aumentarCantidad={() => setCantidad(cantidad + 1)}
                disminuirCantidad={() => setCantidad(cantidad - 1)}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonAddItem}
              onPress={() =>
                agregarCarritoItem({
                  ...route.params.plato,
                  cantidad: cantidad,
                })
              }
            >
              <Text style={styles.addTitle}>
                Agregar item(s) {convertirAPesos(precio * cantidad)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  function agregarCarritoItem(carritoItem) {
    if (
      context.carritoItems.find((itemFind) => itemFind._id == carritoItem._id)
    ) {
      let carritoPivot = [...context.carritoItems];
      carritoPivot.find(
        (itemFind) => itemFind._id == carritoItem._id
      ).cantidad += carritoItem.cantidad;
      context.setCarritoItems(carritoPivot);
    } else {
      context.setCarritoItems([...context.carritoItems, carritoItem]);
    }

    navigation.navigate("Menu");
    //navigation.push("Menu");
  }

  function convertirAPesos(total) {
    return "$" + total.toLocaleString("de-DE");
  }
}

const styles = StyleSheet.create({
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: "orange",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  platoDetallesContainer: {
    //justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 20,
  },
  containerImg: {
    justifyContent: "center",
    alignItems: "center",
    height: 280,
  },
  imagen: {
    height: 220,
    width: 220,
    borderRadius: 40,
  },
  platoDetails: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.7,
    shadowRadius: 0,
  },
  detalle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoria: {
    fontStyle: "italic",
    fontSize: 16,
  },
  descripcion: {
    marginTop: 15,
    lineHeight: 22,
    fontSize: 17,
  },
  precio: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "red",
    marginHorizontal: 20
  },
  buttonAddItem: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 40,
    padding: 8,
  },
  addTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});
