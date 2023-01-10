import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { insertContainer } from '../../supabase/supabase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';
import { useLocations } from '../../hooks/location';
import { useImagePicker } from '../../hooks/image';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderCheckmark from '../../components/HeaderCheckmark/HeaderCheckmark';

type Props = NativeStackScreenProps<AppStackParamList, 'ContainerAdd'>;

const styles = StyleSheet.create({
  view: { alignItems: 'center', flex: 1 },
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
  dropdown: {
    marginVertical: 10,
  },
});

export default function ContainerAdd({ navigation }: Props) {
  const { t } = useTranslation();

  const [containerName, setContainerName] = useState('');
  const [containerTags, setContainerTags] = useState('');

  const [isLocationSelectionOpen, setLocationSelectionOpen] = useState(false);
  const [location, setLocation] = useState<number | null>(null);

  const { loading, locations } = useLocations();

  const { image, pickImage, takeImage, removeImage } = useImagePicker();

  const [imageUploadVisible, setImageUploadVisible] = useState(false);

  const toggleImageUpload = () => {
    setImageUploadVisible((visible) => !visible);
  };

  const handleCreateContainer = async () => {
    await insertContainer({
      name: containerName,
      location_id: location,
      image: image,
    });

    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderCheckmark
            disabled={!containerName || !location}
            onPress={handleCreateContainer}
          />
        );
      },
    });
  }, [navigation, containerName, location, handleCreateContainer]);


  if (loading) {
    return <FullSpinner />;
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.view}>
        <BottomSheet
          items={[
            {
              text: t("pick_photo"),
              onPress: pickImage,
            },
            {
              text: t("take_photo"),
              onPress: takeImage,
            },
            {
              text: t("remove_photo"),
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
            onChangeText={setContainerName}
            value={containerName}
          />

          <Text>{t('tags')}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setContainerTags}
            value={containerTags}
          />

          <Text>{t('location')}</Text>
          <DropDownPicker
            placeholder={t('select_location') || ''}
            open={isLocationSelectionOpen}
            value={location}
            items={locations.map((location) => ({
              label: location.name,
              value: location.id,
            }))}
            setOpen={setLocationSelectionOpen}
            setValue={setLocation}
            style={styles.dropdown}
            listMode={'SCROLLVIEW'}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
