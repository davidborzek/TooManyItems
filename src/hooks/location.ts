import { useEffect, useState } from 'react';
import { Location, fetchLocations } from '../supabase/supabase';

export function useLocations() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);

  const fetch = () => {
    setLoading(true);
    fetchLocations()
      .then(setLocations)
      .finally(() => setLoading(false));
  };

  const refresh = () => {
    setRefreshing(true);
    return fetchLocations()
      .then(setLocations)
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return { loading, locations, refreshing, fetch, refresh };
}
