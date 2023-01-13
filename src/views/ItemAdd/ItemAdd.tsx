import { Container, insertItem } from '../../supabase/supabase';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { AppStackParamList } from '../../App';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import HeaderCheckmark from '../../components/HeaderCheckmark/HeaderCheckmark';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useImagePicker } from '../../hooks/image';
import { useTranslation } from 'react-i18next';

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
      // eslint-disable-next-line camelcase
      container_id: container.id,
      description: description,
      image: image,
      name: itemName,
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
              onPress: pickImage,
              text: t('pick_photo'),
            },
            {
              onPress: takeImage,
              text: t('take_photo'),
            },
            {
              color: 'red',
              disabled: !image,
              onPress: removeImage,
              text: t('remove_photo'),
            },
          ]}
          visible={imageUploadVisible}
          onClose={toggleImageUpload}
        />
        <TouchableOpacity
          onPress={toggleImageUpload}
          style={styles.imageContainer}
        >
          {image ? (
            <Image
              source={{ uri: `data:image/png;base64,${image}` }}
              style={styles.image}
            />
          ) : (
            <Ionicons name={'shapes-outline'} size={120} color="white" />
          )}
        </TouchableOpacity>
        <View style={styles.form}>
          <Input
            onChangeText={setItemName}
            value={itemName}
            label={t('name')}
            placeholder={t('name') || ''}
            autoCompleteType=""
          />
          <Input
            onChangeText={setDescription}
            value={description}
            label={t('description')}
            placeholder={t('description') || ''}
            autoCompleteType=""
            multiline
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 10, paddingHorizontal: 20, width: '100%' },
  image: { height: '100%', width: '100%' },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#c1c1c1',
    borderRadius: 3,
    height: 250,
    justifyContent: 'center',
    marginVertical: 20,
    width: 250,
  },
  view: {
    alignItems: 'center',
    flex: 1,
  },
});
