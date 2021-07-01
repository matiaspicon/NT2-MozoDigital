import React from "react";

const data = {
    carritoItems : [],
    user : {
        nombre : "",
        mail : "",
        rol : "",
        token : ""
    },
    restaurante : {
        id : "",
        sucursalId: "",
        mesa: ""
    },
    nombre : "",    
};



export default React.createContext(data);