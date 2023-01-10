import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useLogin, useSignUp } from '../../hooks/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading: loginLoading } = useLogin();
  const { signUp, loading: signUpLoading } = useSignUp();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inventory</Text>
      <View style={styles.verticallySpaced}>
        <Input
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          autoCompleteType="username"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCompleteType="password"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign in"
          disabled={signUpLoading || loginLoading}
          onPress={() => login(email, password)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={signUpLoading || loginLoading}
          onPress={() => signUp(email, password)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 32,
  },
  container: {
    padding: 20,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
  },
});
