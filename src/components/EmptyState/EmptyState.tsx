import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PropsWithChildren } from 'react';

type Props = {
  message: string;
  description?: string | null;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
};

export default function EmptyState({
  message,
  description,
  icon,
  children,
}: PropsWithChildren<Props>) {
  return (
    <View style={styles.empty}>
      <Ionicons name={icon || 'grid-outline'} size={40} />
      <Text style={styles.message}>{message}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  description: {
    textAlign: 'center',
  },
});
