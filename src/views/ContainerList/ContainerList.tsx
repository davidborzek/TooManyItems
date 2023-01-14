import { Container, deleteContainer } from '../../supabase/supabase';
import { FAB, Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppStackParamList } from '../../App';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import EmptyState from '../../components/EmptyState/EmptyState';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import { HomeTabParamList } from '../Home/Home';
import ImageList from '../../components/ImageList/ImageList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContainers } from '../../hooks/container';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Container'>,
  NativeStackScreenProps<AppStackParamList>
>;

/**
 * React view für die Haupt Container Ansicht auf der Startseite.
 */
export default function ContainerList({ navigation }: Props) {
  const { t } = useTranslation();
  const { loading, containers, fetch, refresh, refreshing } = useContainers();

  useEffect(() => {
    navigation.addListener('focus', fetch);
  }, [fetch, navigation]);

  const [selectedContainer, setSelectedContainer] = useState<Container>();

  const [optionsVisible, setOptionsVisible] = useState(false);

  const toggleOptionsVisible = (container?: Container) => {
    setOptionsVisible((visible) => !visible);
    setSelectedContainer(container);
  };

  if (loading) {
    return <FullSpinner />;
  }

  return (
    <View style={styles.container}>
      <BottomSheet
        items={[
          {
            color: 'red',
            onPress: () => {
              if (selectedContainer) {
                deleteContainer(selectedContainer.id).then(() => fetch());
              }
            },
            text: t('delete'),
          },
        ]}
        visible={optionsVisible}
        onClose={toggleOptionsVisible}
      />
      <ImageList
        items={containers}
        onRefresh={refresh}
        refreshing={refreshing}
        onPress={(item: Container) => {
          navigation.navigate('ContainerView', { container: item });
        }}
        onLongPress={toggleOptionsVisible}
        imagePlaceholderIcon="cube"
        ListEmptyComponent={
          <EmptyState
            icon="cube-outline"
            message={t('no_containers')}
            description={t('no_containers_information')}
          />
        }
      />
      <FAB
        title=""
        color="#32afed"
        placement="right"
        icon={
          <Icon
            name="add"
            size={24}
            color="white"
            tvParallaxProperties={undefined}
          />
        }
        onPress={() => {
          navigation.navigate('ContainerAdd');
        }}
      />
    </View>
  );
}
