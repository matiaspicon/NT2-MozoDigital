import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import axios from "axios";
import GlobalContext from "../../components/global/context";

export default function AgregarCliente({ navigation, route }) {

    const context = useContext(GlobalContext);

    const [email, setEmail] = useState();
    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [password, setPassword] = useState();

    async function agregarCliente(
        email,
        nombre,
        apellido,
        password,
    ) {
        const unCliente = {
            email: email,
            nombre: nombre,
            apellido: apellido,
            password: password,
        };
    
        console.log(unCliente);
    
        if (unCliente.email != null && unCliente.nombre != null && unCliente.apellido != null && unCliente.password != null) {
            await axios
                .post(
                    "https://gentle-hamlet-44521.herokuapp.com/api/usuarios",
                    unCliente)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error.response);
                });
    
            navigation.navigate("Login");
        }
    }


    return (
        <ScrollView style={{ flex: 1, flexDirection: "column" }}>
            <View style={styles.clienteDetallesContainer}>

                <View style={styles.clienteDetails}>
                    <View styles={styles.detalle}>
                        <Text>Email: </Text>
                        <TextInput style={styles.descripcion}
                            onChangeText={setEmail} />

                        <Text>Nombre: </Text>
                        <TextInput style={styles.descripcion}
                            onChangeText={setNombre} />

                        <Text>Apellido: </Text>
                        <TextInput style={styles.descripcion}
                            onChangeText={setApellido} />

                        <Text>Password: </Text>
                        <TextInput style={styles.descripcion}
                            onChangeText={setPassword}
                            secureTextEntry={true} />

                        <Text>{'\n'}</Text>

                        <TouchableOpacity
                            style={styles.buttonAddItem}
                            onPress={() =>
                                agregarCliente(
                                    email,
                                    nombre,
                                    apellido,
                                    password,
                                )
                            }
                        >
                            <Text style={styles.addTitle}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}




const styles = StyleSheet.create({
    clienteDetallesContainer: {
        //justifyContent: "center",
        alignItems: "center",
        flex: 1,
        marginTop: 20,
    },
    clienteDetails: {
        marginTop: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        elevation: 5,
        shadowOpacity: 0.7,
        shadowRadius: 0,
        fontSize: 16,
    },
    detalle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    descripcion: {
        lineHeight: 22,
        fontSize: 16,
        borderWidth: 1
    },
    buttonAddItem: {
        alignItems: "center",
        backgroundColor: "#EE3D3D",
        borderRadius: 40,
        padding: 8,
    },
    addTitle: {
        color: "#ffffff",
        fontWeight: "600",
        fontSize: 16,
    },
});
