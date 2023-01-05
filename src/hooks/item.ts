import { useEffect, useState } from 'react';
import { Item, fetchItemsForContainer } from '../supabase/supabase';

export function useItemsForContainer(container_id: number) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  const fetch = () => {
    setLoading(true);
    fetchItemsForContainer(container_id)
      .then(setItems)
      .finally(() => setLoading(false));
  };

  const refresh = () => {
    setRefreshing(true);
    return fetchItemsForContainer(container_id)
      .then(setItems)
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return { loading, items, refreshing, fetch, refresh };
}
