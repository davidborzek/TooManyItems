import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';

type Props = {
  title: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  selected?: boolean;
  onPress?: () => void;
};

/**
 * Ein wiederverwendbarer Component welcher Chips bereitstellt.
 * https://m3.material.io/components/chips
 */
export default function Chip({ icon, title, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.badge, selected ? styles.active : {}]}
    >
      {icon && <Ionicons style={styles.icon} name={icon} size={14} />}
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: 'rgb(200, 150, 150)',
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#c1c1c1',
    borderRadius: 90,
    flexDirection: 'row',
    marginHorizontal: 5,
    padding: 10,
  },
  icon: {
    marginRight: 5,
  },
});
