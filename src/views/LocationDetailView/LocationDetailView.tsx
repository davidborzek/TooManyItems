import { Container, Location } from '../../supabase/supabase';
import { FAB, Icon, Text } from 'react-native-elements';
import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';

import { AppStackParamList } from '../../App';
import EmptyState from '../../components/EmptyState/EmptyState';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import ImageList from '../../components/ImageList/ImageList';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContainersForLocation } from '../../hooks/container';
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
  imagePlaceholder: {
    alignItems: 'center',
    borderColor: '#c1c1c1',
    borderWidth: 2,
    justifyContent: 'center',
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

/**
 * React view für die Detaillierte Orts Ansicht.
 */
export default function LocationDetailView({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { location } = route.params;
  const { containers, refresh, refreshing, loading } = useContainersForLocation(
    location.id
  );

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

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {location.image ? (
          <Image
            source={{ uri: `data:image/png;base64,${location.image}` }}
            style={styles.image}
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Ionicons name={'location-outline'} size={120} color="#FFFFFF" />
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.title}>{location?.name}</Text>
          {location.street ? <Text>{location.street}</Text> : <></>}
          {location.zip_code || location.city ? (
            <Text>
              {location.zip_code} {location.city}
            </Text>
          ) : (
            <></>
          )}
        </View>
      </View>
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
      <FAB
        title=""
        color="#32afed"
        placement="right"
        icon={
          <Icon
            name="pencil"
            size={24}
            type="ionicon"
            color="white"
            tvParallaxProperties=""
          />
        }
        onPress={() => {
          navigation.navigate('LocationModifyView', { location: location });
        }}
      />
    </View>
  );
}
