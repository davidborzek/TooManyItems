import React from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

export type ImageListItem = {
  name: string;
  image?: string | null;
};

type Props<T extends ImageListItem> = {
  items: T[];
  refreshing?: boolean;
  onRefresh?: () => void;
  onPress?: (item: T) => void;
  onLongPress?: (item: T) => void;
  ListEmptyComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'light-gray',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 2,
    backgroundColor: '#c1c1c1',
  },
  containerName: {
    fontSize: 18,
    marginLeft: 16,
  },
});

export default function ImageList<T extends ImageListItem>({
  items,
  onRefresh,
  refreshing,
  onPress,
  onLongPress,
  ListEmptyComponent,
}: Props<T>) {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
        const callOnPress = () => {
          if (onPress) {
            onPress(item);
          }
        };
        return (
          <TouchableOpacity
            style={styles.item}
            onPress={callOnPress}
            onLongPress={() => {
              onLongPress && onLongPress(item);
            }}
            delayLongPress={200}
          >
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
              <View style={styles.image}></View>
            )}
            <Text style={styles.containerName}>{item.name}</Text>
          </TouchableOpacity>
        );
      }}
      refreshControl={
        refreshing != undefined ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={{ flex: 1 }}
    />
  );
}
