import React from "react";


export const data = {
    carritoItems : [{
        "_id": 0,
        "titulo": "Suprema de Pollo",
        "precio": 880,
        "descripcion": "Este es un plato es muy rico",
        "url_imagen": "https://unacomidaperuana.com/wp-content/uploads/2019/09/suprema-de-pollo.jpg",
        "categoria": "minuta",
        "habilitado": true,
        "cantidad":1
    }],
    user : {
        nombre : "",
        mail : "",
        rol : "",
        token : ""
    },
    restaurante : {
        id : "",
        sucursalId: ""
    },
    nombre : ""
};

export const reducer = (state, action) => {
    console.log(state, action)
    switch(action.type) {
        case 'UPDATE_USER':
            return {...state, user : action.user}    
        case 'UPDATE_RESTAURANTE':
            return {...state, restaurante : action.restaurante}
        case 'ADD_CARRITO_ITEM':
            console.log('denttro de carrito item')
            data.carritoItems.push(action.item)
            return {...state, carritoItems : [...state.carritoItems, action.item]}
        case 'INCREMENT_CARRITO_ITEM':
           // console.log(data.carritoItems.find((item)=> item._id == action.item._id))
            data.carritoItems.find((item)=> item._id == action.item._id).cantidad++;
            return {...state}   
        case 'REDUCE_CARRITO_ITEM':
           // console.log(data.carritoItems.find((item)=> item._id == action.item._id))
            data.carritoItems.find((item)=> item._id == action.item._id).cantidad--;
            return {...state}  
    }
}


// export const initialState = 1;

// export const reducer_cont = (state, action) => {
//   switch (action.type) {
//     case 'increment': return state + 1;
//     case 'decrement': return state - 1;
//     case 'set': return action.count;
//     default: throw new Error('Unexpected action');
//   }
// };