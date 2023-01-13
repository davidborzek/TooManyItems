import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { AppStackParamList } from '../../App';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import EmptyState from '../../components/EmptyState/EmptyState';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import HeaderCheckmark from '../../components/HeaderCheckmark/HeaderCheckmark';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Selection from '../../components/Selection/Selection';
import { insertContainer } from '../../supabase/supabase';
import { useImagePicker } from '../../hooks/image';
import { useLocations } from '../../hooks/location';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<AppStackParamList, 'ContainerAdd'>;

export default function ContainerAdd({ navigation }: Props) {
  const { t } = useTranslation();

  const [containerName, setContainerName] = useState('');

  const [isLocationSelectionOpen, setLocationSelectionOpen] = useState(false);
  const [location, setLocation] = useState<number | null>(null);

  const { loading, locations, fetch } = useLocations();

  const { image, pickImage, takeImage, removeImage } = useImagePicker();

  const [imageUploadVisible, setImageUploadVisible] = useState(false);

  const toggleImageUpload = () => {
    setImageUploadVisible((visible) => !visible);
  };

  const handleCreateContainer = async () => {
    await insertContainer({
      image: image,
      location_id: location,
      name: containerName,
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

  useEffect(() => {
    navigation.addListener('focus', fetch);
  }, []);

  if (loading) {
    return <FullSpinner />;
  }

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
            <Ionicons name={'cube-outline'} size={120} color="white" />
          )}
        </TouchableOpacity>
        <View style={styles.form}>
          <Input
            onChangeText={setContainerName}
            value={containerName}
            label={t('name')}
            placeholder={t('name') || ''}
            autoCompleteType=""
          />

          <Selection
            value={location}
            items={locations.map((location) => ({
              label: location.name,
              value: location.id,
            }))}
            title={t('location') || ''}
            label={t('location') || ''}
            placeholder={t('location') || ''}
            onChange={setLocation}
            visible={isLocationSelectionOpen}
            setOpen={setLocationSelectionOpen}
            EmptyStateComponent={
              <EmptyState icon="location-outline" message={t('no_locations')}>
                <TouchableOpacity
                  onPress={() => {
                    setLocationSelectionOpen(false);
                    navigation.navigate('LocationAdd');
                  }}
                >
                  <Text style={styles.newLocation}>{t('new_location')}</Text>
                </TouchableOpacity>
              </EmptyState>
            }
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
  newLocation: {
    fontSize: 18,
  },
  view: { alignItems: 'center', flex: 1 },
});
