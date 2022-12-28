import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home, { HomeTabParamList } from './views/Home/Home';
import ContainerAdd from './views/ContainerAdd/ContainerAdd';
import LocationAdd from './views/LocationAdd/LocationAdd';
import ContainerView, { ContainerViewParamList } from './views/ContainerView/ContainerView';
import { registerRootComponent } from 'expo';

import './i18n/i18n';
import LocationView, { LocationViewParamList } from './views/LocationView/LocationView';

export type AppStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  ContainerAdd: undefined;
  LocationAdd: undefined;
  ContainerView: ContainerViewParamList;
  LocationView: LocationViewParamList;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

function App() {
  const { t } = useTranslation();

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
          options={{ title: t('new_container') || '' }}
        />
        <Stack.Screen
          name="LocationAdd"
          component={LocationAdd}
          options={{ title: t('new_location') || '' }}
        />
        <Stack.Screen
          name="ContainerView"
          component={ContainerView}
          options={{ title: t('view_container') || '' }}
        />
        <Stack.Screen
          name="LocationView"
          component={LocationView}
          options={{ title: t('view_location') || '' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
