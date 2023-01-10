import { useEffect, useState } from 'react';
import { Item, searchItems } from '../supabase/supabase';

export function useSearchItems() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchItems(query)
        .then(setResult)
        .finally(() => setLoading(false));
    } else {
      setResult([]);
    }
  }, [query]);

  return { query, result, loading, setQuery };
}
