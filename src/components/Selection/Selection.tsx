import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input } from 'react-native-elements';

export type SelectionItem<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  items: SelectionItem<T>[];
  value: T;
  title?: string;
  placeholder?: string;
  label?: string;
  visible?: boolean;
  setOpen: (state: boolean) => void;
  onChange: (value: T) => void;
};

export default function Selection<T>({
  items,
  visible,
  value,
  title,
  label,
  placeholder,
  setOpen,
  onChange,
}: Props<T>) {
  const renderItems = () => {
    return items.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          onChange(item.value);
          setOpen(false);
        }}
      >
        <Text style={styles.item}>{item.label}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View>
      <Modal
        visible={visible}
        onRequestClose={() => setOpen(false)}
        animationType="fade"
        transparent
        statusBarTranslucent
      >
        <View style={styles.modal}>
          <TouchableWithoutFeedback onPress={() => setOpen(false)}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.heading}>{title}</Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Ionicons name={'close-outline'} size={32} />
              </TouchableOpacity>
            </View>
            <ScrollView>{renderItems()}</ScrollView>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Input
          editable={false}
          label={label}
          placeholder={placeholder}
          autoCompleteType=""
          value={items.find((i) => i.value === value)?.label}
          enablesReturnKeyAutomatically
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  modalContent: { height: '50%', backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
  },
  overlay: { flex: 1 },
  item: {
    padding: 16,
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
  },
});
