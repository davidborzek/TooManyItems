import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { AppStackParamList } from '../../App';
import ImageList from '../../components/ImageList/ImageList';
import { useSearchItems } from '../../hooks/search';
import { Item } from '../../supabase/supabase';
import { HomeTabParamList } from '../Home/Home';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Search'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function SearchScreen({ navigation }: Props) {
  const { result, query, setQuery } = useSearchItems();

  useEffect(() => {
    navigation.addListener('blur', () => {
      setQuery('');
    });
  }, []);

  return (
    <View style={styles.view}>
      <TextInput
        placeholder="Search..."
        style={styles.input}
        onChangeText={setQuery}
        value={query}
      />
      <ImageList
        items={result}
        onPress={(item: Item) => {
          navigation.navigate('ItemView', { item: item });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, marginHorizontal: 20, marginTop: 20 },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
