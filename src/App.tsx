import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home, { HomeTabParamList } from './views/Home/Home';
import ContainerAdd from './views/ContainerAdd/ContainerAdd';
import LocationAdd from './views/LocationAdd/LocationAdd';
import { registerRootComponent } from 'expo';

export type AppStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  ContainerAdd: undefined;
  LocationAdd: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

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