import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 

//Tab components
import VerEventosClienteComponent from '../../components/Mesero/VerEventos';
import EventosClienteComponent from '../../components/Mesero/VerMisEventos';
import ProfileComponent from '../../components/Mesero/VerPerfilMesero';

const Tab = createBottomTabNavigator();

const HomeScreen = ({route}) => {
  const data = route.params;

      return (

          <Tab.Navigator screenOptions={() => ({
            tabBarActiveTintColor: "#4AA7C0",
            tabBarInactiveTintColor: "grey",
            headerShown: false
          })}>
            <Tab.Screen name="Events" component={VerEventosClienteComponent} initialParams={data}/>
            <Tab.Screen name="My Events" component={EventosClienteComponent} initialParams={data}/>
            <Tab.Screen name="Profile" component={ProfileComponent} initialParams={data}/>
          </Tab.Navigator>
   
      );
}

export default HomeScreen;