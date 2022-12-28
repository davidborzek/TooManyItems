import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  overlay: { flex: 1 },
  sheet: {
    backgroundColor: 'white',
  },
});

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
            padding: 16,
            opacity: item.disabled ? 0.3 : 1,
            color: item.color,
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
