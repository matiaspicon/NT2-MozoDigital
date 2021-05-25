import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Button,
} from "react-native";

export default function Plato({ navigation, plato }) {
  //console.log("NAVIGATION PLATO", navigation);
  //console.log("PLATO:", plato);

  return (
    <TouchableHighlight
      onPress={() => navigation.push("Detalles Plato", { plato: plato })}
    >
      <View style={styles.platoContainer}>
        <View style={styles.platoImagenContainer}>
          <Image
            source={{ uri: plato.url_imagen }}
            style={styles.platoImagen}
          />
        </View>
        <View style={styles.platoDescripcionContainer}>
          <Text style={{ fontWeight: "bold" }}>{plato.titulo}</Text>
          <Text style={{ fontWeight: "bold" }}>${plato.precio}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  platoContainer: {
    height: 190,
    width: 220,
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
    top: -20,
  },
  platoImagen: {
    height: 150,
    width: 150,
    borderRadius: 80,
  },
  platoDescripcionContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    top: -10,
  },
});