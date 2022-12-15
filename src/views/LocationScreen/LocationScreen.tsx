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

interface Location {
  id: number
  name: string
  street: string
  city: string
  zip_code: string
  created_at: string
  image_id: any
}

export default function LocationScreen() {
  let [data, setData] = useState<Location[]>([])
  
  useEffect(() => {
    supabase
      .from('location')
      .select("*")
      .then(({data, error}) => {
          setData(data as Location[])
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
