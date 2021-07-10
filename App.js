import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Button,
  ScrollView,
} from "react-native";
import Login from "./paginas/login/index";
import Cliente from "./paginas/cliente";
import Encargado from "./paginas/encargado/index";
import Cocinero from "./paginas/cocinero/index";
import Mozo from "./paginas/mozo/index";
import CodigoQR from "./paginas/codigoqr/index"
import IngresarMesa from "./paginas/cliente/ingresarMesa"
import Register from "./paginas/cliente/agregarCliente"
import { NavigationContainer } from "@react-navigation/native";
import GlobalContext from "./components/global/context";

const loginStack = createStackNavigator();

export default function App() {
  const [carritoItems, setCarritoItems] = useState([]);

  const [user, setUser] = useState({
    _id: "",
    nombre: "",
    mail: "",
    rol: "",
    token: "",
    mesas: []
  });

  const [restaurante, setRestaurante] = useState({
    idRestaurante: "",
    idSucursal: "",
    mesa: -1,
  });

  return (
    <GlobalContext.Provider
      value={{
        carritoItems,
        setCarritoItems,
        user,
        setUser,
        restaurante,
        setRestaurante,
      }}
    >
      <StatusBar backgroundColor="black" />
      <NavigationContainer>
        <loginStack.Navigator screenOptions={{ headerShown: false }}>
          <loginStack.Screen name="Login" component={Login} />
          <loginStack.Screen name="CodigoQR" component={CodigoQR} />
          <loginStack.Screen name="IngresarMesa" component={IngresarMesa} />
          <loginStack.Screen name="Register" component={Register} />
          <loginStack.Screen name="Cliente" component={Cliente} />
          <loginStack.Screen name="Encargado" component={Encargado} />
          <loginStack.Screen name="Cocinero" component={Cocinero} />
          <loginStack.Screen name="Mozo" component={Mozo} />
        </loginStack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
});
