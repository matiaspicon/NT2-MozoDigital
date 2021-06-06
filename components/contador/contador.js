import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Icon } from "react-native-elements";

export default function Contador(props) {
  const [habilitado, setHabilitado] = useState(false);

  useEffect(() => {
    if (props.cantidad > 1) setHabilitado(true);
    else setHabilitado(false);
  }, [props.cantidad]);

  return (
    <View style={styles.btns}>
      {/* <Text style={styles.titulo}>Unidades</Text> */}
      <Icon
        style={styles.icon}
        name="minus"
        type="font-awesome"
        size={15}
        disabled={!habilitado}
        disabledStyle={{ backgroundColor: '#DCDCDC'}}
        onPress={() => props.cambiarCantidad(props.cantidad - 1)}
      />
      <Text style={styles.cantidad}>{props.cantidad}</Text>
      <Icon
        style={styles.icon}
        name="plus"
        type="font-awesome"
        size={15}
        onPress={() => props.cambiarCantidad(props.cantidad + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contadorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "pink",
  },
  btns: {
    width: 100,
    height: 35,
    backgroundColor: "#DCDCDC",    
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
    //marginBottom: 20,     
  },
  titulo: {
    paddingRight: 10,
  },
  icon: {
    margin: 10,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  cantidad: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
});
