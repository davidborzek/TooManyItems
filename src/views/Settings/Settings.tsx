import { Button, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';

import { AppStackParamList } from '../../App';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { HomeTabParamList } from '../Home/Home';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { supabase } from '../../supabase/supabase';
import { useTranslation } from 'react-i18next';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Settings'>,
  NativeStackScreenProps<AppStackParamList>
>;

/**
 * Der Einstellungs Tab auf der Hauptseite. Hier ist eigentlich nur der Ausloggen Knopf
 */
export default function Settings(_: Props) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Button
        title={t('sign_out') || ''}
        onPress={() => supabase.auth.signOut()}
        buttonStyle={styles.signOut}
      />
      <View style={{ marginTop: 50, marginBottom: 10, alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Impressum</Text>
      </View>
      <Text>Verantwortlich für die App:</Text>
      <Text>TooManyItems GmbH</Text>
      <Text>Musterstraße 12</Text>
      <Text>12345 Musterstadt</Text>
      <Text>Deutschland</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  signOut: {
    backgroundColor: 'rgba(214, 61, 57, 1)',
  },
});
