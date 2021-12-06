import { View , Text , StyleSheet , TouchableOpacity , Picker} from 'react-native';
import React , {useState} from 'react';

import { useNavigation } from "@react-navigation/core"
/*------Styled components----*/
//Views
import {ContainerView , ContentView , FormView} from '../../styledComponents/Views';
//TextInputs
import {FormInput} from '../../styledComponents/Inputs';
//Buttons
import { LoginRegisterButton , CreateAcountRef } from '../../styledComponents/Buttons';
//Texts
import {LoginRegisterText, LogInText} from '../../styledComponents/Texts';

//i18n
import i18n from '../../Localization/i18n.js';

//Firebase
import {auth , db} from '../../firebase';
import { collection , addDoc} from '@firebase/firestore';

const RegisterScreen = () => {

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidoP, setApellidoP] = useState("");
    const [apellidoM, setApellidoM] = useState("");
    const [telefono, setTelefono] = useState("");
    const [estado, setEstado] = useState("Zacatecas");
    const [municipio, setMunicipio] = useState("");
    const [tipo, setTipo] = useState("");

    const [mesero, setMesero] = useState("mesero");
    const [cliente, setCliente] = useState("");

    const [loop, setLoop] = useState(1);

          
    const navigation = useNavigation();

    const Axios = require('axios').default;

    {loop == 1 ? setTimeout(() => chargeTypeUser(),500) : clearTimeout()};

    const chargeTypeUser = () => {
        if(tipo == "cliente"){
            setMesero("");
            setCliente("cliente");
        }
    
        if(tipo == "mesero"){
          setMesero("mesero");
          setCliente("");
      }
    }

    //Funcion registro
    const handleSignup = async() => {

        const fetchData = async (mesero, cliente, nombre, apellido_p, apellido_m, email, numero_telefonico, password, ciudad, estado_M) => {
            try {
              const { data } = await Axios.post(
                "https://unidad-2-movil.herokuapp.com/usuario",
                {
                mesero,
                cliente,
                nombre,
                apellido_p,
                apellido_m,
                email,
                numero_telefonico,
                password,
                ciudad,
                estado_M
                }
              );
              console.log(data);
              alert("User created successfully!");
              navigation.replace("Login");
              
            } catch (error) {
              console.log(error);
              alert(error.message);
            }
          };
        
          fetchData(
            mesero,
            cliente,
            nombre,
            apellidoP,
            apellidoM,
            email,
            telefono,
            pwd,
            municipio,
            estado
          );
};


    const LoginNavigation = () =>{
        navigation.replace("Login");
    };
    return(
        <ContainerView>
            <ContentView>
                <FormView>
                    <Text>{i18n.t('REGISTER').REGISTER_TITLE}</Text>
                    <FormInput 
                    placeholder={i18n.t('REGISTER').REGISTER_EMAIL_PLACEHOLDER}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    />
                    <FormInput
                    placeholder={i18n.t('REGISTER').REGISTER_PASSWORD_PLACEHOLDER}
                    value={pwd}
                    onChangeText={(text) => setPwd(text)}
                    secureTextEntry
                    />
                    <FormInput
                    placeholder={i18n.t('REGISTER').REGISTER_NAME_PLACEHOLDER}
                    value={nombre}
                    onChangeText={(text) => setNombre(text)}
                    />
                    <FormInput
                    placeholder={i18n.t('REGISTER').REGISTER_LAST_NAME_PLACEHOLDER}
                    value={apellidoP}
                    onChangeText={(text) => setApellidoP(text)}
                    />
                    <FormInput
                    placeholder={i18n.t('REGISTER').REGISTER_MOTHERS_LAST_NAME_PLACEHOLDER}
                    value={apellidoM}
                    onChangeText={(text) => setApellidoM(text)}
                    />
                    <FormInput
                    placeholder={i18n.t('REGISTER').REGISTER_PHONE_NUMBER_PLACEHOLDER}
                    value={telefono}
                    onChangeText={(text) => setTelefono(text)}
                    />
                    <Text>{i18n.t('REGISTER').REGISTER_STATE_TEXT}</Text>
                    <Picker
                        selectedValue={estado}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setEstado(itemValue)}
                    >
                        <Picker.Item label="Zacatecas" value="Zacatecas" />
                        <Picker.Item label="CDMX" value="CDMX" />
                    </Picker>
                    <FormInput
                    placeholder={i18n.t('REGISTER').REGISTER_TOWNSHIP_TEXT}
                    value={municipio}
                    onChangeText={(text) => setMunicipio(text)}
                    />
                    <Text>{i18n.t('REGISTER').REGISTER_KIND_ACCOUNT}</Text>
                    <Picker
                        selectedValue={tipo}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}
                    >
                        <Picker.Item label="Mesero" value="mesero" />
                        <Picker.Item label="Cliente" value="cliente" />
                    </Picker>
                    <LoginRegisterButton onPress={handleSignup}>
                        <LoginRegisterText>Registrarse</LoginRegisterText>
                    </LoginRegisterButton>
                    <TouchableOpacity onPress={LoginNavigation} style={styles.izq}>
                        <Text>Iniciar sesión</Text>
                    </TouchableOpacity>
                </FormView>
            </ContentView>
        </ContainerView>
    )
    
}
const styles = StyleSheet.create({
    arriba: {
        top: -150,
    }
});

export default RegisterScreen;