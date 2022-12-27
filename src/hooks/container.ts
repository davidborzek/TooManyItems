import { useEffect, useState } from 'react';
import { Container, fetchContainers } from '../supabase/supabase';

export function useContainers() {
  const [refreshing, setRefreshing] = useState(false);
  let [containers, setContainers] = useState<Container[]>([]);

  const fetch = () => {
    fetchContainers().then(setContainers);
  };

  const refresh = () => {
    setRefreshing(true);
    return fetchContainers()
    .then(setContainers)
    .finally(() => {
      setRefreshing(false);
    });
  }

  useEffect(() => {
    fetch();
  }, []);

  return { containers, fetch, refresh, refreshing };
}
