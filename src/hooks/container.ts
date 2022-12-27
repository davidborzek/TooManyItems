import { useEffect, useState } from 'react';
import { Container, fetchContainers } from '../supabase/supabase';

export function useContainers() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  let [containers, setContainers] = useState<Container[]>([]);

  const fetch = () => {
    setLoading(true);
    fetchContainers()
      .then(setContainers)
      .finally(() => setLoading(false));
  };

  const refresh = () => {
    setRefreshing(true);
    return fetchContainers()
      .then(setContainers)
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return { containers, fetch, refresh, refreshing, loading };
}
