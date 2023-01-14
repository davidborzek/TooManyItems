import { FAB, Icon } from 'react-native-elements';
import { Location, deleteLocation } from '../../supabase/supabase';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppStackParamList } from '../../App';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import EmptyState from '../../components/EmptyState/EmptyState';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import { HomeTabParamList } from '../Home/Home';
import ImageList from '../../components/ImageList/ImageList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLocations } from '../../hooks/location';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    backgroundColor: 'light-gray',
    fontSize: 18,
    height: 44,
    padding: 10,
  },
});

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Locations'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function LocationList({ navigation }: Props) {
  const { t } = useTranslation();
  const { loading, locations, fetch, refreshing, refresh } = useLocations();

  useEffect(() => {
    navigation.addListener('focus', fetch);
  }, [fetch, navigation]);

  const [selectedLocation, setSelectedLocation] = useState<Location>();

  const [optionsVisible, setOptionsVisible] = useState(false);

  const toggleOptionsVisible = (location?: Location) => {
    setOptionsVisible((visible) => !visible);
    setSelectedLocation(location);
  };

  if (loading) {
    return <FullSpinner />;
  }

  return (
    <View style={styles.container}>
      <BottomSheet
        items={[
          {
            color: 'red',
            onPress: () => {
              if (selectedLocation) {
                deleteLocation(selectedLocation.id).then(() => fetch());
              }
            },
            text: t('delete'),
          },
        ]}
        visible={optionsVisible}
        onClose={toggleOptionsVisible}
      />
      <ImageList
        items={locations}
        onRefresh={refresh}
        refreshing={refreshing}
        onPress={(item: Location) => {
          navigation.navigate('LocationView', { location: item });
        }}
        onLongPress={toggleOptionsVisible}
        imagePlaceholderIcon="location-outline"
        ListEmptyComponent={
          <EmptyState
            icon="location-outline"
            message={t('no_locations')}
            description={t('no_locations_information')}
          />
        }
      />
      <FAB
        title=""
        color="#32afed"
        placement="right"
        icon={
          <Icon
            name="add"
            size={24}
            color="white"
            tvParallaxProperties={undefined}
          />
        }
        onPress={() => {
          navigation.navigate('LocationAdd');
        }}
      />
    </View>
  );
}
