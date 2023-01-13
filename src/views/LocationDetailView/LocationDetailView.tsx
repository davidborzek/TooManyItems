import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { AppStackParamList } from '../../App';
import EmptyState from '../../components/EmptyState/EmptyState';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import ImageList from '../../components/ImageList/ImageList';
import { useContainersForLocation } from '../../hooks/container';
import { useImagePicker } from '../../hooks/image';
import { Container, Location, updateLocation } from '../../supabase/supabase';

type Props = NativeStackScreenProps<AppStackParamList, 'LocationView'>;

export type LocationViewParamList = {
  location: Location;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: {
    backgroundColor: '#c1c1c1',
    minWidth: '100%',
    maxWidth: '100%',
    height: '45%',
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: { position: 'absolute', width: '100%', height: '100%' },
  info: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginBottom: 20,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
});

export default function LocationDetailView({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { location } = route.params;
  const { containers, fetch, refresh, refreshing, loading } =
    useContainersForLocation(location.id);
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
            if (!image.canceled) {
              location.image = image.assets![0].base64!;
              updateLocation(location);
            }
          });
        }}
        style={styles.imageContainer}
      >
        {realImage && (
          <Image
            source={{ uri: 'data:image/png;base64,' + realImage }}
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
