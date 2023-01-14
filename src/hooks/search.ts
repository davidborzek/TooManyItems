import {
  Container,
  Item,
  Location,
  searchContainers,
  searchItems,
  searchLocations,
} from '../supabase/supabase';
import { useEffect, useState } from 'react';

export type SearchResultEntry = Container | Location | Item;

export enum SearchType {
  ITEM = 'ITEM',
  LOCATION = 'LOCATION',
  CONTAINER = 'CONTAINER',
}

/**
 * React Hook welche verschiedene Suchfunktionen für Items, Container und Locations bereitstellt.
 */
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

    if (type === SearchType.ITEM) {
      searchItems(query)
        .then(setResult)
        .finally(() => setLoading(false));
      return;
    }

    if (type === SearchType.LOCATION) {
      searchLocations(query)
        .then(setResult)
        .finally(() => setLoading(false));
      return;
    }

    if (type === SearchType.CONTAINER) {
      searchContainers(query)
        .then(setResult)
        .finally(() => setLoading(false));
      return;
    }
  }, [query, type]);

  return { loading, query, result, setQuery, setType, type };
}
