import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { insertContainer } from '../../supabase/supabase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';
import { useLocations } from '../../hooks/location';
import { useImagePicker } from '../../hooks/image';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderCheckmark from '../../components/HeaderCheckmark/HeaderCheckmark';
import { Input } from 'react-native-elements';
import Selection from '../../components/Selection/Selection';
import { Ionicons } from '@expo/vector-icons';
import EmptyState from '../../components/EmptyState/EmptyState';

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
  view: { alignItems: 'center', flex: 1 },
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
  newLocation: {
    fontSize: 18,
  },
});
