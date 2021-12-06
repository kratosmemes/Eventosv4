import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 

//Tab components
import VerEventosClienteComponent from '../../components/Cliente/VerEventos';
import EventosClienteComponent from '../../components/Cliente/Eventos';
import ProfileComponent from '../../components/Cliente/VerPerfilCliente';

const Tab = createBottomTabNavigator();

const HomeScreen = ({route}) => {
  const data = route.params;

      return (

          <Tab.Navigator screenOptions={() => ({
            tabBarActiveTintColor: "#4AA7C0",
            tabBarInactiveTintColor: "grey",
            headerShown: false
          })}>
            <Tab.Screen name="My Events" component={VerEventosClienteComponent} initialParams={data}/>
            <Tab.Screen name="Create Event" component={EventosClienteComponent} initialParams={data}/>
            <Tab.Screen name="Profile" component={ProfileComponent} initialParams={data}/>
          </Tab.Navigator>
   
      );
}

export default HomeScreen;