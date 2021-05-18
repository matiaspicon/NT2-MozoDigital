import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableHighlight} from "react-native";
import PlatoDetalle from './platoDetalle'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";


export default function Plato({ navegation, plato }) {
  return (
    <TouchableHighlight >
    <View style={{height: 190, 
    width: 220,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 13,
    backgroundColor: '#FFF'}}>
      <View style={{alignItems: 'center', top: -20}}>
        <Image
          source={{ uri: plato.url_imagen }}
          style={{ height: 150, width: 150, borderRadius: 80}}
        />
      </View >
      <View style={{alignItems: 'center',
      marginHorizontal: 20, top: -10}}>
        <Text style={{fontWeight: 'bold'}}>{plato.titulo}</Text>
        <Text style={{fontWeight: 'bold'}}>${plato.precio}</Text>
        </View>
    </View>
    </TouchableHighlight>
  );
};