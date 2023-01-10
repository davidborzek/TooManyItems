import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { AppStackParamList } from '../../App';
import { useImagePicker } from '../../hooks/image';
import {
  Container,
  fetchContainer,
  fetchLocation,
  Item,
  Location,
  updateItem,
} from '../../supabase/supabase';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<AppStackParamList, 'ItemView'>;

export type ItemViewParamList = {
  item: Item;
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
  centered: {
    alignItems: 'center',
  },
});

export default function ItemDetailView({ route, navigation }: Props) {
  const { image, pickImage } = useImagePicker();
  const { item } = route.params;
  const [location, setLocation] = useState<Location>();
  const [container, setContainer] = useState<Container>();

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
  }, []);

  useEffect(() => {
    if (item) {
      navigation.setOptions({
        title: item.name,
      });
    }
  }, [navigation, item]);

  const realImage = image ? image : item.image;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          pickImage().then((image) => {
            item.image = image.assets![0].uri;
            updateItem(item);
          });
        }}
        style={styles.imageContainer}
      >
        {realImage && (
          <Image source={{ uri: realImage }} style={styles.image} />
        )}
        <View style={styles.info}>
          <Text style={styles.title}>{item.name}</Text>
          <Text
            style={styles.centered}
            onPress={() => {
              navigation.navigate('LocationView', { location: location! });
            }}
          >
            <Ionicons name={'location-outline'} size={16} /> {location?.name}
          </Text>
          <Text
            style={styles.centered}
            onPress={() => {
              navigation.navigate('ContainerView', { container: container! });
            }}
          >
            <Ionicons name={'cube-outline'} size={16} /> {container?.name}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{ margin: 20 }}>{item.description}</Text>
    </View>
  );
}
