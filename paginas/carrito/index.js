import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView } from "react-native";
import { listadoCarritoItem } from "./carrito-crud";
import Carrito from "./carrito";

export default function Index( navigation, route) {
  //const [carritoItems, setCarritoItems] = useState();

  return (
    //console.log("Este es el carrito: ", listadoCarritoItem());
  <ScrollView> 
    <Carrito navigation={navigation} carritoItems={listadoCarritoItem()} />
  </ScrollView>
  )
}
