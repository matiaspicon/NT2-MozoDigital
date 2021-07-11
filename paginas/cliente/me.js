import React, { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
//import QRScan from '../../components/qrScanner'
import GlobalContext from "../../components/global/context";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({navigation}) {
  const [user, setUser] = useState({});
  const context = useContext(GlobalContext);
  
async function getDatos(){
    await axios
    .get("https://gentle-hamlet-44521.herokuapp.com/api/usuarios/me", {
      headers: { Authorization: `Bearer ${context.user.token}` },
    })
    .then((response) => {
      console.log(response);
      setUser(response.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
  } 

  useEffect(() => {
    getDatos()    
  }, [])

  return (
    <SafeAreaView>
      {user && 
        <ScrollView style={{ flex: 1, flexDirection: "column" }}>
          <View style={styles.pedidosContainer}>
          <View style={styles.pedidosCard}>
              <Text style={styles.misDatos}>Mis Datos </Text>              
            </View>
            <View style={styles.pedidosCard}>
              <Text style={styles.pedidoLabel}>Nombre: </Text>
              <Text> {user.nombre}</Text>
            </View>

            <View style={styles.pedidosCard}>
              <Text style={styles.pedidoLabel}>Apellido: </Text>
              <Text>{user.apellido}</Text>
            </View>

            <View style={styles.pedidosCard}>
              <Text style={styles.pedidoLabel}>Email:</Text>
              <Text>{user.email}</Text>
            </View>
            
            <Text>{'\n'}</Text>

            {/* <TouchableOpacity
              style={styles.realizarPedidoBtn}
              onPress={() => navigation.push()}
            >
              <Text style={styles.realizarPedidoTitle}>Ver pedidos</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      }
    </SafeAreaView>
  );
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
  misDatos:{
    fontSize: 20,
    fontWeight: "bold",
  }
});
