import * as ImagePicker from 'expo-image-picker';

import { useState } from 'react';

export function useImagePicker() {
  const [image, setImage] = useState<string | undefined | null>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [1, 1],
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }

    return result;
  };

  const takeImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [1, 1],
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }

    return result;
  };

  const removeImage = () => {
    setImage(undefined);
  };

  return { image, pickImage, removeImage, takeImage };
}
