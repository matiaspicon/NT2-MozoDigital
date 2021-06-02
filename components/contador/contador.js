import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Icon } from "react-native-elements";

export default function Contador(props) {
  const [habilitado, setHabilitado] = useState(false);

  useEffect(() =>{
    if (props.cantidad > 1)
       setHabilitado(true)
   else
       setHabilitado(false)
 
   },[props.cantidad])

  return (
    <View style={styles.contadorContainer}>
      <Text style={styles.titulo}>Unidades</Text>
      <Icon
        style={styles.icon}
        name="minus"
        type="font-awesome"
        size="20"
        disabled= {!habilitado}
        disabledStyle= {{ color: '#E83232' }}
        onPress={() => props.cambiarCantidad(props.cantidad - 1)            
    }
      />
      <Text style={styles.cantidad}>{props.cantidad}</Text>
      <Icon
        style={styles.icon}
        name="plus"
        type="font-awesome"
        size="20"
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
    backgroundColor: "pink"
  },
  titulo: {
    paddingRight: 10,
  },
  icon: {
    margin: 10,
  },
});
