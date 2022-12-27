import { Image, Text, View, FlatList, StyleSheet } from 'react-native';

export type ImageListItem = {
  name: string;
  image?: string | null;
};

type Props = {
  items: ImageListItem[];
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

export default function ImageList({ items }: Props) {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
        console.log(item);

        return (
          <View style={styles.item}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
              <View style={styles.image}></View>
            )}
            <Text style={styles.containerName}>{item.name}</Text>
          </View>
        );
      }}
    />
  );
}
