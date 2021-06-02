import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import Home from "./paginas/home/index";
import Login from "./paginas/login/index";
import Menu from "./paginas/menu/menuStack";
import Cliente from "./paginas/cliente/index";
import Carrito from "./paginas/carrito/index";
import AppCliente from './paginas/app'


import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GlobalContext from "./components/global/context";

const loginStack = createStackNavigator();

export default function App() {
  const [data, setData] = useState({
    carritoItems: [],
    user: {
      nombre: "",
      mail: "",
      rol: "",
      token: "",
    },
    restaurante: {
      id: "",
      sucursalId: "",
    },
    nombre: "",
    setData: (data) => setData(data),
  });

  return (
    <GlobalContext.Provider value={data}>
      <NavigationContainer>
      <loginStack.Navigator 
      screenOptions={{
        headerShown: false
      }}>
        <loginStack.Screen name="Login" component={Login} />
        <loginStack.Screen name="AppCliente" component={AppCliente} />
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
