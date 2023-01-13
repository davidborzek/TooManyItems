import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { AppStackParamList } from '../../App';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import HeaderCheckmark from '../../components/HeaderCheckmark/HeaderCheckmark';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { insertLocation } from '../../supabase/supabase';
import { useImagePicker } from '../../hooks/image';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<AppStackParamList, 'LocationAdd'>;

export default function LocationAdd({ navigation }: Props) {
  const { t } = useTranslation();

  const [locationName, setLocationName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const { image, pickImage, takeImage, removeImage } = useImagePicker();

  const [imageUploadVisible, setImageUploadVisible] = useState(false);

  const toggleImageUpload = () => {
    setImageUploadVisible((visible) => !visible);
  };

  const handleCreateLocation = async () => {
    await insertLocation({
      city: city,
      image: image,
      name: locationName,
      street: street,
      // eslint-disable-next-line camelcase
      zip_code: zip,
    });

    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderCheckmark
            disabled={!locationName}
            onPress={handleCreateLocation}
          />
        );
      },
    });
  }, [navigation, locationName, handleCreateLocation]);

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
            <Ionicons name={'location-outline'} size={120} color="white" />
          )}
        </TouchableOpacity>
        <View style={styles.form}>
          <Input
            onChangeText={setLocationName}
            value={locationName}
            label={t('name')}
            placeholder={t('name') || ''}
            autoCompleteType=""
          />

          <Input
            onChangeText={setStreet}
            value={street}
            label={t('street')}
            placeholder={t('street') || ''}
            autoCompleteType=""
          />

          <Input
            onChangeText={setCity}
            value={city}
            label={t('city')}
            placeholder={t('city') || ''}
            autoCompleteType=""
          />

          <Input
            onChangeText={setZip}
            value={zip}
            label={t('zip')}
            placeholder={t('zip') || ''}
            autoCompleteType=""
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
