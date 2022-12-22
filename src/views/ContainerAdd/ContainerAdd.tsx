import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { supabase } from '../../supabase/supabase';
import { FAB, Icon } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';

type Props = NativeStackScreenProps<AppStackParamList, 'ContainerAdd'>;

export default function ContainerAdd({ navigation }: Props) {
  const [image, setImage] = useState(null);
  const [containerName, setContainerName] = useState('');
  const [containterTags, setContainterTags] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [locations, setLocations] = useState<ItemType<number>[]>([]);

  useEffect(() => {
    supabase
      .from('location')
      .select('*')
      .then(({ data, error }) => {
        if (!data) {
          return;
        } 

        setLocations(
          data.map((location) => ({
            label: location.name,
            value: location.id,
          }))
        );
      });
  }, []);

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
          onChangeText={setContainerName}
          value={containerName}
        />

        <Text>Tags</Text>
        <TextInput
          style={{
            height: 30,
            marginVertical: 5,
            borderWidth: 1,
            padding: 10,
            width: '100%',
          }}
          onChangeText={setContainterTags}
          value={containterTags}
        />

        <Text>Location</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={locations}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setLocations}
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
        disabled={!containerName || !value}
        onPress={async () => {
          const result = await supabase
            .from('container')
            .insert({ name: containerName, location_id: value, image: image });
          navigation.goBack();
        }}
      />
    </View>
  );
}
