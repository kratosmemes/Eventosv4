import React, {useState , useEffect} from 'react';
import { View , TextInput, TouchableOpacity , StyleSheet, Text } from 'react-native';

import { useNavigation } from "@react-navigation/core"
/*------Styled components----*/
//Views
import {ContainerView , ContentView , FormView} from '../../styledComponents/Views';
//TextInputs
import {FormInput} from '../../styledComponents/Inputs';
//Buttons
import { LoginRegisterButton , CreateAcountRef } from '../../styledComponents/Buttons';
//Texts
import {LoginRegisterText} from '../../styledComponents/Texts';

//I18n
import i18n from '../../Localization/i18n';

//Firebase
import {auth} from '../../firebase';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const [id, setId] = useState("");
    const [cliente, setCliente] = useState("");
    
    //Navigation
    const navigation = useNavigation();

    const Axios = require('axios').default;

    //Verifica si hay usuario valido y si lo hay lo manda a home
    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged((user) => {
            if(user){
                navigation.navigate('Login');
            }
        })
        return unsuscribe;
    }, [])
    
    const handleLogin = async() => {
        const fetchData = async (email, password) => {
            try {
              const { data } = await Axios.post(
                "https://unidad-2-movil.herokuapp.com/login",
                {
                email,
                password
                }
              );
            //   console.log(data);

            SetProps(data);
        
            //   alert("Welcome " + data.usuario.nombre + "!");
            //   navigation.replace("Home");
              
            } catch (error) {
              console.log(error);
              alert(error.message);
            }
          };
        
          fetchData(
            email,
            pwd
          );
      };

    const SetProps = (data) => {

    const _id = data.usuario._id;
    const  _cliente = data.usuario.cliente;
    
    const _name = data.usuario.nombre;
    const _lastP = data.usuario.apellido_p;
    const _lastM = data.usuario.apellido_m;
    const _email = data.usuario.email;
    const _estado = data.usuario.estado_M;
    const _ciudad = data.usuario.ciudad;
    const _telefono = data.usuario.numero_telefonico;
    

    setId(_id);
    setCliente(_cliente);

    // alert(""+id+", "+cliente);
    // peticionDos(_id, _name, _lastP, _lastM, _email, _estado, _ciudad, _telefono);
    {_cliente == "" ? navigation.navigate("Home2", {id:_id, nombre:_name,
      apellido_p:_lastP, apellido_m:_lastM, email:_email,
      estado:_estado, ciudad:_ciudad, telefono:_telefono}) : 
      navigation.navigate("Home", {id:_id, nombre:_name,
        apellido_p:_lastP, apellido_m:_lastM, email:_email,
        estado:_estado, ciudad:_ciudad, telefono:_telefono})}
    }

    const peticionDos = (idx, namex, lastPx, lastMx, emailx, estadox, ciudadx, telefonox) => {

        const fetchData2 = async (_id, _cliente) => {
            try {
              const { data } = await Axios.get(
                `https://unidad-2-movil.herokuapp.com/usuario/${_id}/${_cliente}`
              );
            //   console.log(data);
              // navigation.replace("Home", {params:[datax]});
              navigation.navigate("Home", {id:data.resp._id, nombre:data.resp.nombre,
              apellido_p:data.resp.apellido_p, apellido_m:data.resp.apellido_m, email:data.resp.email,
              estado:data.resp.estado_M, ciudad:data.resp.ciudad, telefono:data.resp.numero_telefonico});
        
            }catch (error) {
              console.log(error);
            //   navigation.replace("Home2");
            navigation.navigate("Home2", {id:idx, nombre:namex,
                apellido_p:lastPx, apellido_m:lastMx, email:emailx,
                estado:estadox, ciudad:ciudadx, telefono:telefonox});
            }
          };
        
          fetchData2(id, cliente);
    }
    
    const RegisterNavigation = () =>{
        navigation.replace("Register");
    };

    return(
      <ContainerView>
          <ContentView>
              <FormView>
                  <Text>{i18n.t('LOGIN').LOGIN_TITLE}</Text>
                  <FormInput
                      placeholder={i18n.t('LOGIN').LOGIN_EMAIL_PLACEHOLDER}
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                      style={styles.input}
                  />
                  <FormInput placeholder="Contraseña"
                      placeholder={i18n.t('LOGIN').LOGIN_PASSWORD_PLACEHOLDER}
                      value={pwd}
                      onChangeText={(text) => setPwd(text)}
                      style={styles.input}
                      secureTextEntry
                  />
                  <LoginRegisterButton>
                      <LoginRegisterText onPress={handleLogin}>{i18n.t('LOGIN').LOGIN_BUTTON}</LoginRegisterText>
                  </LoginRegisterButton>
                  <TouchableOpacity style={styles.izq} onPress={RegisterNavigation}>
                      <Text>{i18n.t('LOGIN').LOGIN_CREATE_ACCOUNT}</Text>
                  </TouchableOpacity>
              </FormView>
          </ContentView>
      </ContainerView>
  )
    
}
const styles = StyleSheet.create({

});


export default LoginScreen;