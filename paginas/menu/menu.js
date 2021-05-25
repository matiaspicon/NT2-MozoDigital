import React from "react";
import { View } from "react-native";
import Plato from "./plato";

export default function Menu({ navigation, platos }) {
  //console.log("NAVIGATION MENU:", navigation);
  return (
    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap"}}>
      {platos &&
        platos.map((plato, index) => (
          <View key={index}>
            <Plato navigation={navigation} plato={plato} />
          </View>
        ))}
    </View>
  );
}