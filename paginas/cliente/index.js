import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import { Icon } from "react-native-elements";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import Home from "../home/index";
import Menu from "../menu/menuStack";
import Usuario from "./me";
import Carrito from "../carrito/index";
import Pedidos from "./stackPedido";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GlobalContext from "../../components/global/context";

const miStack = createBottomTabNavigator();

export default function Cliente() {
  const context = useContext(GlobalContext);

  return (    
      <miStack.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Menu") {
              iconName = "cutlery";
            }
            if (route.name === "Usuario") {
              iconName = "user";
            }
            if (route.name === "Carrito") {
              iconName = "shopping-cart";
            }
            if (route.name === "Pedidos") {
              iconName = "book";
            }

            return (
              <Icon
                name={iconName}
                type="font-awesome"
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#FFFFFF",
          inactiveTintColor: "#C4C4C4",
          style: {
            backgroundColor: '#EE3D3D',
          },
        }}
      >
        <miStack.Screen name="Menu" component={Menu} />
        <miStack.Screen name="Usuario" component={Usuario} />
        <miStack.Screen name="Pedidos" component={Pedidos} />                    
        <miStack.Screen name="Carrito" component={Carrito} />                    
      </miStack.Navigator>  
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



