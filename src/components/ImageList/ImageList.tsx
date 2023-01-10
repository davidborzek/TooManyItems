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
import { Ionicons } from '@expo/vector-icons';

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
  imagePlaceholderIcon?: React.ComponentProps<typeof Ionicons>['name'];
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
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#c1c1c1',
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
  imagePlaceholderIcon,
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
              <View style={[styles.image, styles.imagePlaceholder]}>
                <Ionicons
                  name={imagePlaceholderIcon || 'cube'}
                  size={24}
                  color="#c1c1c1"
                />
              </View>
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
      contentContainerStyle={{ flex: items.length === 0 ? 1 : undefined }}
    />
  );
}
