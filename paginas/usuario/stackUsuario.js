import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Usuario from "./usuario";
import DetalleUsuario from "./usuarioDetalle";
import Empleados from "./empleados";

const UsuarioStack = createStackNavigator();

export default function UsuariosStackScreen() {
  return (
    <UsuarioStack.Navigator>
      <UsuarioStack.Screen name="Empleados" component={Empleados} />
      <UsuarioStack.Screen name="Usuario" component={Usuario} />
      <UsuarioStack.Screen name="Detalle Usuario" component={DetalleUsuario} />
    </UsuarioStack.Navigator>
  );
}