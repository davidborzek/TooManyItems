import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { insertLocation, supabase } from '../../supabase/supabase';
import { FAB, Icon } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';
import { useImagePicker } from '../../hooks/image';

type Props = NativeStackScreenProps<AppStackParamList, 'LocationAdd'>;

export default function LocationAdd({ navigation }: Props) {
  const [locationName, setLocationName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const { image, pickImage } = useImagePicker();

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
        <Text>Name</Text>
        <TextInput
          style={{
            height: 30,
            marginVertical: 5,
            borderWidth: 1,
            padding: 10,
            width: '100%',
          }}
          onChangeText={setLocationName}
          value={locationName}
        />

        <Text>Straße</Text>
        <TextInput
          style={{
            height: 30,
            marginVertical: 5,
            borderWidth: 1,
            padding: 10,
            width: '100%',
          }}
          onChangeText={setStreet}
          value={street}
        />

        <Text>Stadt</Text>
        <TextInput
          style={{
            height: 30,
            marginVertical: 5,
            borderWidth: 1,
            padding: 10,
            width: '100%',
          }}
          onChangeText={setCity}
          value={city}
        />

        <Text>PLZ</Text>
        <TextInput
          style={{
            height: 30,
            marginVertical: 5,
            borderWidth: 1,
            padding: 10,
            width: '100%',
          }}
          onChangeText={setZip}
          value={zip}
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
        disabled={!locationName}
        onPress={handleCreateLocation}
      />
    </View>
  );
}
