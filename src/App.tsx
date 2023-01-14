import './i18n/i18n';

import * as React from 'react';

import ContainerDetailView, {
  ContainerViewParamList,
} from './views/ContainerDetailView/ContainerDetailView';
import Home, { HomeTabParamList } from './views/Home/Home';
import ItemAdd, { ItemAddParamList } from './views/ItemAdd/ItemAdd';
import ItemDetailView, {
  ItemViewParamList,
} from './views/ItemDetailView/ItemDetailView';
import LocationDetailView, {
  LocationViewParamList,
} from './views/LocationDetailView/LocationDetailView';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import QRCodePrint, {
  QRCodePrintParams,
} from './views/QRCodePrint/QRCodePrint';

import ContainerAdd from './views/ContainerAdd/ContainerAdd';
import FullSpinner from './components/FullSpinner/FullSpinner';
import LocationAdd from './views/LocationAdd/LocationAdd';
import Login from './views/Login/Login';
import QRCodeScanner from './views/QRCodeScanner/QRCodeScanner';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { useSession } from './hooks/auth';
import { useTranslation } from 'react-i18next';

export type AppStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  ContainerAdd: undefined;
  LocationAdd: undefined;
  QRCodeScanner: undefined;
  QRCodePrint: QRCodePrintParams;
  ContainerView: ContainerViewParamList;
  LocationView: LocationViewParamList;
  ItemAdd: ItemAddParamList;
  ItemView: ItemViewParamList;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

function App() {
  const { t } = useTranslation();
  const { session, loading } = useSession();

  // TODO: error handling?
  if (loading) {
    return <FullSpinner />;
  }
  if (!session) {
    return <Login />;
  }

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
          name="QRCodeScanner"
          component={QRCodeScanner}
          options={{ title: t('scan_container_qr_code') || '' }}
        />
        <Stack.Screen
          name="QRCodePrint"
          component={QRCodePrint}
          options={{ title: t('qr_code') || '' }}
        />
        <Stack.Screen
          name="ContainerView"
          component={ContainerDetailView}
          options={{ title: t('view_container') || '' }}
        />
        <Stack.Screen
          name="LocationView"
          component={LocationDetailView}
          options={{ title: t('view_location') || '' }}
        />
        <Stack.Screen
          name="ItemAdd"
          component={ItemAdd}
          options={{ title: t('new_item') || '' }}
        />
        <Stack.Screen
          name="ItemView"
          component={ItemDetailView}
          options={{ title: t('view_item') || '' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
