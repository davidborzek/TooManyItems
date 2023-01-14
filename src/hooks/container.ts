import {
  Container,
  fetchContainers,
  fetchContainersForLocation,
} from '../supabase/supabase';
import { useCallback, useEffect, useState } from 'react';

export function useContainers() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [containers, setContainers] = useState<Container[]>([]);

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

  return { containers, fetch, loading, refresh, refreshing };
}

export function useContainersForLocation(locationId: number) {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [containers, setContainers] = useState<Container[]>([]);

  const fetch = useCallback(() => {
    setLoading(true);
    fetchContainersForLocation(locationId)
      .then(setContainers)
      .finally(() => setLoading(false));
  }, [locationId]);

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
  }, [fetch]);

  return { containers, fetch, loading, refresh, refreshing };
}
