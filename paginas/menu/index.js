import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Menu from "./menu";

export default function Index({ navigation }) {
  const [platos, setMenu] = useState([]);
  console.log('NAVIGATION INDEX:', navigation)

  function buscaMenu() {
    const f = fetch("http://localhost:3000/api/menu");
    return f
      .then((res) => res.json())
      .then((json_extraido) => {
        console.log("Platos: ", json_extraido);
        setMenu(json_extraido);
      })
      .catch((error) => console.log("Fallo:" + error));
  }

  useEffect(() => {
    buscaMenu();
  }, []);

  return (
    <ScrollView>
      <Menu navigation={navigation} platos={platos} />
    </ScrollView>
  );
}
