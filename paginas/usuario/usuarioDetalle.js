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
  ScrollView,
} from "react-native";
import axios from "axios";
import Contador from "../../components/contador/contador";
import { Picker } from "@react-native-picker/picker";
import MultiSelect from "react-multi-select-component";
import GlobalContext from "../../components/global/context";
import { useFocusEffect } from "@react-navigation/native";

export default function DetalleUsuario({ navigation, route }) {
  console.log("ROUTE:", route);
  const { _id, nombre, apellido, email, rol, restaurante, sucursal, mesas } =
    route.params.usuario;

  const buscaUsuarios = route.params.buscaUsuarios;
  const context = useContext(GlobalContext);

  const [emailMod, setEmailMod] = useState(email);
  const [nombreMod, setNombreMod] = useState(nombre);
  const [apellidoMod, setApellidoMod] = useState(apellido);
  const [rolMod, setRolMod] = useState(rol);
  const [mesasMod, setMesasMod] = useState([]);
  const [mesasDisponibles, setMesasDisponibles] = useState();
  const [mesasOp, setMesasOp] = useState([]);

  async function buscaMesas() {
    await axios
      .get(
        "https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/" +
          context.restaurante.idRestaurante +
          "/sucursales/" +
          context.restaurante.idSucursal
      )
      .then((response) => {
        console.log(response);
        setMesasDisponibles(response.data.mesas.length);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  buscaMesas();

  for (let index = 1; index <= mesasDisponibles; index++) {
    if (mesasOp.length != mesasDisponibles) {
      mesasOp.push({ label: index, value: index });
    }
  }

  useEffect(() => {
    if (rol == "Mozo") {
      for (let index = 0; index <= mesas.length; index++) {
        if (mesasMod.length != mesas.length) {
          mesasMod.push({
            label: parseInt(mesas[index]),
            value: parseInt(mesas[index]),
          });
        }
      }
    }
    console.log("Mesas OP:", mesasOp);
    console.log("Mesas MOD:", mesasMod);
  }, [rol]);

  async function modificarItem(
    emailMod,
    nombreMod,
    apellidoMod,
    rolMod,
    mesasMod
  ) {
    mesasMod = mesasMod.map((element) => element.value);
    const unEmpleado = {
      email: emailMod,
      nombre: nombreMod,
      apellido: apellidoMod,
      rol: rolMod,
      mesas: mesasMod,
    };
    console.log("Un Empleado: ", unEmpleado);

    await axios
      .put(
        "https://gentle-hamlet-44521.herokuapp.com/api/usuarios/" + _id,
        unEmpleado,
        { headers: { Authorization: `Bearer ${context.user.token}` } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
      buscaUsuarios();
    navigation.navigate("Empleados");
  }


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
              <Text>Email: </Text>
              <TextInput
                style={styles.descripcion}
                onChangeText={setEmailMod}
                value={emailMod}
              />

              <Text>Nombre: </Text>
              <TextInput
                style={styles.descripcion}
                onChangeText={setNombreMod}
                value={nombreMod}
              />

              <Text>Apellido: </Text>
              <TextInput
                style={styles.descripcion}
                onChangeText={setApellidoMod}
                value={apellidoMod}
              />

              <Text>Rol: </Text>
              <Picker
                onValueChange={(rolMod, itemIndex) => setRolMod(rolMod)}
                selectedValue={rolMod}
                style={{ width: 200 }}
              >
                <Picker.Item label="Encargado" value="Encargado" />
                <Picker.Item label="Cocinero" value="Cocinero" />
                <Picker.Item label="Mozo" value="Mozo" />
              </Picker>

              {rolMod == "Mozo"
                ? [
                    <Text>Mesas: </Text>,
                    <MultiSelect
                      options={mesasOp}
                      value={mesasMod}
                      onChange={setMesasMod}
                      labelledBy="Mesas"
                    />,
                  ]
                : null}

              <Text>{"\n"}</Text>

              <TouchableOpacity
                style={styles.buttonModifyItem}
                onPress={() =>
                  modificarItem(
                    emailMod,
                    nombreMod,
                    apellidoMod,
                    rolMod,
                    mesasMod
                  )
                }
              >
                <Text style={styles.addTitle}>Modificar</Text>
              </TouchableOpacity>

              <Text>{"\n"}</Text>

              <TouchableOpacity
                style={styles.buttonDeleteItem}
                onPress={() => borrarEmpleado()}
              >
                <Text style={styles.deleteTitle}> Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  async function borrarEmpleado() {
    //window.confirm("sometext");
    if (confirm("Está seguro de continuar con la operación?")) {
      axios
        .delete(
          "https://gentle-hamlet-44521.herokuapp.com/api/usuarios/" + _id,
          { headers: { Authorization: `Bearer ${context.user.token}` } }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
      navigation.navigate("Empleados");
      buscaUsuarios();
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
          {text: "Aceptar", onPress: () => axios
          .delete("https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/60ad9d02a7ec12baac4d59e1/sucursales/0/menu"+_id, pedido, {headers: {Authorization: `Bearer ${context.user.token}`}})
      .then((response) => {console.log(response);})
      .catch((error) => {console.log(error.response);}); }
          ]
          );*/
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
    lineHeight: 22,
    fontSize: 16,
    borderWidth: 1,
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
    borderRadius: 40,
    padding: 8,
    borderColor: "#EE3D3D",
    borderWidth: 1,
  },
  buttonDeleteItem: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 40,
    padding: 8,
    borderColor: "#EE3D3D",
    borderWidth: 1,
  },
  deleteTitle: {
    color: "#EE3D3D",
    fontWeight: "600",
    fontSize: 16,
  },
});
