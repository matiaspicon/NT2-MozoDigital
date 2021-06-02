import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Button } from "react-native";

export default function Login({navigation}) {
  return (
      <View>
          <Text>
            Vista de login  
          </Text>
          <Button title="Loguerase" onPress={() => navigation.navigate("AppCliente")}/>

      </View>
  )
}