import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { supabase } from "../../supabase";

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

interface Container {
  id: number
  name: string
  location_id: number
  created_at: string
  image_id: any
}


export default function ContainerScreen() {
  let [data, setData] = useState<Container[]>([])
  
  useEffect(() => {
    supabase
      .from('container')
      .select("*")
      .then(({data, error}) => {
          setData(data as Container[])
      })
  }, [])


  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
      />
    </View>
  );
}
