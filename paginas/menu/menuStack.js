import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./index";
import DetallesPlato from "./platoDetalle";

const MenuStack = createStackNavigator();

export default function MenuStackScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Menu" component={Menu} />
      <MenuStack.Screen name="Detalles Plato" component={DetallesPlato} />
    </MenuStack.Navigator>
  );
}
