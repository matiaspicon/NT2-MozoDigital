import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import Plato from "./plato";

export default function Menu({ navigation, platos }) {
  return (
    <View>
      {platos && platos.map((plato, index) => (
        <View key={index}>
          <Plato plato={plato} />
        </View>
        
      ))}
    </View>
  );
}
