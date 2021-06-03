import React, { useEffect, useState, useReducer, useContext } from "react";
import {SafeAreaView, StyleSheet, View, Text, Image, Button } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu from "../menu/index";
import Contador from "../../components/contador/contador";

import { data, reducer } from "../../services/global/useReduce";

import GlobalContext from "../../components/global/context"


export default function Carrito({ navigation, route }) {

  const [state, dispatch] = useReducer(reducer, data);

  const context = useContext(GlobalContext)

  useEffect(() => {
      console.log("State dentro de Carrito: ",context);
  }, [])
  
  function devolverTotal() {
    let total = 0;
    context.carritoItems.forEach(carritoItem => {
      total = total + (carritoItem.precio * carritoItem.cantidad);
    });
    return total;
  }


  const CartCard = ({item}) => {
    const cambiarCantidad = function(cantidad){
      let contextCopia = {...context};
      contextCopia.carritoItems.find((itemFind)=> itemFind._id == item._id).cantidad = cantidad;
      context.setData(contextCopia);
    }

    return (

      <View style={style.cartCard}>
        <Image source={{uri: item.url_imagen}} style={{height: 80, width: 80}} />
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
              cambiarCantidad={cambiarCantidad}
              // aumentarCantidad={() => context.setData({...context, carritoItems: [...context.carritoItems,{...item, cantidad: item.cantidad+1}]})}
              // disminuirCantidad={() => context.setData({...context, carritoItems: [...context.carritoItems,{...item, cantidad: item.cantidad-1}]})}
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
        data={context.carritoItems}
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

