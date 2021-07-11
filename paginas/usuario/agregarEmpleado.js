import React, { useEffect, useState, useContext, useReducer } from "react";
import {
    View,
    Text,
    TextInput,
    CheckBox,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Button,
    ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import GlobalContext from "../../components/global/context";
import MultiSelect from "react-multi-select-component";

export default function AgregarEmpleado({ navigation, route }) {
    const context = useContext(GlobalContext);
    const buscaUsuarios = route.params.buscaUsuarios;
    const [email, setEmail] = useState();
    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [password, setPassword] = useState();
    const [rol, setRol] = useState("");
    const [mesas, setMesas] = useState([]);
    const [mesasDisponibles, setMesasDisponibles] = useState();
    const [mesasOp, setMesasOp] = useState([]);

    async function buscaMesas() {
        await axios
            .get(
                "https://gentle-hamlet-44521.herokuapp.com/api/restaurantes/" +
                context.restaurante.idRestaurante +
                "/sucursales/" +
                context.restaurante.idSucursal
            )
            .then((response) => {
                console.log(response);
                setMesasDisponibles(response.data.mesas);
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    useEffect(() => {
        buscaMesas();
        if (rol == "Mozo") {
            for (let index = 1; index <= mesasDisponibles.length; index++) {
                if (mesasOp.length != mesasDisponibles) {
                    mesasOp.push({ label: index, value: index });
                }
            }
        }
    }, [rol]);

    async function agregarEmpleado(
        email,
        nombre,
        apellido,
        password,
        rol,
        mesas
    ) {
        mesas = mesas.map((element) => element.value);
        const unEmpleado = {
            email: email,
            nombre: nombre,
            apellido: apellido,
            password: password,
            rol: rol,
            restaurante: context.restaurante.idRestaurante,
            sucursal: context.restaurante.idSucursal,
            mesas: mesas,
        };

        console.log(unEmpleado);

        if (
            unEmpleado.email != null &&
            unEmpleado.nombre != null &&
            unEmpleado.apellido != null &&
            unEmpleado.password != null &&
            unEmpleado.rol != null
        ) {
            await axios
                .post(
                    "https://gentle-hamlet-44521.herokuapp.com/api/usuarios/empleado",
                    unEmpleado,
                    { headers: { Authorization: `Bearer ${context.user.token}` } }
                )
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error.response);
                });
            buscaUsuarios();
            navigation.navigate("Empleados");
        }
    }


    if (context.user.rol == "Encargado") {
        return (
            <ScrollView style={{ flex: 1, flexDirection: "column" }}>
                <View style={styles.empleadoDetallesContainer}>
                    <View style={styles.empleadoDetails}>
                        <View styles={styles.detalle}>

                            <Text>Nombre: </Text>
                            <TextInput style={styles.descripcion} onChangeText={setNombre} />

                            <Text>Apellido: </Text>
                            <TextInput
                                style={styles.descripcion}
                                onChangeText={setApellido}
                            />
                            
                            <Text>Email: </Text>
                            <TextInput style={styles.descripcion} onChangeText={setEmail} />

                            <Text>Password: </Text>
                            <TextInput
                                style={styles.descripcion}
                                onChangeText={setPassword}
                            />

                            <Text>Rol: </Text>
                            <Picker
                                onValueChange={(rol, itemIndex) => setRol(rol)}
                                selectedValue={rol}
                                style={{ width: 200 }}
                            >
                                <Picker.Item label="Encargado" value="Encargado" />
                                <Picker.Item label="Cocinero" value="Cocinero" />
                                <Picker.Item label="Mozo" value="Mozo" />
                            </Picker>

                            {rol == "Mozo"
                                ? [
                                    <Text>Mesas: </Text>,
                                    <MultiSelect
                                        options={mesasOp}
                                        value={mesas}
                                        onChange={setMesas}
                                        labelledBy="Mesas"
                                    />,
                                ]
                                : null}

                            <Text>{"\n"}</Text>

                            <TouchableOpacity
                                style={styles.buttonAddItem}
                                onPress={() =>
                                    agregarEmpleado(email, nombre, apellido, password, rol, mesas)
                                }
                            >
                                <Text style={styles.addTitle}>Agregar Empleado</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
        empleadoDetallesContainer: {
            //justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginTop: 20,
        },
        empleadoDetails: {
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
        elevation: 5,
        shadowOpacity: 0.7,
        shadowRadius: 0,
        fontSize: 16,
    });
