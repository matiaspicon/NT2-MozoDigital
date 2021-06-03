import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, SafeAreaView, Text, View, Button, ScrollView } from "react-native";
import Login from "./paginas/login/index";
import AppCliente from "./paginas/app";
import { NavigationContainer } from "@react-navigation/native";
import GlobalContext from "./components/global/context";

const loginStack = createStackNavigator();

export default function App() {
  const [carritoItems, setCarritoItems] = useState([]);

  const [user, setUser] = useState({
    nombre: "",
    mail: "",
    rol: "",
    token: "",
  });

  const [restaurante, setRestaurante] = useState({
    idRestaurante : "",
    idSucursal : "",
  })

  return (
    <GlobalContext.Provider value={{
      carritoItems,
      setCarritoItems,
      user,
      setUser,
      restaurante,
      setRestaurante
    }}>
      <StatusBar backgroundColor="black" />      
        <NavigationContainer>
          <loginStack.Navigator screenOptions={{headerShown: false}}>
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
