import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetallesPlato from "./platoDetalle";
import Home from "./menuHome.js";
import Menu from "./menu.js";
import AgregarItem from "./agregarItem";

const MenuStack = createStackNavigator();

export default function MenuStackScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Home" component={Home} />
      <MenuStack.Screen name="Menu" component={Menu} />
      <MenuStack.Screen name="Detalles Plato" component={DetallesPlato} />      
    </MenuStack.Navigator>
  );
}
