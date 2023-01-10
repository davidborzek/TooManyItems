import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeTabParamList } from '../Home/Home';
import { AppStackParamList } from '../../App';
import { useContainers } from '../../hooks/container';
import ImageList from '../../components/ImageList/ImageList';
import FullSpinner from '../../components/FullSpinner/FullSpinner';
import { Container, deleteContainer } from '../../supabase/supabase';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import EmptyState from '../../components/EmptyState/EmptyState';
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

export default function ContainerScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { loading, containers, fetch, refresh, refreshing } = useContainers();

  useEffect(() => {
    navigation.addListener('focus', fetch);
  }, []);

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
      <ImageList
        items={containers}
        onRefresh={refresh}
        refreshing={refreshing}
        onPress={(item: Container) => {
          navigation.navigate('ContainerView', { container: item });
        }}
        onLongPress={toggleOptionsVisible}
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
