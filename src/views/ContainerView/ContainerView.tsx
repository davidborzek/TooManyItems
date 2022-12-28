import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableOpacity, View, Image } from "react-native";
import { Text } from "react-native-elements";
import { AppStackParamList } from "../../App";
import { Container, fetchLocation, insertContainer, Item, Location, updateContainer } from "../../supabase/supabase";
import { useEffect, useState } from 'react';
import { useItems } from "../../hooks/item";
import FullSpinner from "../../components/FullSpinner/FullSpinner";
import ImageList from "../../components/ImageList/ImageList";
import { useImagePicker } from "../../hooks/image";

type Props = NativeStackScreenProps<AppStackParamList, 'ContainerView'>;

export type ContainerViewParamList = {
  container: Container;
};

export default function ContainerView({ route, navigation }: Props) {
  const [ location, setLocation ] = useState<Location>()
  const { container } = route.params;
  const { loading, items, refreshing, fetch, refresh } = useItems(container.id);
  const { image, pickImage } = useImagePicker();

  const fetchContainer = () => {
    if (container && container.location_id != null) {
      fetchLocation(container.location_id).then((location) => {
        setLocation(location);
      })
    }
  };

  useEffect(() => {
    fetchContainer();
  }, []);

  if (loading) {
    return <FullSpinner />;
  }

  const realImage = image ? image : container.image;

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={ () => {
          pickImage().then((image) => {
            container.image = image.assets![0].uri;
            updateContainer(container);
          })
        }}
        style={{
          backgroundColor: '#c1c1c1',
          minWidth: "100%",
          maxWidth: "100%",
          height: "45%",
          flexDirection: "row"
        }}
      >        
        {realImage && (
          <Image
            source={{ uri: realImage }}
            style={{ position: "absolute", width: '100%', height: '100%' }}
          />
        )}
        <View style={{
          alignSelf: "flex-end",
          marginLeft: 10,
          marginBottom: 10
        }}>
          <Text style={{fontSize: 20}} >{container.name}</Text>
          <Text>Location: {location?.street}</Text>
        </View>
      </TouchableOpacity>
      <ImageList
        items={items}
        onRefresh={refresh}
        refreshing={refreshing}
      />
    </View>
  )
}