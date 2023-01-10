import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import { AppStackParamList } from '../../App';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import ImageList from '../../components/ImageList/ImageList';
import { useLocations } from '../../hooks/location';
import { deleteLocation, Location } from '../../supabase/supabase';
import { HomeTabParamList } from '../Home/Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: 'light-gray',
  },
});

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Locations'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function LocationScreen({ navigation }: Props) {
  const { loading, locations, fetch, refreshing, refresh } = useLocations();

  useEffect(() => {
    navigation.addListener('focus', fetch);
  }, []);

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
            text: 'Delete',
            color: 'red',
            onPress: () => {
              if (selectedLocation) {
                deleteLocation(selectedLocation.id).then(() => fetch());
              }
            },
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
