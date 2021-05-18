import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableHighlight} from "react-native";
import PlatoDetalle from './platoDetalle'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

export default function Plato({ navegation, plato }) {
  return (
    <View>
      <Text>{plato.titulo}</Text>
      <Text>{plato.precio}</Text>


      <TouchableHighlight >
        <Image
          source={{ uri: plato.url_imagen }}
          style={{ height: 80, width:150, resizeMode: "contain", margin: 10 }}
        />
      </TouchableHighlight>
    </View>
  );
}
