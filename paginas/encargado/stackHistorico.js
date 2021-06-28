import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListadoPedidos from "./listadoPedidos";
import DetallesPedido from "../pedido/detallePedido";
import Historico from "./historicos";

const PedidoStack = createStackNavigator();

export default function MenuStackScreen() {
  return (
    <PedidoStack.Navigator>
      <PedidoStack.Screen name="Historicos" component={Historico} />
      <PedidoStack.Screen name="Detalles Pedido" component={DetallesPedido} />
    </PedidoStack.Navigator>
  );
}