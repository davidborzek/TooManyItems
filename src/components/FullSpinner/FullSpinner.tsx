import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default function FullSpinner() {
    return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
}