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
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import HeaderCheckmark from '../../components/HeaderCheckmark/HeaderCheckmark';
import { useImagePicker } from '../../hooks/image';
import { Container, insertItem } from '../../supabase/supabase';

type Props = NativeStackScreenProps<AppStackParamList, 'ItemAdd'>;

export type ItemAddParamList = {
  container: Container;
};

export default function ItemAdd({ route, navigation }: Props) {
  const { image, pickImage, removeImage, takeImage } = useImagePicker();
  const { t } = useTranslation();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const { container } = route.params;

  const toggleImageUpload = () => {
    setImageUploadVisible((visible) => !visible);
  };

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
          <HeaderCheckmark disabled={!itemName} onPress={handleCreateItem} />
        );
      },
    });
  }, [navigation, itemName, handleCreateItem]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.view}>
        <BottomSheet
          items={[
            {
              text: t('pick_photo'),
              onPress: pickImage,
            },
            {
              text: t('take_photo'),
              onPress: takeImage,
            },
            {
              text: t('remove_photo'),
              onPress: removeImage,
              disabled: !image,
              color: 'red',
            },
          ]}
          visible={imageUploadVisible}
          onClose={toggleImageUpload}
        />
        <TouchableOpacity
          onPress={toggleImageUpload}
          style={styles.imageContainer}
        >
          {image && <Image source={{ uri: image }} style={styles.image} />}
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
  imageContainer: {
    backgroundColor: '#c1c1c1',
    marginVertical: 20,
    minWidth: 250,
    maxWidth: 250,
    height: 250,
    borderRadius: 3,
  },
  image: { width: '100%', height: '100%' },
});
