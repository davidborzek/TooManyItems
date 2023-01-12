import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { Item, fetchItemsForContainer, deleteItem } from '../supabase/supabase';

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

export function useDeleteItemWithConfirmation() {
  const navigation = useNavigation();

  const { t } = useTranslation();

  const _deleteItem = (name: string, id: number) => {
    Alert.alert(
      t('delete_item'),
      t('delete_item_message', { item: name }) || '',
      [
        {
          text: t('delete') || '',
          onPress: () => {
            deleteItem(id).then(() => {
              navigation.goBack();
            });
          },
          style: 'default',
        },
        {
          text: t('cancel') || '',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return { deleteItem: _deleteItem };
}
