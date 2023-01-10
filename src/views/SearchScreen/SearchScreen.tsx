import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, View, StyleSheet, ScrollView } from 'react-native';
import { AppStackParamList } from '../../App';
import Badge from '../../components/Badge/Badge';
import ImageList from '../../components/ImageList/ImageList';
import { SearchResultEntry, SearchType, useSearch } from '../../hooks/search';
import { Container, Item, Location } from '../../supabase/supabase';
import { HomeTabParamList } from '../Home/Home';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Search'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function SearchScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { result, query, type, setQuery, setType } = useSearch();

  const handleEntryPressed = (entry: SearchResultEntry) => {
    if (type === SearchType.ITEM) {
      navigation.navigate('ItemView', { item: entry as Item });
      return;
    }

    if (type === SearchType.CONTAINER) {
      navigation.navigate('ContainerView', {
        container: entry as Container,
      });
      return;
    }

    if (type === SearchType.LOCATION) {
      navigation.navigate('LocationView', {
        location: entry as Location,
      });
      return;
    }
  };

  return (
    <View style={styles.view}>
      <ScrollView horizontal style={styles.typeFilter}>
        <Badge
          title={t('items')}
          onPress={() => setType(SearchType.ITEM)}
          selected={type === SearchType.ITEM}
          icon="shapes"
        />
        <Badge
          title={t('containers')}
          onPress={() => setType(SearchType.CONTAINER)}
          selected={type === SearchType.CONTAINER}
          icon="cube"
        />
        <Badge
          title={t('locations')}
          onPress={() => setType(SearchType.LOCATION)}
          selected={type === SearchType.LOCATION}
          icon="location"
        />
      </ScrollView>
      <TextInput
        placeholder={t('search') || ''}
        style={styles.input}
        onChangeText={setQuery}
        value={query}
      />
      <ImageList items={result} onPress={handleEntryPressed} />
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
  typeFilter: {
    flexDirection: 'row',
    flexGrow: 0,
  },
});
