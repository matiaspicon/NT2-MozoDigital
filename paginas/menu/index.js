import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Menu from "./menu";

export default function Movies({ navigation }) {
  const [platos, setMenu] = useState([]);

  function buscaMenu() {
    const f = fetch("http://localhost:3000/api/menu");
    return f
      .then((res) => res.json())
      .then((json_extraido) => {
        console.log("Platos: ", json_extraido.platos);
        setMenu(json_extraido.platos);
      })
      .catch((error) => console.log("Fallo:" + error));
  }

  useEffect(() => {
    buscaMenu();
  }, []);

  return (
    <ScrollView>
      <Menu platos={platos} />
    </ScrollView>
  );
}
