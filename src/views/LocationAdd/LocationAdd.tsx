import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { insertLocation } from '../../supabase/supabase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';
import { useImagePicker } from '../../hooks/image';
import { useTranslation } from 'react-i18next';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderCheckmark from '../../components/HeaderCheckmark/HeaderCheckmark';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

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
      name: locationName,
      city: city,
      image: image,
      street: street,
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
          {image ? (
            <Image
              source={{ uri: 'data:image/png;base64,' + image }}
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
  view: {
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#c1c1c1',
    marginVertical: 20,
    width: 250,
    height: 250,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '100%' },
  form: { marginTop: 10, width: '100%', paddingHorizontal: 20 },
});
