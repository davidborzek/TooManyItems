import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { insertLocation } from '../../supabase/supabase';
import { FAB, Icon } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';
import { useImagePicker } from '../../hooks/image';
import { useTranslation } from 'react-i18next';
import BottomSheet from '../../components/BottomSheet/BottomSheet';

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

  const styles = StyleSheet.create({
    imageContainer: {
      backgroundColor: '#c1c1c1',
      marginVertical: 20,
      minWidth: 250,
      maxWidth: 250,
      height: 250,
    },
    image: { width: '100%', height: '100%' },
    form: { alignItems: 'flex-start', width: 250, marginTop: 10 },
    input: {
      height: 30,
      marginVertical: 5,
      borderWidth: 1,
      padding: 10,
      width: '100%',
    },
  });

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
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
      <FAB
        title=""
        color="#137b11"
        placement="right"
        icon={
          <Icon
            name="check"
            size={24}
            color="white"
            tvParallaxProperties={undefined}
          />
        }
        disabled={!locationName}
        onPress={handleCreateLocation}
      />
    </View>
  );
}
