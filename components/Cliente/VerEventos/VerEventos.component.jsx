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

    const fetchData = async (usuario) => {
      try {
        const { data } = await Axios.get(
          `https://unidad-2-movil.herokuapp.com/libro/${usuario}`
        );
        console.log(data);
  
          setTimeout(() =>  NumberList(data), 1000);
  
      }catch (error) {
        console.log(error);
      }
    };
  
    fetchData(usuariox);

  }

  // const eliminarItem = (saveId) => {

  //   const fetchData = async id => {
  //     try {
  //       const { data } = await Axios.delete(
  //         `https://unidad-2-movil.herokuapp.com/tarea/${id}`
  //       );
  //       // console.log(data);
  //       alert("Task deleted successfully!");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  
  //   fetchData(saveId);

  //   setTimeout(() =>  Reload(), 1000);

  // }

  // const echoItem = (saveId) => {

  //   // alert(saveId);

  //   const fetchData = async (_id, estado) => {
  //     try {
  //       const { data } = await Axios.put(
  //         `https://unidad-2-movil.herokuapp.com/tarea/${_id}`,
  //         {
  //           estado
  //         }
  //       );
  //       // console.log(data);
  //       alert("Task done!");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  
  //   fetchData(
  //     saveId,
  //     "false"
  //   );

  //   setTimeout(() =>  Reload(), 1000);

  // }

  const NumberList = (data) => {

    const borrar = "";

    setLook(borrar);

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
            <Button onPress={() => openGallery(_id)}>Change image</Button>
            <Button onPress={() => echoItem(_id)}>Postulates</Button>
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

  //Change image

  const uploadImage = uri => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };

      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    });
  };

  const openGallery = async (_id) => {
    // const resultPermission = await Permissions.askAsync(
    //   Permissions.CAMERA_ROLL
    // );

    // if (resultPermission) {
      const resultImagePicker = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (resultImagePicker.cancelled === false) {
        const imageUri = resultImagePicker.uri;

        uploadImage(imageUri)
          .then(resolve => {
            let ref = firebase
              .storage()
              .ref()
              .child(`images/${_id}`);
            ref
            .put(resolve)
            .then(resolve => {
              alert("image changed successfully!");
              setTimeout(() =>  Reload(), 1000);
            })
            .catch(error => {
              alert("Image upload error");
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    // }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.scrollSafe}>
      <ScrollView style={styles.scrollView}>
      {/* Simple button that calls our function */}
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>{i18n.t("TODOS_SIGN_OUT_TEXT")}</Text>
      </TouchableOpacity>
      <Text>{i18n.t('CLIENT_TODO_TABS').NEW_PUBLICATIONS_TEXT}</Text>
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