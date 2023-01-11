import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { AppStackParamList } from '../../App';
import Chip from '../../components/Chip/Chip';
import EmptyState from '../../components/EmptyState/EmptyState';
import ImageList from '../../components/ImageList/ImageList';
import { SearchResultEntry, SearchType, useSearch } from '../../hooks/search';
import { Container, Item, Location } from '../../supabase/supabase';
import { HomeTabParamList } from '../Home/Home';
import { Ionicons } from '@expo/vector-icons';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Search'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function Search({ navigation }: Props) {
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

  const getImagePlaceholder = () => {
    if (type === SearchType.ITEM) {
      return 'shapes-outline';
    }

    if (type === SearchType.CONTAINER) {
      return 'cube';
    }

    if (type === SearchType.LOCATION) {
      return 'location-outline';
    }
  };

  return (
    <View style={styles.view}>
      <ScrollView horizontal style={styles.typeFilter}>
        <Chip
          title={t('items')}
          onPress={() => setType(SearchType.ITEM)}
          selected={type === SearchType.ITEM}
          icon="shapes"
        />
        <Chip
          title={t('containers')}
          onPress={() => setType(SearchType.CONTAINER)}
          selected={type === SearchType.CONTAINER}
          icon="cube"
        />
        <Chip
          title={t('locations')}
          onPress={() => setType(SearchType.LOCATION)}
          selected={type === SearchType.LOCATION}
          icon="location"
        />
      </ScrollView>
      <Input
        inputContainerStyle={styles.input}
        onChangeText={setQuery}
        value={query}
        placeholder={t('search') || ''}
        rightIcon={
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name={'close-outline'} size={28} />
          </TouchableOpacity>
        }
        autoCompleteType=""
      />
      <ImageList
        items={result}
        onPress={handleEntryPressed}
        imagePlaceholderIcon={getImagePlaceholder()}
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            message={t('no_search_results')}
            description={t('no_search_results_information')}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, marginHorizontal: 20, marginTop: 20 },
  input: {
    marginTop: 20,
  },
  typeFilter: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
  },
});
