import { useEffect, useState } from 'react';
import { Location, fetchLocations } from '../supabase/supabase';

export function useLocations() {
  let [locations, setLocations] = useState<Location[]>([]);

  const fetch = () => {
    fetchLocations().then(setLocations);
  };

  useEffect(() => {
    fetch();
  }, []);

  return { locations, fetch };
}
