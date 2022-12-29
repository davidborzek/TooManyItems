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
import ItemAdd, { ItemAddParamList } from './views/ItemAdd/ItemAdd';
import ContainerView, { ContainerViewParamList } from './views/ContainerView/ContainerView';
import { registerRootComponent } from 'expo';

import './i18n/i18n';
import LocationView, { LocationViewParamList } from './views/LocationView/LocationView';
import ItemView, { ItemViewParamList } from './views/ItemView/ItemView';

export type AppStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  ContainerAdd: undefined;
  LocationAdd: undefined;
  ContainerView: ContainerViewParamList;
  LocationView: LocationViewParamList;
  ItemAdd: ItemAddParamList;
  ItemView: ItemViewParamList;
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
        <Stack.Screen
          name="ItemAdd"
          component={ItemAdd}
          options={{ title: t('new_item') || '' }}
        />
        <Stack.Screen
          name="ItemView"
          component={ItemView}
          options={{ title: t('view_item') || '' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
