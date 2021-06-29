import React, { useEffect, useState, useContext, useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  CheckBox,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Button,
  ScrollView
} from "react-native";
import axios from "axios";
import Contador from "../../components/contador/contador";
import GlobalContext from "../../components/global/context";


export default function DetalleUsuario({ navigation, route }) {
  console.log("ROUTE:", route);
  const {
    _id,
    nombre, 
    apellido,
    email,
    rol
  } = route.params;

  const [emailMod, setEmailMod] = useState(email);
  const [nombreMod, setNombreMod] = useState(nombre);
  const [apellidoMod, setApellidoMod] = useState(apellido);
  const [rolMod, setRolMod] = useState(rol);
  
  const context = useContext(GlobalContext);

  /*useEffect(() => {
    console.log("State dentro de Detalle plato", context);
  }, []);
  */

  if (context.user.rol != "Encargado") {
    return (
      <ScrollView style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.platoDetallesContainer}>
          <View style={styles.platoDetails}>
            <View styles={styles.detalle}>
              <Text style={styles.descripcion}>{email}</Text>
              <Text style={styles.descripcion}>{nombre}</Text>
              <Text style={styles.descripcion}>{apellido}</Text>
            
            </View>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.platoDetallesContainer}>

          <View style={styles.platoDetails}>
            <View styles={styles.detalle}>
              <TextInput
                style={styles.descripcion}
                onChangeText={setEmailMod}
                value={emailMod}
              />

              <TextInput
                style={styles.descripcion}
                onChangeText={setNombreMod}
                value={nombreMod}
              />

              <TextInput
                style={styles.descripcion}
                onChangeText={setApellidoMod}
                value={apellidoMod}
              />

              <TextInput
                style={styles.descripcion}
                onChangeText={setRolMod}
                value={rolMod}
              />

              <Text>{'\n'}</Text>

              <TouchableOpacity
                style={styles.buttonModifyItem}
                onPress={() =>
                  modificarItem(
                    tituloMod,
                    categoriaMod,
                    url_imagenMod,
                    descripcionMod,
                    precioMod,
                    habilitadoMod
                  )
                }
              >
                <Text style={styles.addTitle}>Modificar</Text>
              </TouchableOpacity>

              <Text>{'\n'}</Text>

              <TouchableOpacity
                style={styles.buttonDeleteItem}
                onPress={() =>
                  borrarItem()
                }
              >
                <Text style={styles.deleteTitle}> Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
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

  async function borrarItem() {
    //window.confirm("sometext");
    if (confirm("Está seguro de continuar con la operación?")) {
      axios
      .delete("https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/" + context.restaurante.idRestaurante + "/sucursales/" + context.restaurante.idSucursal + "/menu/" +_id, {headers: { Authorization: `Bearer ${context.user.token}`}})
      .then((response) => {console.log(response);})
      .catch((error) => {console.log(error.response);});
      navigation.navigate("Menu");
    }


    /*Alert.alert(
      "Atención!",
      "Está seguro de continuar con la operación?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Aceptar", onPress: () => axios
      .delete("https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/60ad9d02a7ec12baac4d59e1/sucursales/0/menu"+_id, pedido, {headers: { Authorization: `Bearer ${context.user.token}`}})
      .then((response) => {console.log(response);})
      .catch((error) => {console.log(error.response);}); }
      ]
    );*/
  }

  async function modificarItem(
    tituloMod,
    categoriaMod,
    url_imagenMod,
    descripcionMod,
    precioMod,
    habilitadoMod
  ) {
    const unPlato = {
      titulo: tituloMod,
      categoria: categoriaMod,
      url_imagen: url_imagenMod,
      descripcion: descripcionMod,
      precio: precioMod,
      habilitado: habilitadoMod,
    };
    console.log(unPlato);

    await axios
      .put("https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/" + context.restaurante.idRestaurante + "/sucursales/" + context.restaurante.idSucursal + "/menu/" + _id,
        unPlato,
        { headers: { Authorization: `Bearer ${context.user.token}` } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });

    navigation.navigate("Menu");
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
  url_imagenMod: {
    marginTop: 15,
    lineHeight: 22,
    fontSize: 17,
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
    color: "#EE3D3D",
    marginHorizontal: 20,
  },
  precioMod: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#EE3D3D",
  },
  checkbox: {
    alignSelf: "center",
  },
  buttonAddItem: {
    alignItems: "center",
    backgroundColor: "#EE3D3D",
    borderRadius: 40,
    padding: 8,
  },
  addTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonModifyItem: {
    alignItems: "center",
    backgroundColor: "#EE3D3D",
    borderRadius: 0,
    padding: 8,
    borderColor: "#EE3D3D",
    borderWidth: 1
  },
  buttonDeleteItem: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 0,
    padding: 8,
    borderColor: "#EE3D3D",
    borderWidth: 1
  },
  deleteTitle: {
    color: "#EE3D3D",
    fontWeight: "600",
    fontSize: 16,
  },
});