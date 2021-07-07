import React, { useEffect, useState } from "react";
import { View, ScrollView} from "react-native";
import Plato from "./plato";
import { SearchBar } from "react-native-elements";

export default function Menu({route, navigation}) {
  const platos = route.params.platos;
  const [platosFiltrados, setPlatosFiltrados] = useState();
  const [filtro, setFiltro] = useState("");
  console.log("Platos :", platos);

  const buscaMenu = route.params.buscaMenu;

  useEffect(() => {
    navigation.setOptions({ title: `Menu - ${route.params.categoria}`});
  }, []);

  useEffect(() => {
    setPlatosFiltrados(platos.filter((plato) => plato.titulo.toLowerCase().includes(filtro.toLowerCase())))
  }, [filtro]);

  return (
    <>
    <SearchBar
      placeholder="Buscar"
      onChangeText={(text) => setFiltro(text)}
      value={filtro}
      round="true"
    />
    <ScrollView>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "space-around",
          justifyContent: "center",
        }}
      >
        
        {platosFiltrados &&
          platosFiltrados.map((plato, index) => (
            <View key={index}>
              <Plato navigation={navigation} plato={plato} buscaMenu={buscaMenu}/>
            </View>
          ))}
      </View>
    </ScrollView>
    </>
  );
}