import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, TextInput, SafeAreaView, ScrollView, StatusBar} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from "@react-navigation/core";

import { auth } from "../../../firebase";
import {firebase} from '../../../firebase';

import * as ImagePicker from 'expo-image-picker';

import i18n from '../../../Localization/i18n.js';

const VerEventosComponent = ({route}) => {
    const data = route.params;
    // console.log(data);

    const nombrex = data.nombre;
    const estadox = data.estado;
    const ciudadx = data.ciudad;
    const usuariox = data.id;

    const [look, setLook] = useState("");
    const [image, setImage] = useState(null);

  const navigation = useNavigation();  

  const Axios = require('axios').default;

  useEffect(() => {

  Reload();
    
  }, []);

  const Reload = () => {

    const fetchData = async (idMesero) => {
      try {
        const { data } = await Axios.get(
          `https://unidad-2-movil.herokuapp.com/prestamo/mesero/${idMesero}`
        );
        console.log(data);
  
          setTimeout(() =>  MapiarEvento(data), 1000);
  
      }catch (error) {
        console.log(error);
      }
    };
  
    fetchData(usuariox);

  }

  const MapiarEvento = (data) => {
    const ListItems = data.prestamos.map(({id_evento}, index) =>

    listarmiseventos(id_evento)

    );
  }

  const listarmiseventos = (id_evento) => {

    const fetchData = async (idEvento) => {
      try {
        const { data } = await Axios.get(
          `https://unidad-2-movil.herokuapp.com/libro/mesero/ver/aceptado/${idEvento}`
        );
        console.log(data);
  
          setTimeout(() =>  NumberList(data), 1000);
  
      }catch (error) {
        console.log(error);
      }
    };
  
    fetchData(id_evento);

  }

  const NumberList = (data) => {

    const ListItems = data.resp.map(({_id, evento, dia, inicio, descripcion, paga}, index) =>
      <Card>
          <Card.Title title={evento} subtitle={paga} />
          <Card.Content>
          {/* {loadImage(_id)} */}
            <Title>{dia}, {inicio}</Title>
            <Paragraph>{descripcion}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: `https://firebasestorage.googleapis.com/v0/b/expo-meseros.appspot.com/o/images%2F${_id}?alt=media&token=2f72d38b-b67a-4d51-9d09-024ccccfe2d0` }} />
          <Card.Actions>
            {/* <Button onPress={() => eliminarItem(_id)}>Delete</Button>
            <Button onPress={() => echoItem(_id)}>Postulates</Button> */}
          </Card.Actions>
        </Card>
    );

    // setLook([ListItems, ...look]);
  // setLook(ListItems);
  setLook((look) => {
    return[ ListItems, ...look]});
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
        <Text style={styles.buttonText}>{i18n.t('TODOS_SIGN_OUT_TEXT')}</Text>
      </TouchableOpacity>
      <Text>{i18n.t('WAITER_TODO_TABS').MY_EVENTS_TEXT}</Text>
      <Text>{look}</Text>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default VerEventosComponent;

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