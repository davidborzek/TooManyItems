import { Container, updateContainer } from '../../supabase/supabase';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

import { AppStackParamList } from '../../App';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import HeaderCheckmark from '../../components/HeaderCheckmark/HeaderCheckmark';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useImagePicker } from '../../hooks/image';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<AppStackParamList, 'ContainerModifyView'>;

export type ContainerModifyViewParamList = {
  container: Container;
};

/**
 * Die React view welche es einem ermöglicht Container zu bearbeiten
 */
export default function ContainerModifyView({ route, navigation }: Props) {
  const { t } = useTranslation();
  const [containerName, setContainerName] = useState('');
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const { container } = route.params;
  const { image, pickImage, removeImage, takeImage } = useImagePicker(
    container.image
  );

  const toggleImageUpload = () => {
    setImageUploadVisible((visible) => !visible);
  };

  const handleModifyContainer = useCallback(async () => {
    await updateContainer({
      // eslint-disable-next-line camelcase
      id: container.id,
      image: image || '',
      name: containerName,
    });

    navigation.goBack();
  }, [container, image, containerName, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderCheckmark
            disabled={!containerName}
            onPress={handleModifyContainer}
          />
        );
      },
    });
    if (!containerName) setContainerName(container.name);
  }, [navigation, container.name, containerName, handleModifyContainer]);

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
            <Ionicons name={'shapes-outline'} size={120} color="white" />
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
  view: {
    alignItems: 'center',
    flex: 1,
  },
});
