import { StatusBar } from "expo-status-bar";
import React from "react";
import { Icon } from "react-native-elements";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import Home from "./paginas/home/index";
import Menu from "./paginas/menu/menuStack";
import Cliente from "./paginas/cliente/index";
import Carrito from "./paginas/carrito/index";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const miStack = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
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
