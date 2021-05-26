import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Menu from "./menu";

export default function Index({ navigation }) {
  const [platos, setMenu] = useState([]);
  console.log('NAVIGATION INDEX:', navigation)

  function buscaMenu() {
    const f = fetch("http://localhost:3000/api/restaurantes/60ad9d02a7ec12baac4d59e1/sucursales/0");
    return f
      .then((res) => res.json())
      .then((json_extraido) => {
        console.log("Platos: ", json_extraido);
        setMenu(json_extraido.menu);
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
