import { Item, deleteItem, fetchItemsForContainer } from '../supabase/supabase';
import { useCallback, useEffect, useState } from 'react';

import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

/**
 * React Hook welche alle Items für einen Container bereitstellt.
 */
export function useItemsForContainer(containerId: number) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  const fetch = useCallback(() => {
    setLoading(true);
    fetchItemsForContainer(containerId)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [containerId]);

  const refresh = () => {
    setRefreshing(true);
    return fetchItemsForContainer(containerId)
      .then(setItems)
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { fetch, items, loading, refresh, refreshing };
}

/**
 * React Hook welche Items löschen kann. Gibt vor dem Löschen noch ein Konfirmations Alert aus.
 */
export function useDeleteItemWithConfirmation() {
  const navigation = useNavigation();

  const { t } = useTranslation();

  const _deleteItem = (name: string, id: number) => {
    Alert.alert(
      t('delete_item'),
      t('delete_item_message', { item: name }) || '',
      [
        {
          onPress: () => {
            deleteItem(id).then(() => {
              navigation.goBack();
            });
          },
          style: 'default',
          text: t('delete') || '',
        },
        {
          style: 'cancel',
          text: t('cancel') || '',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return { deleteItem: _deleteItem };
}
