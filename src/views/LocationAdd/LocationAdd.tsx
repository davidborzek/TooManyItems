import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../supabase/supabase';
import { FAB, Icon } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';

type Props = NativeStackScreenProps<AppStackParamList, 'LocationAdd'>;

export default function LocationAdd({ navigation }: Props) {
  const [image, setImage] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
        onPress={async () => {
          const result = await supabase.from('location').insert({
            name: locationName,
            city: city,
            image: image,
            street: street,
            zip_code: zip,
          });
          console.log(result);
          navigation.goBack();
        }}
      />
    </View>
  );
}
