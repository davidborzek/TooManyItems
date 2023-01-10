import { useEffect, useState } from 'react';
import {
  Container,
  Item,
  searchContainers,
  searchItems,
  searchLocations,
  Location,
} from '../supabase/supabase';

export type SearchResultEntry = Container | Location | Item;

export enum SearchType {
  ITEM = 'ITEM',
  LOCATION = 'LOCATION',
  CONTAINER = 'CONTAINER',
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<SearchType>(SearchType.ITEM);
  const [result, setResult] = useState<SearchResultEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResult([]);
      return;
    }

    setLoading(true);

    if (type == SearchType.ITEM) {
      searchItems(query)
        .then(setResult)
        .finally(() => setLoading(false));
      return;
    }

    if (type == SearchType.LOCATION) {
      searchLocations(query)
        .then(setResult)
        .finally(() => setLoading(false));
      return;
    }

    if (type == SearchType.CONTAINER) {
      searchContainers(query)
        .then(setResult)
        .finally(() => setLoading(false));
      return;
    }
  }, [query, type]);

  return { query, type, result, loading, setQuery, setType };
}
