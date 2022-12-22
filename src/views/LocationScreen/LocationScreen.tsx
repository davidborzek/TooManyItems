import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import { AppStackParamList } from '../../App';
import { supabase } from '../../supabase';
import { Location } from '../../supabase.types';
import { HomeTabParamList } from '../Home/Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: 'light-gray',
  },
});

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Locations'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function LocationScreen({ navigation }: Props) {
  let [data, setData] = useState<Location[]>([]);

  const fetchData = () => {
    supabase
      .from('location')
      .select('*')
      .then(({ data, error }) => {
        setData(data as Location[]);
      });
  };

  useEffect(() => {
    fetchData();
    navigation.addListener('focus', () => {
      fetchData();
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
      <FAB
        title=""
        color="#32afed"
        placement="right"
        icon={
          <Icon
            name="add"
            size={24}
            color="white"
            tvParallaxProperties={undefined}
          />
        }
        onPress={() => {
          navigation.navigate('LocationAdd');
        }}
      />
    </View>
  );
}
