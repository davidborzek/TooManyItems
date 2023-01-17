import {
  Container,
  Item,
  Location,
  deleteItem,
  fetchLocation,
} from '../../supabase/supabase';
import { FAB, Icon, Text } from 'react-native-elements';
import { Image, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import { AppStackParamList } from '../../App';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import EmptyState from '../../components/EmptyState/EmptyState';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import ImageList from '../../components/ImageList/ImageList';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useItemsForContainer } from '../../hooks/item';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<AppStackParamList, 'ContainerView'>;

export type ContainerViewParamList = {
  container: Container;
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
  location: {
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: 'bold' },
});

/**
 * React view für die Detaillierte Container Ansicht.
 */
export default function ContainerDetailView({ route, navigation }: Props) {
  const { t } = useTranslation();

  const [location, setLocation] = useState<Location>();
  const { container } = route.params;
  const { loading, items, refreshing, fetch, refresh } = useItemsForContainer(
    container.id
  );

  const fetchContainer = useCallback(() => {
    if (container && container.location_id != null) {
      fetchLocation(container.location_id).then((location) => {
        setLocation(location);
      });
    }
  }, [container]);

  useEffect(() => {
    fetchContainer();
    navigation.addListener('focus', fetch);
    return () => {
      navigation.removeListener('focus', fetch);
    };
  }, [fetch, navigation, fetchContainer]);

  useEffect(() => {
    if (container) {
      navigation.setOptions({
        title: container.name,
      });
    }
  }, [navigation, container]);

  const [selectedItem, setSelectedItem] = useState<Item>();

  const [optionsVisible, setOptionsVisible] = useState(false);

  const toggleOptionsVisible = (item?: Item) => {
    setOptionsVisible((visible) => !visible);
    setSelectedItem(item);
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
              if (selectedItem) {
                deleteItem(selectedItem.id).then(() => fetch());
              }
            },
            text: t('delete'),
          },
        ]}
        visible={optionsVisible}
        onClose={toggleOptionsVisible}
      />
      <View style={styles.imageContainer}>
        {container.image ? (
          <Image
            source={{ uri: `data:image/png;base64,${container.image}` }}
            style={styles.image}
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Ionicons name={'cube-outline'} size={120} color="#FFFFFF" />
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.title}>{container.name}</Text>
          <Text
            style={styles.location}
            onPress={() => {
              if (location)
                navigation.navigate('LocationView', { location: location });
            }}
          >
            <Ionicons name={'location-outline'} size={16} /> {location?.name}
          </Text>
        </View>
      </View>
      <ImageList
        items={items}
        onRefresh={refresh}
        refreshing={refreshing}
        onPress={(item: Item) => {
          navigation.navigate('ItemView', { item: item });
        }}
        imagePlaceholderIcon="shapes-outline"
        onLongPress={toggleOptionsVisible}
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
        placement="left"
        icon={
          <Icon
            name="qr-code"
            type="ionicons"
            size={24}
            color="white"
            tvParallaxProperties={undefined}
          />
        }
        onPress={() => {
          navigation.navigate('QRCodePrint', { content: `${container.id}` });
        }}
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
      <FAB
        title=""
        color="#32afed"
        placement="right"
        style={{ marginBottom: 80 }}
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
          navigation.navigate('ContainerModifyView', { container: container });
        }}
      />
    </View>
  );
}
