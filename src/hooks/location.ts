import { useEffect, useState } from 'react';
import { Location, fetchLocations } from '../supabase/supabase';

export function useLocations() {
  const [refreshing, setRefreshing] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);

  const fetch = () => {
    fetchLocations()
      .then(setLocations)
  };

  const refresh = () => {
    setRefreshing(true);
    return fetchLocations()
    .then(setLocations)
    .finally(() => {
      setRefreshing(false);
    });
  }

  useEffect(() => {
    fetch();
  }, []);

  return { locations, refreshing, fetch, refresh };
}
