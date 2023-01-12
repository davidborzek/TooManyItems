import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export function useImagePicker() {
  const [image, setImage] = useState<string>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64!);
    }

    return result;
  };

  const takeImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64!);
    }

    return result;
  };

  const removeImage = () => {
    setImage(undefined);
  };

  return { image, pickImage, takeImage, removeImage };
}
