import { StatusBar } from "expo-status-bar";
import React from "react";
import { Icon } from "react-native-elements";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import Menu from "../menu/menuStack";
import ListadoPedidos from "./stackPedido";
import Historicos from "./historicos";


import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const miStack = createBottomTabNavigator();

export default function Encargado() {
  return (
    
      <miStack.Navigator
        initialRouteName="Pedidos"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Menu") {
              iconName = "cutlery";
            }
            if (route.name === "Listado Pedidos") {
              iconName = "book";
            }
            if (route.name === "Historicos") {
              iconName = "history";
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
        <miStack.Screen name="Listado Pedidos" component={ListadoPedidos} />
        <miStack.Screen name="Historicos" component={Historicos} />                
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



