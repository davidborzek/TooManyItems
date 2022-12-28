import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  disabled?: boolean;
  onPress?: () => void;
};

export default function HeaderCheckmark({ disabled, onPress }: Props) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Ionicons
        name={'checkmark-outline'}
        size={24}
        style={{ opacity: disabled ? 0.3 : 1 }}
      />
    </TouchableOpacity>
  );
}
