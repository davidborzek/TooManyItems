import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import { AppStackParamList } from "../../App";
import { useImagePicker } from "../../hooks/image";
import { Container, fetchContainer, fetchLocation, Item, Location, updateItem } from "../../supabase/supabase";

type Props = NativeStackScreenProps<AppStackParamList, 'ItemView'>;

export type ItemViewParamList = {
  item: Item;
}

export default function ItemView({ route, navigation }: Props) {
  const { image, pickImage } = useImagePicker();
  const { item } = route.params;
  const [location, setLocation] = useState<Location>()
  const [container, setContainer] = useState<Container>()

  useEffect(() => {
    if (item && item.container_id != null) {
      fetchContainer(item.container_id).then((container) => {
        setContainer(container)
        if (container == null || container.location_id == null)
          return;
        fetchLocation(container.location_id).then((location) => {
          setLocation(location);
        })
      })
    }
  }, []);


  const realImage = image ? image : item.image;

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          pickImage().then((image) => {
            item.image = image.assets![0].uri;
            updateItem(item);
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
          <Text style={{ fontSize: 20 }} >{item.name}</Text>
          <Text onPress={() => {
            navigation.navigate("LocationView", { location: location! });
          }}>Location: {location?.name}</Text>
          <Text onPress={() => {
            navigation.navigate("ContainerView", { container: container! });
          }}>Container: {container?.name}</Text>
        </View>
      </TouchableOpacity>
      <Text style={{ margin: 20 }} >{item.description}</Text>
    </View>
  )
}