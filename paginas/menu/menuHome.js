import React, { useEffect, useState, useContext,  } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import GlobalContext from "../../components/global/context";

export default function Index({ navigation }) {
  const [platos, setMenu] = useState([]);
  const [filtro, setFiltro] = useState("");

  const context = useContext(GlobalContext);

  //console.log("NAVIGATION INDEX:", navigation);

  async function buscaMenu() {
    if (context.user.rol != "Encargado") {
      await axios.get("https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/" + context.restaurante.idRestaurante + "/sucursales/" + context.restaurante.idSucursal)
      .then(response => { 
        console.log(response)
        setMenu(
          response.data.menu.filter((plato) =>
            plato.titulo.toLowerCase().includes(filtro.toLowerCase()) && plato.habilitado == true
          )
        );
      })
      .catch(error => {
          console.log(error.response)
      });
    } else {
      await axios.get("https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/" + context.restaurante.idRestaurante + "/sucursales/" + context.restaurante.idSucursal)
      .then(response => { 
        console.log(response)
        setMenu(
          response.data.menu.filter((plato) =>
            plato.titulo.toLowerCase().includes(filtro.toLowerCase())
          )
        );
      })
      .catch(error => {
          console.log(error.response)
      });
    }
  }

  useFocusEffect(
    React.useCallback(() => {      
      const timeOut = setTimeout(() => {
        buscaMenu();
      }, 1000);
      return () => {
        clearTimeout(timeOut)
      };
    }, [])
  );

  useEffect(() => {
    buscaMenu();
  }, [filtro]);

  const cambiaFiltro = (filtro) => {
    setFiltro(filtro);
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View styles={styles.container}>
          <StatusBar backgroundColor="black" />
          <TouchableOpacity
            onPress={() =>
              navigation.push("Menu", {
                navigation: navigation,
                platos: platos.filter(
                  (plato) =>
                    plato.categoria != "Bebidas" && plato.categoria != "Postres"
                ),
                categoria: "Platos",
                "buscaMenu": buscaMenu})
            }
          >
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                margin: 20,
                justifyContent: "flex-end",
                alignSelf: "baseline",
              }}
            >
              <View style={styles.slide}>
                <Image
                  style={styles.sliderImage}
                  resizeMode="cover"
                  source={require("./img_categorias/platos-calientes.jpg")}
                />
              </View>

              <Text style={styles.titulo}>Platos</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.push("Menu", {
                navigation: navigation,
                platos: platos.filter((plato) => plato.categoria == "Bebidas"),
                categoria: "Bebidas"
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                margin: 20,
                justifyContent: "flex-end",
                alignSelf: "baseline",
              }}
            >
              <View style={styles.slide}>
                <Image
                  style={styles.sliderImage}
                  resizeMode="cover"
                  source={require("./img_categorias/bebidas.jpg")}
                />
              </View>

              <Text style={styles.titulo}>Bebidas</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.push("Menu", {
                navigation: navigation,
                platos: platos.filter((plato) => plato.categoria == "Postres"),
                categoria: "Postres"
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                margin: 20,
                justifyContent: "flex-end",
                alignSelf: "baseline",
              }}
            >
              <View style={styles.slide}>
                <Image
                  style={styles.sliderImage}
                  resizeMode="cover"
                  source={require("./img_categorias/postres.jpg")}
                />
              </View>

              <Text style={styles.titulo}>Postres</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  wrapper: {
    height: 100,
    width: "50%",
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: 50,
    marginTop: 10,
    //justifyContent: "center",
    //alignSelf: "center",
    borderRadius: 8,
    flexDirection: "row",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 8,
    //opacity: 0.5,
  },
  sliderImage: {
    height: 100,
    width: "100%",
    backgroundColor: "#34343438",
    alignSelf: "center",
    borderRadius: 8,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 30,
    fontStyle: "italic",
    position: "absolute",
    color: "white",
    marginTop: 60,
    paddingRight: 10,
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 2,
      height: 2,
    },

    //justifyContent: "center", //Centered vertically
    //alignItems: "center", // Centered horizontally
  },
  tituloContainer: {
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
  },
});
