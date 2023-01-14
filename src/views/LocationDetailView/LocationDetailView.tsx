import { Container, Location, updateLocation } from '../../supabase/supabase';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';

import { AppStackParamList } from '../../App';
import EmptyState from '../../components/EmptyState/EmptyState';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import ImageList from '../../components/ImageList/ImageList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-elements';
import { useContainersForLocation } from '../../hooks/container';
import { useImagePicker } from '../../hooks/image';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<AppStackParamList, 'LocationView'>;

export type LocationViewParamList = {
  location: Location;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { height: '100%', position: 'absolute', width: '100%' },
  imageContainer: {
    backgroundColor: '#c1c1c1',
    flexDirection: 'row',
    height: '45%',
    marginBottom: 20,
    maxWidth: '100%',
    minWidth: '100%',
  },
  info: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
});

export default function LocationDetailView({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { location } = route.params;
  const { containers, refresh, refreshing, loading } = useContainersForLocation(
    location.id
  );
  const { image, pickImage } = useImagePicker();

  useEffect(() => {
    if (location) {
      navigation.setOptions({
        title: location.name,
      });
    }
  }, [navigation, location]);

  if (loading) {
    return <FullSpinner />;
  }

  const realImage = image ? image : location.image;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          pickImage().then((image) => {
            if (!image.canceled && image.assets[0].base64) {
              location.image = image.assets[0].base64;
              updateLocation(location);
            }
          });
        }}
        style={styles.imageContainer}
      >
        {realImage && (
          <Image
            source={{ uri: `data:image/png;base64,${realImage}` }}
            style={styles.image}
          />
        )}
        <View style={styles.info}>
          <Text style={styles.title}>{location?.name}</Text>
          {location.street && <Text>{location.street}</Text>}
          {(location.zip_code || location.city) && (
            <Text>
              {location.zip_code} {location.city}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <ImageList
        items={containers}
        onRefresh={refresh}
        refreshing={refreshing}
        onPress={(item: Container) => {
          navigation.navigate('ContainerView', { container: item });
        }}
        imagePlaceholderIcon="cube"
        ListEmptyComponent={
          <EmptyState
            icon="cube-outline"
            message={t('no_containers')}
            description={t('no_containers_information')}
          />
        }
      />
    </View>
  );
}
