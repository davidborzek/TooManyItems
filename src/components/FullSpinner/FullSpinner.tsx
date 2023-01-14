import { ActivityIndicator, StyleSheet, View } from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

/**
 * Ein wiederverwendbarer Component welcher einen Ladespinner bereitstellt.
 */
export default function FullSpinner() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
    </View>
  );
}
