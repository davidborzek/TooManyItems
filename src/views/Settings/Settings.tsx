import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { t } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { AppStackParamList } from '../../App';
import { supabase } from '../../supabase/supabase';
import { HomeTabParamList } from '../Home/Home';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Settings'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function Settings(_: Props) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Button
        title={t('sign_out') || ''}
        onPress={() => supabase.auth.signOut()}
        buttonStyle={styles.signOut}
      />
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
