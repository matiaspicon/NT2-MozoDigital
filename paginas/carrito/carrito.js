import React, { useEffect, useState } from "react";
import {SafeAreaView, StyleSheet, View, Text, Image, Button } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { agregarCarritoItem, listadoCarritoItem, carritoItems, devolverTotal } from "./carrito-crud";
import Menu from "../menu/index";
import Contador from "../../components/contador/contador";

export default function Carrito({ navigation, route }) {
  //console.log("NAVIGATION MENU:", navigation);

  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    //console.log("Cambio cantidad" + cantidad);
  }, [cantidad]);

  let [items, setItems] = useState([...carritoItems]);

  const [count, setCount] = useState(0);
  const onPress = () => setItems([...carritoItems]);

  
  const CartCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <Image source={item.url_imagen} style={{height: 80, width: 80}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.titulo}</Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>${item.precio}</Text>
          <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-arround'}}>
              <Contador 
              cantidad={item.cantidad}
              aumentarCantidad={() => {item.cantidad = item.cantidad + 1; onPress()}}
              disminuirCantidad={() => {item.cantidad = item.cantidad - 1; onPress()}}
            />
            </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: "white", flex: 1}}>
      <View style={style.header}>
        <Text style={{fontSize: 18, fontWeight: "500"}}>Carrito</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={carritoItems}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Total
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>${devolverTotal()}</Text>
            </View>
            <View style={{marginHorizontal: 30}}>
              <Button title="Realizar pedido" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: "grey",
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

