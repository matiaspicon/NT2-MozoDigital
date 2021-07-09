import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Input } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import GlobalContext from "../../components/global/context";

export default function IngresarMesa({ navigation }) {
  const [ingresoHabilitado, setIngresoHabilitado] = useState(false);
  const [restaurantes, setRestaurantes] = useState("");
  const [restaurante, setRestaurante] = useState(restaurantes[0]);
  const [sucursal, setSucursal] = useState("");
  const [mesa, setMesa] = useState(-1);


  const context = useContext(GlobalContext);
  useEffect(() => {
    buscarRestaurantes();
  }, []);

  async function buscarRestaurantes() {
    await axios
      .get("https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/")
      .then((response) => {
        console.log(response);
        //var filtrados = response.data.filter((r) => r.sucursales != null);
        setRestaurante(response.data[0]._id);
        setSucursal(response.data[0].sucursales[0]._id);
        setMesa(response.data[0].sucursales[0].mesas[0]._id);
        setRestaurantes(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  function restaurantesDisponibles() {
    return (
      <Picker      
        onValueChange={(restauranteSeleccionado, itemIndex) => actualizarRestaurante(restauranteSeleccionado)}
        selectedValue={restaurante}
        style={{ width: 200 }}
      >
        {restaurantes &&
          restaurantes.map((restaurant, index) => (
            <Picker.Item
              key={index}
              label={restaurant.nombre}
              value={restaurant._id}
            />
          ))}
      </Picker>
    );
  }

  function sucursalesDisponibles() {
    return (
      <Picker        
        onValueChange={(sucursalSeleccionada, itemIndex) => actualizarSucursal(parseInt(sucursalSeleccionada))
        }
        selectedValue={sucursal}
        style={{ width: 200 }}
      >
        {restaurantes && 
          restaurantes.find(r => r._id == restaurante).sucursales.map((suc, index) =>
            
              <Picker.Item key={index} label={suc.direccion} value={suc._id} />
            )
        }
      </Picker>
    );
  }

  function mesasDisponibles() {
    return (
      <Picker
        onValueChange={(mesaSeleccionada, itemIndex) => setMesa(parseInt(mesaSeleccionada))}
        selectedValue={mesa}
        style={{ width: 200 }}
      >
        {restaurantes && 
          restaurantes.find(r => r._id == restaurante).sucursales.find(s => s._id == sucursal).mesas.map((mesa, index) =>
            
              <Picker.Item key={index} label={mesa._id} value={mesa._id} />
            )
        }
      </Picker>     
    );
  }

  function actualizarRestaurante(nuevoRestaurante){
    setRestaurante(nuevoRestaurante);
    setSucursal(restaurantes.find(r => r._id == nuevoRestaurante).sucursales[0]._id);
    setMesa(restaurantes.find(r => r._id == nuevoRestaurante).sucursales.find(s => s._id == sucursal).mesas[0]._id);
  }

  function actualizarSucursal(nuevaSucursal){
    setSucursal(nuevaSucursal);
    setMesa(restaurantes.find(r => r._id == restaurante).sucursales.find(s => s._id == nuevaSucursal).mesas[0]._id);
  }

  function setearRestaurante(){
    context.setRestaurante({idRestaurante: restaurante, idSucursal: sucursal, mesa: mesa})
    navigation.navigate("Cliente")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.tituloBienvenida}>Bienvenido a Mozo Digital</Text>

        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Restaurante:</Text>
          {restaurantesDisponibles()}
        </View>

        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Sucursal:</Text>
          {sucursalesDisponibles()}
        </View>
        
        <View style={styles.pedidosCard}>
          <Text style={styles.pedidoLabel}>Mesas:</Text>
          {mesasDisponibles()}
        </View>

        <TouchableOpacity
          style={styles.irAMenuBtn}
          onPress={() => setearRestaurante()}
        >
          <Text style={styles.irAMenuTitle}>Ir a Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    justifyContent: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  irAMenuBtn: {
    alignItems: "center",
    backgroundColor: "#EE3D3D",
    borderRadius: 40,
    padding: 8,
    marginHorizontal: 30,
    marginTop: 20,
    width: 170,
  },
  irAMenuBtnDisabled: {
    alignItems: "center",
    backgroundColor: "#EE3D3D",
    borderRadius: 40,
    padding: 8,
    marginHorizontal: 30,
    marginTop: 20,
    width: 170,
    opacity: 0.5,
  },
  irAMenuTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  inputMesa: {
    borderColor: "black",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 20,
    borderBottomWidth: 0,
  },
  tituloBienvenida: {
    fontSize: 20,
  },
  errorStyle: {
    textAlign: "center",
  },
  inputContainer: {
    borderBottomWidth: 0,
    textAlign: "center",
    borderColor: "red",
  },
});
