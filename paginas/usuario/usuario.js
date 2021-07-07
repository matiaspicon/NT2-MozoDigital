import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Button,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

export default function Usuario({ navigation, usuario, buscaUsuarios }) {
  //console.log("NAVIGATION", navigation);
  //console.log("PLATO:", plato);

  return (
    <SafeAreaView>
    <View style={styles.container}>
            <TouchableOpacity
              onPress={() => navigation.push("Detalle Usuario", {usuario, buscaUsuarios})}
            >
                <View style={{marginVertical: 10}}>
                
                  <View style={styles.pedidosCard}>
                    <Text style={styles.pedidoLabel}>Email: </Text>
                    <Text>{usuario.email}</Text>
                  </View>

                  <View style={styles.pedidosCard}>
                    <Text style={styles.pedidoLabel}>Nombre: </Text>
                    <Text>{usuario.nombre}</Text>
                  </View>

                  <View style={styles.pedidosCard}>
                    <Text style={styles.pedidoLabel}>Apellido: </Text>
                    <Text>{usuario.apellido}</Text>
                  </View>
                  
                  <View style={styles.pedidosCard}>
                    <Text style={styles.pedidoLabel}>Rol: </Text>
                    <Text>{usuario.rol}</Text>
                  </View>
                </View>
        </TouchableOpacity>
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
    padding: 5,
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