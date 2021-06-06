import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListadoPedidos from "./listadoPedidos";
import DetallesPedido from "./detallePedido";

const PedidoStack = createStackNavigator();

export default function MenuStackScreen() {
  return (
    <PedidoStack.Navigator>
      <PedidoStack.Screen name="Listado Pedidos" component={ListadoPedidos} />
      <PedidoStack.Screen name="Detalles Pedido" component={DetallesPedido} />
    </PedidoStack.Navigator>
  );
}