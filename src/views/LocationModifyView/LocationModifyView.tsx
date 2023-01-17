import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Location, updateLocation } from '../../supabase/supabase';
import { useCallback, useEffect, useState } from 'react';

import { AppStackParamList } from '../../App';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import HeaderCheckmark from '../../components/HeaderCheckmark/HeaderCheckmark';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useImagePicker } from '../../hooks/image';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<AppStackParamList, 'LocationModifyView'>;

export type LocationModifyViewParamList = {
  location: Location;
};

/**
 * Die React view welche es einem ermöglicht Orte zu bearbeiten
 */
export default function LocationModifyView({ route, navigation }: Props) {
  const { t } = useTranslation();
  const [locationName, setLocationName] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState('');
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const { location } = route.params;
  const { image, pickImage, removeImage, takeImage } = useImagePicker(
    location.image
  );

  const toggleImageUpload = () => {
    setImageUploadVisible((visible) => !visible);
  };

  const handleModifyLocation = useCallback(async () => {
    await updateLocation({
      id: location.id,
      image: image || '',
      street: street,
      name: locationName,
      city: city,
      // eslint-disable-next-line camelcase
      zip_code: zip,
    });

    navigation.goBack();
  }, [location, city, zip, street, image, locationName, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderCheckmark
            disabled={!locationName}
            onPress={handleModifyLocation}
          />
        );
      },
    });
    if (!locationName) setLocationName(location.name);
    if (!city && location.city) setCity(location.city);
    if (!zip && location.zip_code) setZip(location.zip_code);
    if (!street && location.street) setStreet(location.street);
  }, [
    navigation,
    location.name,
    street,
    zip,
    city,
    location.city,
    location.zip_code,
    location.street,
    locationName,
    handleModifyLocation,
  ]);

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
          style={styles.imageLocation}
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
  imageLocation: {
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
