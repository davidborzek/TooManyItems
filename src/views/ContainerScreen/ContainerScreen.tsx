import { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { Container, fetchContainers, supabase } from '../../supabase/supabase';
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeTabParamList } from '../Home/Home';
import { AppStackParamList } from '../../App';

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
  BottomTabScreenProps<HomeTabParamList, 'Container'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function ContainerScreen({ navigation }: Props) {
  let [containers, setContainers] = useState<Container[]>([]);

  const fetchData = () => {
    fetchContainers().then(setContainers);
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
        data={containers}
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
          navigation.navigate('ContainerAdd');
        }}
      />
    </View>
  );
}
