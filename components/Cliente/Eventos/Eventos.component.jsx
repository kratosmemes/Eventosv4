import React, { useEffect, useState } from "react";
import { ButtonContainer, InputContainer, Container, Button, ButtonOutline, ButtonText,
  ButtonOutlineText, Input, OnlyText } from "../../../styledComponents/StyledComp";

  import { StyleSheet, SafeAreaView, ScrollView, StatusBarAnimation, Image, StatusBar} from "react-native";

import { useNavigation } from "@react-navigation/core";

import { auth } from "../../../firebase";
import {firebase} from '../../../firebase';

import i18n from '../../../Localization/i18n.js';

import * as ImagePicker from 'expo-image-picker';
import I18n from "i18n-js";

const EventosComponent = ({route}) => {
    const data = route.params;
    // console.log(data);

    const nombrex = data.nombre;
    const estadox = data.estado;
    const ciudadx = data.ciudad;
    const usuariox = data.id;

    const [eventox, setEventox] = useState("");
    const [descripcionx, setDescripcionx] = useState("");
    const [cantidadx, setCantidadx] = useState("");
    const [pagax, setPagax] = useState("");
    const [diax, setDiax] = useState("");
    const [iniciox, setIniciox] = useState("");
    const [terminox, setTerminox] = useState("");
    const [coloniax, setColoniax] = useState("");
    const [callex, setCallex] = useState("");
    const [exteriorx, setExterirorx] = useState("");
    const [interiorx, setInteriorx] = useState("");

    const navigation = useNavigation();

    const Axios = require('axios').default;

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

    const newItem = () => {
        const fetchData = async (nombre, evento, descripcion, cantidad, paga, dia, inicio, termino, estado_M,
                                 ciudad, colonia, calle, exterior, interior, usuario) => {
            try {
              const { data } = await Axios.post(
                "https://unidad-2-movil.herokuapp.com/libro",
                {
                nombre,
                evento,
                descripcion,
                cantidad,
                paga,
                dia,
                inicio,
                termino,
                estado_M,
                ciudad,
                colonia,
                calle,
                exterior,
                interior,
                usuario
                }
              );
              

              const _id = data.libDB._id;
              console.log(_id);
            alert("Event created successfully! - Now select an image");
            setTimeout(() =>  openGallery(_id), 1000);
            } catch (error) {
              console.log(error);
              alert(error.message);
            }
          };
        
          fetchData(
            nombrex,
                eventox,
                descripcionx,
                cantidadx,
                pagax,
                diax,
                iniciox,
                terminox,
                estadox,
                ciudadx,
                coloniax,
                callex,
                exteriorx,
                interiorx,
                usuariox
          );
    }

    //Loading Img...

    const [idEvento, setIdEvento] = useState("gg");
    const [image, setImage] = useState(null);
    
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
                  alert("image uploaded successfully");
                  loadImage();
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
    
      // const loadImage = async () => {
    
      //   firebase
      //     .storage()
      //     .ref(`images/${idEvento}`)
      //     .getDownloadURL()
      //     .then(resolve => {
      //       setImage(resolve);
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
      // };
    
      // const checkImage = () => {
    
      //   if (image) {
      //     return (
      //       <Image
      //         style={{ width: 300, height: 300 }}
      //         source={{ uri: image }}
      //       />
      //     );
      //   }
      //   return null;
      // };

    return(
        // KeyboardAvoidingView is a type of view that will push the content up when a keyboard shows
    <Container behavior="padding">
        <SafeAreaView style={styles.scrollSafe}>
      <ScrollView style={styles.scrollView}>
        <ButtonContainer>
            <Button onPress={handleSignOut}>
                <ButtonText>Sign Out</ButtonText>
            </Button>
            </ButtonContainer>
    <InputContainer>
      {/* We have 2 text inputs that will set the state our our constants (email, pdw) */}
      <Input
        placeholder={i18n.t("CLIENT_TODO_TABS").EVENT_NAME}
        value={eventox}
        onChangeText={(text) => setEventox(text)}
      />
      <Input
        placeholder={i18n.t("CLIENT_TODO_TABS").REQUIREMENTS}
        value={descripcionx}
        onChangeText={(text) => setDescripcionx(text)}
      />
      <Input
        placeholder={i18n.t("CLIENT_TODO_TABS").WAITERS_QUANTITY}
        value={cantidadx}
        onChangeText={(text) => setCantidadx(text)}
      />
      <Input
        placeholder={i18n.t("CLIENT_TODO_TABS").PAYMENT}
        value={pagax}
        onChangeText={(text) => setPagax(text)}
      />
      <Input
        placeholder={i18n.t("CLIENT_TODO_TABS").EVENT_DAY}
        value={diax}
        onChangeText={(text) => setDiax(text)}
      />
      <Input
        placeholder={i18n.t("CLIENT_TODO_TABS").STARTING_EVENT}
        value={iniciox}
        onChangeText={(text) => setIniciox(text)}
      />
      <Input
        placeholder={i18n.t("CLIENT_TODO_TABS").ENDING_EVENT}
        value={terminox}
        onChangeText={(text) => setTerminox(text)}
      />
      <Input
        placeholder={i18n.t("CLIENT_TODO_TABS").SUBURB}
        value={coloniax}
        onChangeText={(text) => setColoniax(text)}
      />
      <Input
        placeholder={i18n.t("CLIENT_TODO_TABS").STREET}
        value={callex}
        onChangeText={(text) => setCallex(text)}
      />
      <Input
        placeholder={i18n.t("CLIENT_TODO_TABS").OUTDOOR_NUMBER}
        value={exteriorx}
        onChangeText={(text) => setExterirorx(text)}
      />
      <Input
        placeholder={i18n.t("CLIENT_TODO_TABS").INTERIOR_NUMBER}
        value={interiorx}
        onChangeText={(text) => setInteriorx(text)}
      />
    </InputContainer>
    {/* {checkImage()} */}
    {/* We have 2 buttons that will execute the functions above) */}
    <ButtonContainer>
      <ButtonOutline
        onPress={newItem}
      >
        <ButtonOutlineText>Post Event</ButtonOutlineText>
      </ButtonOutline>
    </ButtonContainer>
      </ScrollView>
      </SafeAreaView>
  </Container>
    )
}

export default EventosComponent;

const styles = StyleSheet.create({
    scrollView: {
    //   backgroundColor: 'yellow',
      marginHorizontal: 20,
    },
    scrollSafe: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    }
    
  });