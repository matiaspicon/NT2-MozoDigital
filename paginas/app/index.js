import { StatusBar } from "expo-status-bar";
import React from "react";
import { Icon } from "react-native-elements";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import Home from "../home/index";
import Menu from "../menu/menuStack";
import Cliente from "../cliente/index";
import Carrito from "../carrito/index";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const miStack = createBottomTabNavigator();

export default function AppCliente() {
  return (
    
      <miStack.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            }
            if (route.name === "Menu") {
              iconName = "cutlery";
            }
            if (route.name === "Cliente") {
              iconName = "user";
            }
            if (route.name === "Carrito") {
              iconName = "shopping-cart";
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
        <miStack.Screen name="Home" component={Home} />
        <miStack.Screen name="Menu" component={Menu} />
        <miStack.Screen name="Cliente" component={Cliente} />
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



