import { useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: "light-gray"
  },
});

export default function ContainerScreen() {
  let [data, setData] = useState(Array(20).fill("").map((_, i) => ({ key: `item #${i}` })))  

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}
