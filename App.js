import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, ScrollView, Icon } from "react-native";
import Home from "./paginas/home/index";
import Menu from "./paginas/menu/index";
import Cliente from "./paginas/cliente/index";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

const miStack = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Bienvenidos a Mozo Digital!</Text>
      <StatusBar style="auto" />

      <NavigationContainer>
        <miStack.Navigator initialRouteName="Home">
          <miStack.Screen name="Home" component={Home} />
          <miStack.Screen name="Menu" component={Menu} />
          <miStack.Screen name="Cliente" component={Cliente} />
        </miStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
