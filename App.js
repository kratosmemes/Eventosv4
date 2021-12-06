import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

//Navigator import
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

//Screens import
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
  import HomeScreen from './screens/Home';
  import HomeScreen2 from './screens/Home2';

//Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{headerShown: false}}>
          {(props) => <LoginScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Register" options={{headerShown: false}}>
          {(props)=> <RegisterScreen {...props}/>}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {(props)=><HomeScreen {...props}/>}
        </Stack.Screen>
        <Stack.Screen name="Home2" options={{headerShown: false}}>
          {(props)=><HomeScreen2 {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
