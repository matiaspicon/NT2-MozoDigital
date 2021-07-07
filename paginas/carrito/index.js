import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Contador from "../../components/contador/contador";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import GlobalContext from "../../components/global/context";
import axios from "axios";

export default function Carrito({ navigation, route }) {
  const context = useContext(GlobalContext);
  const [habilitarSubmitPedido, sethabilitarSubmitPedido] = useState(false);

  useEffect(() => {
    console.log("State dentro de Carrito: ", context);
  }, []);

  useEffect(() => {
    if (context.carritoItems.length > 0) {
      sethabilitarSubmitPedido(true);
    } else {
      sethabilitarSubmitPedido(false);
    }
  });

  const ItemSlide = ({ navigation }) => {
    return (
      <View>
        <SwipeListView
          data={context.carritoItems}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          //leftOpenValue={75}
          rightOpenValue={-65}
          disableRightSwipe
        />
      </View>
    );
  };
  const VisibleItem = (props) => {
    const { data } = props;
    const cambiarCantidad = function (cantidad) {
      let carritoPivot = [...context.carritoItems];
      carritoPivot.find((itemFind) => itemFind._id == data.item._id).cantidad =
        cantidad;
      context.setCarritoItems(carritoPivot);
    };
    return (
      <TouchableHighlight>
        <View style={styles.cartCard}>
          <Image
            source={{ uri: data.item.url_imagen }}
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
                {data.item.titulo}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontStyle: "italic",
                  fontWeight: "bold",
                  marginTop: 20,
                }}
              >
                ${data.item.precio}
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
                cantidad={data.item.cantidad}
                cambiarCantidad={cambiarCantidad}
              />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const renderItem = (data, rowMap) => {
    return <VisibleItem data={data} />;
  };

  const HiddenItemWithActions = (props) => {
    const { onClose, onDelete } = props;

    return (
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={onDelete}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={25}
          color="#fff"
        />
      </TouchableOpacity>
    );
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...context.carritoItems];
    const prevIndex = context.carritoItems.findIndex(
      (item) => item.key === rowKey
    );
    newData.splice(prevIndex, 1);
    context.setCarritoItems(newData);
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  function submitPedido() {
    const pedido = {
      cliente: context.user._id,
      menuItems: context.carritoItems.map((item) => {
        return {
          _id: item._id,
          cantidad: item.cantidad,
          precio: item.precio,
          titulo: item.titulo,
        };
      }),
      estado: "Pedido",
      restaurante: context.restaurante.idRestaurante,
      sucursal: context.restaurante.idSucursal + "",
      mesa: context.restaurante.mesa._id,
    };

    console.log("Pedido: ", pedido);
    context.setCarritoItems([]);
    axios
      .post("http://localhost:3000/api/pedidos", pedido, {
        headers: { Authorization: `Bearer ${context.user.token}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  function devolverTotal() {
    let total = 0;
    console.log(context.carritoItems);
    context.carritoItems.forEach((carritoItem) => {
      total = total + carritoItem.precio * carritoItem.cantidad;
    });
    return total.toLocaleString("de-DE");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.carritoText}>Carrito</Text>
      </View>
      <ScrollView>
        <ItemSlide />

        <View>
          <View style={styles.containerTotal}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>${devolverTotal()}</Text>
          </View>

          <TouchableOpacity
            style={
              !habilitarSubmitPedido
                ? styles.realizarPedidoBtnDisabled
                : styles.realizarPedidoBtn
            }
            onPress={submitPedido}
            disabled={!habilitarSubmitPedido}
          >
            <Text style={styles.realizarPedidoTitle}>Realizar pedido</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flex: 1,
  },
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
    marginBottom: 20,
  },
  realizarPedidoBtnDisabled: {
    alignItems: "center",
    backgroundColor: "#EE3D3D",
    borderRadius: 40,
    padding: 8,
    marginHorizontal: 30,
    opacity: 0.5,
    marginBottom: 20,
  },
  realizarPedidoTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  backTextWhite: {
    color: "#FFFFFF",
  },
  rowFront: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: "center",
    //backgroundColor: '#DDD',
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingLeft: 8,
    marginRight: 21,
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 10,
    height: 100,
  },
  backRightBtnLeft: {
    backgroundColor: "#1f65ff",
    right: 75,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
  },
  containerTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  carritoText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
