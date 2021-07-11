import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Button,
  TouchableOpacity
} from "react-native";

export default function Plato(route) {
  //console.log("NAVIGATION PLATO", navigation);
  //console.log("PLATO:", plato);

  const navigation = route.navigation
  const plato = route.plato
  const buscaMenu = route.buscaMenu

  return (
    <TouchableOpacity
      onPress={() => navigation.push("Detalles Plato", { plato: plato, buscaMenu: () => buscaMenu() })}
    >
      <View style={styles.platoContainer}>
        <View style={styles.platoImagenContainer}>
          <Image
            source={{ uri: plato.url_imagen }}
            style={styles.platoImagen}
          />
        </View>
        <View style={styles.platoDescripcionContainer}>
          <Text style={styles.platoDescripcion}>{plato.titulo}</Text>
          <Text style={styles.platoDescripcion}>${plato.precio}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  platoContainer: {
    height: 150,
    width: 160,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 13,
    backgroundColor: "#ffffff",
  },
  platoImagenContainer: {
    alignItems: "center",
    top: -30,
  },
  platoImagen: {
    height: 120,
    width: 130,
    borderRadius: 60,
  },
  platoDescripcionContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    top: -20,
  },
  platoDescripcion: {
    fontWeight: "bold",
    fontSize: 12.5
  }
});