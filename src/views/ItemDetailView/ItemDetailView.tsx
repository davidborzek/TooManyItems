import {
  Container,
  Item,
  Location,
  fetchContainer,
  fetchLocation,
  updateItem,
} from '../../supabase/supabase';
import { FAB, Icon, Text } from 'react-native-elements';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { AppStackParamList } from '../../App';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDeleteItemWithConfirmation } from '../../hooks/item';
import { useImagePicker } from '../../hooks/image';

type Props = NativeStackScreenProps<AppStackParamList, 'ItemView'>;

export type ItemViewParamList = {
  item: Item;
};

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
  },
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

/**
 * React view für die Detaillierte Item Ansicht.
 */
export default function ItemDetailView({ route, navigation }: Props) {
  const { image, pickImage } = useImagePicker();
  const { item } = route.params;
  const [location, setLocation] = useState<Location>();
  const [container, setContainer] = useState<Container>();

  const { deleteItem } = useDeleteItemWithConfirmation();

  useEffect(() => {
    if (item && item.container_id != null) {
      fetchContainer(item.container_id).then((container) => {
        setContainer(container);
        if (container == null || container.location_id == null) return;
        fetchLocation(container.location_id).then((location) => {
          setLocation(location);
        });
      });
    }
  }, [item]);

  useEffect(() => {
    if (item) {
      navigation.setOptions({
        title: item.name,
      });
    }
  }, [navigation, item]);

  if (!container || !location) {
    return <></>;
  }

  const realImage = image ? image : item.image;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          pickImage().then((image) => {
            if (!image.canceled && image.assets[0].base64) {
              item.image = image.assets[0].base64;
              updateItem(item);
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
          <Text style={styles.title}>{item.name}</Text>
          <Text
            style={styles.centered}
            onPress={() => {
              navigation.navigate('LocationView', { location: location });
            }}
          >
            <Ionicons name={'location-outline'} size={16} /> {location?.name}
          </Text>
          <Text
            style={styles.centered}
            onPress={() => {
              navigation.navigate('ContainerView', { container: container });
            }}
          >
            <Ionicons name={'cube-outline'} size={16} /> {container?.name}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{ margin: 20 }}>{item.description}</Text>
      <FAB
        title=""
        color="red"
        placement="right"
        icon={
          <Icon
            name="trash"
            size={24}
            type="ionicon"
            color="white"
            tvParallaxProperties=""
          />
        }
        onPress={() => {
          deleteItem(item.name, item.id);
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
          navigation.navigate('ItemModifyView', { item: item });
        }}
      />
    </View>
  );
}
