import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { supabase } from "../../supabase";
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements'

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
  image: string
}

export default function ContainerScreen({navigation}) {
  let [data, setData] = useState<Container[]>([])

  const fetchData = () => {
    supabase
      .from('container')
      .select("*")
      .then(({data, error}) => {
          setData(data as Container[])
      })
  }

  useEffect(() => {
    fetchData();
    navigation.addListener('focus', () => {
      fetchData();
    });
  }, [])


  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
      />
      <FAB
        title="" 
        color="#32afed"
        placement="right"
        icon={<Icon name="add" size={24} color="white" tvParallaxProperties={undefined} />}
        onPress={() => {
          navigation.navigate("ContainerAdd")
        }}
      />
    </View>
  );
}
