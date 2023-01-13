import { Button, Input, Text } from 'react-native-elements';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLogin, useSignUp } from '../../hooks/auth';

import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading: loginLoading } = useLogin();
  const { signUp, loading: signUpLoading } = useSignUp();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Inventory</Text>
      </View>
      <Input
        label={t('email')}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder={t('email') || ''}
        autoCompleteType="username"
      />
      <Input
        label={t('password')}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        placeholder={t('password') || ''}
        autoCompleteType="password"
      />
      <Button
        title={t('sign_in') || ''}
        disabled={signUpLoading || loginLoading}
        onPress={() => login(email, password)}
        buttonStyle={styles.button}
      />
      <Button
        title={t('sign_up') || ''}
        disabled={signUpLoading || loginLoading}
        onPress={() => signUp(email, password)}
        buttonStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    marginVertical: 15,
  },
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 50,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
  },
});
