import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';

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
  ListEmptyComponent?: React.ReactElement | null | undefined;
  imagePlaceholderIcon?: React.ComponentProps<typeof Ionicons>['name'];
};

const styles = StyleSheet.create({
  containerName: {
    fontSize: 18,
    marginLeft: 16,
  },
  image: {
    borderRadius: 2,
    height: 48,
    width: 48,
  },
  imagePlaceholder: {
    alignItems: 'center',
    borderColor: '#c1c1c1',
    borderWidth: 2,
    justifyContent: 'center',
  },
  item: {
    alignItems: 'center',
    backgroundColor: 'light-gray',
    flexDirection: 'row',
    padding: 10,
  },
});

/**
 * Ein wiederverwendbarer Component welcher mehrere ListItems in einer Liste darstellen kann.
 * Zusätzlich wird links neben dem ListItem ein Bild dargestellt.
 */
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
              <Image
                source={{ uri: `data:image/png;base64,${item.image}` }}
                style={styles.image}
              />
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
        refreshing !== undefined ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={{ flex: items.length === 0 ? 1 : undefined }}
    />
  );
}
