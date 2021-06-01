import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Menu from "../menu/index";

export const carritoItems = [];

export function agregarCarritoItem(carritoItem) {
      
    carritoItems.push(carritoItem);

      //console.log("Estoy es el array original: ", carritoItems);
}

export function devolverTotal() {
  let total = 0;
  carritoItems.forEach(carritoItem => {
    total = total + (carritoItem.precio * carritoItem.cantidad);
  });
  return total;
}

export function listadoCarritoItem() {
  return carritoItems;
}

export function submitPedido() {
  
}