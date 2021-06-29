import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import QRScan from "../../components/qrScanner";

import GlobalContext from "../../components/global/context";

export default function Home({ navigation }) {
  const context = useContext(GlobalContext);

  return (
    <View>
      <Text>Ingrese el numero de mesa</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Cliente")}>
        <Text>Ir a cliente</Text>
      </TouchableOpacity>
    </View>
  );
}
