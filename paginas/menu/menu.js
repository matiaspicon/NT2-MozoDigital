import React, { useEffect } from "react";
import { View, ScrollView} from "react-native";
import Plato from "./plato";

export default function Menu(route) {
  const platos = route.route.params.platos;
  console.log("Platos :", platos);

  useEffect(() => {
    route.navigation.setOptions({ title: `Menu - ${route.route.params.categoria}`});
  }, []);

  return (
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
        {platos &&
          platos.map((plato, index) => (
            <View key={index}>
              <Plato navigation={route.navigation} plato={plato} />
            </View>
          ))}
      </View>
    </ScrollView>
  );
}