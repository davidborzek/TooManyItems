import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { insertLocation } from '../../supabase/supabase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';
import { useImagePicker } from '../../hooks/image';
import { useTranslation } from 'react-i18next';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderCheckmark from '../../components/HeaderCheckmark/HeaderCheckmark';

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
              text: 'Pick photo',
              onPress: pickImage,
            },
            {
              text: 'Take photo',
              onPress: takeImage,
            },
            {
              text: 'Remove photo',
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
            onChangeText={setLocationName}
            value={locationName}
          />

          <Text>{t('street')}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setStreet}
            value={street}
          />

          <Text>{t('city')}</Text>
          <TextInput style={styles.input} onChangeText={setCity} value={city} />

          <Text>{t('zip')}</Text>
          <TextInput style={styles.input} onChangeText={setZip} value={zip} />
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
    minWidth: 250,
    maxWidth: 250,
    height: 250,
    borderRadius: 3,
  },
  image: { width: '100%', height: '100%' },
  form: { marginTop: 10, width: '100%', paddingHorizontal: 20 },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
