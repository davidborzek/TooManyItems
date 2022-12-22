import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/views/Home/Home';
import ContainerAdd from './src/views/ContainerAdd/ContainerAdd';
import LocationAdd from './src/views/LocationAdd/LocationAdd';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home} 
          options={{ headerShown: false }}/>
        <Stack.Screen
          name="ContainerAdd"
          component={ContainerAdd}
          options={{ headerTitle: "Container Hinzufügen" }}
        />
        <Stack.Screen
          name="LocationAdd"
          component={LocationAdd}
          options={{ headerTitle: "Ort Hinzufügen" }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}