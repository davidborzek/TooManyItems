import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity, View, Image } from 'react-native';
import { FAB, Icon, Text } from 'react-native-elements';
import { AppStackParamList } from '../../App';
import {
  Container,
  fetchLocation,
  Item,
  Location,
  updateContainer,
} from '../../supabase/supabase';
import React, { useEffect, useState } from 'react';
import { useItemsForContainer } from '../../hooks/item';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import ImageList from '../../components/ImageList/ImageList';
import { useImagePicker } from '../../hooks/image';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<AppStackParamList, 'ContainerView'>;

export type ContainerViewParamList = {
  container: Container;
};

export default function ContainerView({ route, navigation }: Props) {
  const { t } = useTranslation();

  const [location, setLocation] = useState<Location>();
  const { container } = route.params;
  const { loading, items, refreshing, fetch, refresh } = useItemsForContainer(
    container.id
  );
  const { image, pickImage } = useImagePicker();

  const fetchContainer = () => {
    if (container && container.location_id != null) {
      fetchLocation(container.location_id).then((location) => {
        setLocation(location);
      });
    }
  };

  useEffect(() => {
    fetchContainer();
  }, []);

  useEffect(() => {
    if (container) {
      navigation.setOptions({
        title: container.name,
      });
    }
  }, [navigation, container]);

  if (loading) {
    return <FullSpinner />;
  }

  const realImage = image ? image : container.image;

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          pickImage().then((image) => {
            container.image = image.assets![0].uri;
            updateContainer(container);
          });
        }}
        style={{
          backgroundColor: '#c1c1c1',
          minWidth: '100%',
          maxWidth: '100%',
          height: '45%',
          flexDirection: 'row',
        }}
      >
        {realImage && (
          <Image
            source={{ uri: realImage }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          />
        )}
        <View
          style={{
            alignSelf: 'flex-end',
            marginLeft: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>{container.name}</Text>
          <Text
            onPress={() => {
              if (location)
                navigation.navigate('LocationView', { location: location });
            }}
          >
            {t('location')}: {location?.name}
          </Text>
        </View>
      </TouchableOpacity>
      <ImageList
        items={items}
        onRefresh={refresh}
        refreshing={refreshing}
        onPress={(item: Item) => {
          navigation.navigate('ItemView', { item: item });
        }}
        imagePlaceholderIcon="shapes-outline"
        ListEmptyComponent={
          <EmptyState
            icon="shapes-outline"
            message={t('no_items')}
            description={t('no_items_information')}
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
          navigation.navigate('ItemAdd', { container: container });
        }}
      />
    </View>
  );
}
