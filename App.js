import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Menu from './paginas/menu'

export default function App() {

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start workinsdsdfsdfg on your app!</Text>
      <StatusBar style="auto" />
      <ScrollView>
         <Menu/>
      </ScrollView>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
