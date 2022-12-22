import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/Home/Home';
import ContainerAdd from './views/ContainerAdd/ContainerAdd';
import LocationAdd from './views/LocationAdd/LocationAdd';
import { registerRootComponent } from 'expo';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ContainerAdd"
          component={ContainerAdd}
          options={{ headerTitle: 'Container Hinzufügen' }}
        />
        <Stack.Screen
          name="LocationAdd"
          component={LocationAdd}
          options={{ headerTitle: 'Ort Hinzufügen' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default registerRootComponent(App);