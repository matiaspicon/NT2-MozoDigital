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
import { Picker } from "@react-native-picker/picker";
import GlobalContext from "../../components/global/context";

export default function AgregarItem({ navigation, route }) {

  const [url_imagenMod, setUrl_imagenMod] = useState();
  const [tituloMod, setTituloMod] = useState();
  const [categoriaMod, setCategoriaMod] = useState();
  const [descripcionMod, setDescripcionMod] = useState();
  const [precioMod, setPrecioMod] = useState();
  const [habilitadoMod, setHabilitadoMod] = useState();

  const context = useContext(GlobalContext);

  if (context.user.rol == "Encargado") {
    return (
      <ScrollView style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.platoDetallesContainer}>

          <View style={styles.platoDetails}>
            <View styles={styles.detalle}>
              <Text>Titulo:</Text>
              <TextInput
                style={styles.descripcion}
                onChangeText={setTituloMod}
                value={tituloMod}
              />

              <Text>Categoria: </Text>
              <Picker
                onValueChange={(categoria, itemIndex) => setCategoriaMod(categoria)}
                selectedValue={categoriaMod}
                style={{ width: 200 }}
              >
                <Picker.Item label="Platos" value="Platos" />
                <Picker.Item label="Bebidas" value="Bebidas" />
                <Picker.Item label="Postres" value="Postres" />
              </Picker>

              <Text>Imagen:</Text>
              <TextInput
                style={styles.descripcion}
                onChangeText={setUrl_imagenMod}
                value={url_imagenMod}
                adjustsFontSizeToFit={true}
              />

              <Text>Descripción:</Text>
              <TextInput
                style={styles.descripcion}
                onChangeText={setDescripcionMod}
                value={descripcionMod}
              />

              <Text>Precio:</Text>
              <Text style={styles.precio}>
                $
                <TextInput
                  style={styles.precioMod}
                  onChangeText={setPrecioMod}
                  value={precioMod}
                />
              </Text>

              <Text>{'\n'}</Text>

              <Text>
                Habilitado:
                <CheckBox
                  style={styles.checkbox}
                  onValueChange={setHabilitadoMod}
                  value={habilitadoMod}
                />
              </Text>

              <Text>{'\n'}</Text>

              <TouchableOpacity
                style={styles.buttonAddItem}
                onPress={() =>
                  agregarItem(
                    tituloMod,
                    categoriaMod,
                    url_imagenMod,
                    descripcionMod,
                    precioMod,
                    habilitadoMod
                  )
                }
              >
                <Text style={styles.addTitle}>Agregar Item</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  async function agregarItem(
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

    if (unPlato.titulo != null && unPlato.precio != null) {
      await axios
        .post(
          "https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/" + context.restaurante.idRestaurante + "/sucursales/" + context.restaurante.idSucursal + "/menu/",
          unPlato,
          { headers: { Authorization: `Bearer ${context.user.token}` } }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });

      navigation.navigate("Home");
    }
  }
}

const styles = StyleSheet.create({
  platoDetallesContainer: {
    //justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 20,
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
  descripcion: {
    lineHeight: 22,
    fontSize: 16,
    borderWidth: 1
  },
  precio: {
    marginTop: 0,
    fontWeight: "bold",
    fontSize: 16,
    color: "#EE3D3D",
    marginHorizontal: 0,
  },
  precioMod: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#EE3D3D",
    borderWidth: 1
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
});
