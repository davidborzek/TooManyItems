import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  selected?: boolean;
  onPress?: () => void;
};

export default function Badge({ icon, title, selected, onPress }: Props) {
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
  badge: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#c1c1c1',
    borderRadius: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
  active: {
    backgroundColor: 'rgb(200, 150, 150)',
  },
  icon: {
    marginRight: 5,
  },
});
