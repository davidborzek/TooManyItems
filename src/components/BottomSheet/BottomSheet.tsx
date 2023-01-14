import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import React from 'react';

export type BottomSheetItem = {
  text: string;
  disabled?: boolean;
  color?: string;
  onPress: () => void;
};

type Props = {
  items: BottomSheetItem[];
  visible?: boolean;
  onClose?: () => void;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: { flex: 1 },
  sheet: {
    backgroundColor: 'white',
  },
});

/**
 * Ein wiederverwendbarer Component welcher mehrere Auswahlmöglichkeiten am unteren Bildschirmrand bereitstellt.
 */
export default function BottomSheet({ items, visible, onClose }: Props) {
  const handleItemClick = (item: BottomSheetItem) => {
    if (onClose) {
      onClose();
    }
    item.onPress();
  };

  const renderItems = () => {
    return items.map((item) => (
      <TouchableOpacity
        key={item.text}
        onPress={() => handleItemClick(item)}
        disabled={item.disabled}
      >
        <Text
          style={{
            color: item.color,
            opacity: item.disabled ? 0.3 : 1,
            padding: 16,
          }}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      transparent
      statusBarTranslucent
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.sheet}>{renderItems()}</View>
      </View>
    </Modal>
  );
}
