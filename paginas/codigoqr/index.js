import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import GlobalContext from "../../components/global/context";

export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [ready, setReady] = useState(false);
  const context = useContext(GlobalContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`${data}`);    
    try{
      const {idRestaurante, idSucursal, mesa} = JSON.parse(data);
      context.setRestaurante({idRestaurante, idSucursal, mesa});
      setReady(true);
    }catch(error){
      console.log(error.message)
      alert("Ocurrio un error en el escaneo... Intente nuevamente");
    }

    
  };

  if (hasPermission === null) {
    console.log("Requesting for camera permission");
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    console.log("No access to camera");
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>HOLASDASDASDSD</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {/* <Button
        title={"Ingresar manualmente"}
        onPress={() => navigation.push("IngresarMesa")}
      /> */}
      {scanned && (
        <View>
          <Button
            title={"Escanear nuevamente"}
            onPress={() => setScanned(false)}
          />
          {ready && <Button
            title={"Continuar"}
            onPress={() => navigation.push("Cliente")}
          />}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  barCodeView: {
    width: "100%",
    height: "50%",
    marginBottom: 40,
  },
});
