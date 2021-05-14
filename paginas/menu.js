import React, { useEffect, useState } from 'react';
import { View, Text, Image } from "react-native"

export default function Movies({navigation}) {
      const [platos, setMenu] = useState([])
      
      function buscaMenu() {
        const f = fetch("http://localhost:3000/api/menu");
            return f
            .then(res => res.json())
            .then(json_extraido => {
                console.log("Platos: ", json_extraido.Search);
                setMenu(json_extraido.platos);
            })
        .catch(error => console.log("Fallo:" + error));
        }

      useEffect(()=> {
        buscaMenu()
      },[])

    return(

        <View>       
            {platos && platos.map( (plato,index) =>{
                return(<View key = {index}>
                    <Text>{plato.titulo}</Text>
                    <Text>{plato.precio}</Text>
                    <Image source ={{uri:plato.url_imagen}} style={{height:80, resizeMode:'contain', margin:10}} />
                </View>)
            })}
        </View>  


    )
    
}