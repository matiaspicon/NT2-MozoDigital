import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Plato from "./plato";

export default function Menu({ navigation, platos }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>

      {platos && platos.map((plato, index) => (
        <View key={index}>
          <Plato plato={plato} />
        </View>
        
      ))}
    </View>
  );
}
