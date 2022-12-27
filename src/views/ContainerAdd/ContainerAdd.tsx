import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { insertContainer } from '../../supabase/supabase';
import { FAB, Icon } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';
import { useLocations } from '../../hooks/location';
import { useImagePicker } from '../../hooks/image';
import FullSpinner from '../../components/FullSpinner/FullSpinner';

type Props = NativeStackScreenProps<AppStackParamList, 'ContainerAdd'>;

export default function ContainerAdd({ navigation }: Props) {
  const { t } = useTranslation();

  const [containerName, setContainerName] = useState('');
  const [containerTags, setContainerTags] = useState('');

  const [isLocationSelectionOpen, setLocationSelectionOpen] = useState(false);
  const [location, setLocation] = useState<number | null>(null);

  const { loading, locations } = useLocations();

  const { image, pickImage } = useImagePicker();

  const handleCreateContainer = async () => {
    await insertContainer({
      name: containerName,
      location_id: location,
      image: image,
    });

    navigation.goBack();
  };

  if (loading) {
    return <FullSpinner />;
  }

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: '#c1c1c1',
          marginVertical: 20,
          minWidth: 250,
          maxWidth: 250,
          height: 250,
        }}
      >
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </TouchableOpacity>
      <View style={{ alignItems: 'flex-start', width: 250, marginTop: 10 }}>
        <Text>{t('name')}</Text>
        <TextInput
          style={{
            height: 30,
            marginVertical: 5,
            borderWidth: 1,
            padding: 10,
            width: '100%',
          }}
          onChangeText={setContainerName}
          value={containerName}
        />

        <Text>{t('tags')}</Text>
        <TextInput
          style={{
            height: 30,
            marginVertical: 5,
            borderWidth: 1,
            padding: 10,
            width: '100%',
          }}
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
          style={{
            height: 30,
            marginVertical: 5,
            borderWidth: 1,
            padding: 10,
            width: '100%',
          }}
        />
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
        disabled={!containerName || !location}
        onPress={handleCreateContainer}
      />
    </View>
  );
}
