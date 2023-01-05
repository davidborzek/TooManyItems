import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppStackParamList } from '../../App';
import HeaderCheckmark from '../../components/HeaderCheckmark/HeaderCheckmark';
import { useImagePicker } from '../../hooks/image';
import { Container, insertItem } from '../../supabase/supabase';

type Props = NativeStackScreenProps<AppStackParamList, 'ItemAdd'>;

export type ItemAddParamList = {
  container: Container;
};

export default function ItemAdd({ route, navigation }: Props) {
  const { image, pickImage } = useImagePicker();
  const { t } = useTranslation();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const { container } = route.params;


  const handleCreateItem = async () => {
    await insertItem({
      container_id: container.id,
      name: itemName,
      description: description,
      image: image,
    });

    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderCheckmark
            disabled={!itemName}
            onPress={handleCreateItem}
          />
        );
      },
    });
  }, [navigation, itemName]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.view}>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: '#c1c1c1',
            marginVertical: 5,
            minWidth: 300,
            maxWidth: 300,
            marginTop: 20,
            height: 300,
          }}
        >
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.form}>
          <Text>{t('name')}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setItemName}
            value={itemName}
          />

          <Text>{t('description')}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    flex: 1,
  },
  form: { marginTop: 10, width: '100%', paddingHorizontal: 20 },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
