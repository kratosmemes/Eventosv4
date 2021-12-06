import React, { useEffect, useState } from "react";
import {
  ButtonContainer, 
  InputContainer, 
  Container, 
  Button, 
  ButtonOutline, 
  ButtonText,
  ButtonOutlineText, 
  Input, 
  OnlyText 
} from "../../../styledComponents/StyledComp";

import { StyleSheet, SafeAreaView, ScrollView, Image, StatusBar} from "react-native";

import { auth } from "../../../firebase";
import {firebase} from '../../../firebase';
import * as ImagePicker from 'expo-image-picker';

import { useNavigation } from "@react-navigation/core";

import i18n from '../../../Localization/i18n.js';

const ProfileComponent = ({route}) => {
    const data = route.params;
    // console.log(data);

    const usuariox = data.id;

    const _nombrex = data.nombre;
    const _apellidoP = data.apellido_p;
    const _apellidoM = data.apellido_m;
    const _telefonico = data.telefono;
    const _ciudadx = data.ciudad;
    const _estadox = data.estado;

    const [nombrex, setNombrex] = useState(""+_nombrex);
    const [apellidoPx, setApellidoPx] = useState(""+_apellidoP);
    const [apellidoMx, setApellidoMx] = useState(""+_apellidoM);
    const [telefonox, setTelefonox] = useState(""+_telefonico);
    const [ciudadx, setCiudadx] = useState(""+_ciudadx);
    const [estadox, setEstadox] = useState(""+_estadox);

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
        const fetchData = async (nombre, apellido_p, apellido_m, numero_telefonico, ciudad, estado_M) => {
            try {
              const { data } = await Axios.put(
              `https://unidad-2-movil.herokuapp.com/usuario/${usuariox}`,
                {
                nombre,
                apellido_p,
                apellido_m,
                numero_telefonico,
                ciudad,
                estado_M
                }
              );
              console.log(data);
              setTimeout(() =>  UpdateVariables(data), 1000);
            alert("User changed successfully!");
              
            } catch (error) {
              console.log(error);
              alert(error.message);
            }
          };
        
          fetchData(
            nombrex,
            apellidoPx,
            apellidoMx,
            telefonox,
            ciudadx,
            estadox
          );
    }

    const UpdateVariables = (data) => {
        const name = data.usrDB.nombre;
        const lastNameP = data.usrDB.apellido_p;
        const lastNameM = data.usrDB.apellido_m;
        const telephone = data.usrDB.numero_telefonico;
        const city = data.usrDB.ciudad;
        const state = data.usrDB.estado_M;

        setNombrex(name);
        setApellidoPx(lastNameP);
        setApellidoMx(lastNameM);
        setTelefonox(telephone);
        setCiudadx(city);
        setEstadox(state);
    }

    //img here 

    const [image, setImage] = useState(null);

  useEffect(() => {
    // (async () => {
    //   if (Platform.OS !== 'web') {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== 'granted') {
    //       alert('Sorry, we need camera roll permissions to make this work!');
    //     }
    //   }
    // })();
    loadImage();
  }, []);

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

  const openGallery = async () => {
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
              .child(`images/${usuariox}`);
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

  const loadImage = async () => {

    firebase
      .storage()
      .ref(`images/${usuariox}`)
      .getDownloadURL()
      .then(resolve => {
        setImage(resolve);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const checkImage = () => {

    if (image) {
      return (
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: image }}
        />
      );
    }
    return null;
  };

    return(
        // KeyboardAvoidingView is a type of view that will push the content up when a keyboard shows
    <Container behavior="padding">
        <SafeAreaView style={styles.scrollSafe}>
      <ScrollView style={styles.scrollView}>
              <ButtonContainer>
            <Button onPress={handleSignOut}>
                <ButtonText>{i18n.t('TODOS_SIGN_OUT_TEXT')}</ButtonText>
            </Button>
            </ButtonContainer>
            {checkImage()}
            <ButtonContainer>
    <Button onPress={openGallery}>
        <ButtonText>{i18n.t('WAITER_TODO_TABS').SELECT_IMAGE}</ButtonText>
      </Button>
      </ButtonContainer>
    <InputContainer>
      {/* We have 2 text inputs that will set the state our our constants (email, pdw) */}
      <Input
        placeholder={i18n.t('WAITER_TODO_TABS').NAME_PLACEHOLDER}
        value={nombrex}
        onChangeText={(text) => setNombrex(text)}
      />
      <Input
        placeholder={i18n.t('WAITER_TODO_TABS').LAST_NAME_PLACEHOLDER}
        value={apellidoPx}
        onChangeText={(text) => setApellidoPx(text)}
      />
      <Input
        placeholder={i18n.t('WAITER_TODO_TABS').MOTHERS_LAST_NAME_PLACEHOLDER}
        value={apellidoMx}
        onChangeText={(text) => setApellidoMx(text)}
      />
      <Input
        placeholder={i18n.t('WAITER_TODO_TABS').PHONE_NUMBER_PLACEHOLDER}
        value={telefonox}
        onChangeText={(text) => setTelefonox(text)}
      />
      <Input
        placeholder={i18n.t('WAITER_TODO_TABS').STATE_PLACEHOLDER}
        value={estadox}
        onChangeText={(text) => setEstadox(text)}
      />
      <Input
        placeholder={i18n.t('WAITER_TODO_TABS').TOWNSHIP_PLACEHOLDER}
        value={ciudadx}
        onChangeText={(text) => setCiudadx(text)}
      />
    </InputContainer>
    {/* We have 2 buttons that will execute the functions above) */}
    <ButtonContainer>
      <ButtonOutline
        onPress={newItem}
      >
        <ButtonOutlineText>Upgrade</ButtonOutlineText>
      </ButtonOutline>
    </ButtonContainer>
    </ScrollView>
      </SafeAreaView>
  </Container>
    )
}

export default ProfileComponent;

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