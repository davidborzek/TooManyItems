import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export function useImagePicker() {
  const [image, setImage] = useState<string>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    return result;
  };

  return { image, pickImage };
}
