import { Item, deleteItem, fetchItemsForContainer } from '../supabase/supabase';
import { useEffect, useState } from 'react';

import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export function useItemsForContainer(containerId: number) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  const fetch = () => {
    setLoading(true);
    fetchItemsForContainer(containerId)
      .then(setItems)
      .finally(() => setLoading(false));
  };

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
  }, []);

  return { fetch, items, loading, refresh, refreshing };
}

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
