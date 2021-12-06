import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, TextInput, SafeAreaView, ScrollView, StatusBar} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from "@react-navigation/core";

import { auth } from "../../../firebase";
import {firebase} from '../../../firebase';

import i18n from '../../../Localization/i18n.js';

import * as ImagePicker from 'expo-image-picker';

const EventosComponent = ({route}) => {
    const dataa = route.params;
    // console.log(data);
    
    const nombrex = dataa.nombre;
    const estadox = dataa.estado;
    const ciudadx = dataa.ciudad;
    const usuariox = dataa.id;
    const telefonox = dataa.telefono;

    const [look, setLook] = useState("");
    const [image, setImage] = useState(null);

    const [status, setStatus] = useState("1");

  const navigation = useNavigation();  

  const Axios = require('axios').default;

  useEffect(() => {

  Reload();
    
  }, []);

  const Reload = () => {

    const fetchData = async (estadoxz) => {
      try {
        const { data } = await Axios.get(
          `https://unidad-2-movil.herokuapp.com/libro/mesero/${estadoxz}`
        );
        // console.log(data);
  
          setTimeout(() =>  NumberList(data), 1000);
  
      }catch (error) {
        console.log(error);
      }
    };
  
    fetchData(estadox);

  }

  const echoItem = (saveId, saveCantidad) => {

    // alert(saveId);

    const fetchData = async (idMesero) => {
      try {
        const { data } = await Axios.get(
          `https://unidad-2-movil.herokuapp.com/prestamo/mesero/${idMesero}`
        );
        // console.log(data);
  
          setTimeout(() =>  MapiarEvento(data, saveId, saveCantidad), 1000);
          // alert("ok");
          // navigation.replace("VerEventos");
  
      }catch (error) {
        console.log(error);
      }
    };
  
    fetchData(usuariox);

    // setTimeout(() =>  Reload(), 1000);

  }

  const MapiarEvento = (data, saveId, saveCantidad) => {
    const ListItems = data.prestamos.map(({id_evento}, index) =>
      // {id_evento == saveId ? alert("You are currently registered!") : postularze(saveId, saveCantidad) }
      {id_evento == saveId ? setStatus("0") : clearTimeout() }
    );
    {status == "1" ? postularze(saveId, saveCantidad) : 
    alert("You are currently registered!");
    setStatus("1");
   };
  }

  const postularze = (saveId, saveCantidad) => {

    const fetchData = async (idEvento, cantidad) => {
          try {
            const { data } = await Axios.put(
              `https://unidad-2-movil.herokuapp.com/libro/mesero/${idEvento}`,
              {
                cantidad
              }
            );
            // console.log(data);
            // alert("-1!");
            setTimeout(() =>  guardarCambios(saveId), 1000);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData(
          saveId,
          saveCantidad
        );

  }

  const guardarCambios = (saveId) => {

    const fetchData = async (nombre_mesero, numero_telefonico, id_evento, id_mesero) => {
      try {
        const { data } = await Axios.post(
          "https://unidad-2-movil.herokuapp.com/prestamo",
          {
            nombre_mesero, 
            numero_telefonico,
            id_evento,
            id_mesero
          }
        );
        console.log(data);
        alert("Successfully accepted!");
        // navigation.replace("VerEventos");
        
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };
  
    fetchData(
      nombrex,
      telefonox,
      saveId,
      usuariox
    );

  }

  const NumberList = (data) => {

    const ListItems = data.resp.map(({_id, evento, dia, inicio, descripcion, paga, cantidad}, index) =>
      <Card>
          <Card.Title title={evento} subtitle={paga} />
          <Card.Content>
          {/* {loadImage(_id)} */}
            <Title>{dia}, {inicio}</Title>
            <Paragraph>{descripcion}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: `https://firebasestorage.googleapis.com/v0/b/expo-meseros.appspot.com/o/images%2F${_id}?alt=media&token=2f72d38b-b67a-4d51-9d09-024ccccfe2d0` }} />
          <Card.Actions>
            <Button onPress={() => echoItem(_id, cantidad)}>{i18n.t('WAITER_TODO_TABS').ACCEPT_BUTTON}</Button>
          </Card.Actions>
        </Card>
    );

    // setLook([dise, ...look]);
  setLook(ListItems);
  // setChange((current) => current + 1);
  } 

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.scrollSafe}>
      <ScrollView style={styles.scrollView}>
      {/* Simple button that calls our function */}
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>{i18n.t("TODOS_SIGN_OUT_TEXT")}</Text>
      </TouchableOpacity>
      <Text>{i18n.t("WAITER_TODO_TABS").NEW_PUBLICATIONS}</Text>
      <Text>{look}</Text>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default EventosComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 50,
  },
  scrollView: {
    // backgroundColor: 'yellow',
    marginHorizontal: 20,
  },
  scrollSafe: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 42,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    height: 70,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginEnd: 5
  },
  buttonItem: {
    alignItems: 'center',
    width: 70,
    height: 40,
    backgroundColor: '#FF7979',
    borderRadius: 2,
    marginLeft: 10,
  },
  buttonItem2: {
    alignItems: 'center',
    width: 70,
    height: 40,
    backgroundColor: '#94ff79',
    borderRadius: 2,
    marginLeft: 10,
  },
  textItem: {
    marginTop: 2
  }
  
});