import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AppStackParamList } from '../../App';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import ImageList from '../../components/ImageList/ImageList';
import { useContainersForLocation } from '../../hooks/container';
import { useImagePicker } from '../../hooks/image';
import { Container, Location, updateLocation } from '../../supabase/supabase';

type Props = NativeStackScreenProps<AppStackParamList, 'LocationView'>;

export type LocationViewParamList = {
  location: Location;
};

export default function LocationView({ route, navigation }: Props) {
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
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          pickImage().then((image) => {
            location.image = image.assets![0].uri;
            updateLocation(location);
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
          <Text style={{ fontSize: 20 }}>{location?.name}</Text>
          <Text>{location.street}</Text>
          <Text>
            {location.zip_code} {location.city}
          </Text>
        </View>
      </TouchableOpacity>
      <ImageList
        items={containers}
        onRefresh={refresh}
        refreshing={refreshing}
        onPress={(item: Container) => {
          navigation.navigate('ContainerView', { container: item });
        }}
      />
    </View>
  );
}
