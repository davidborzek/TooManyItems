import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

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
  EmptyStateComponent?: React.ReactElement | null;
};

/**
 * Ein wiederverwendbarer Component welcher Ähnlich wie ein Dropdown Menü funktioniert.
 * Die Auswahlmöglichkeiten werden am unteren Bildschirmrand angezeigt.
 */
export default function Selection<T>({
  items,
  visible,
  value,
  title,
  label,
  placeholder,
  setOpen,
  onChange,
  EmptyStateComponent,
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
            {items.length === 0 && EmptyStateComponent ? (
              EmptyStateComponent
            ) : (
              <ScrollView>{renderItems()}</ScrollView>
            )}
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
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
  },
  item: {
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
    padding: 16,
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: { backgroundColor: 'white', height: '50%' },
  overlay: { flex: 1 },
});
