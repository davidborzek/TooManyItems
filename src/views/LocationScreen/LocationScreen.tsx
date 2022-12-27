import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import { AppStackParamList } from '../../App';
import ImageList from '../../components/ImageList/ImageList';
import { useLocations } from '../../hooks/location';
import { HomeTabParamList } from '../Home/Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: 'light-gray',
  },
});

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Locations'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function LocationScreen({ navigation }: Props) {
  const { locations, fetch } = useLocations();

  useEffect(() => {
    navigation.addListener('focus', fetch);
  }, []);

  return (
    <View style={styles.container}>
      <ImageList items={locations} />
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
          navigation.navigate('LocationAdd');
        }}
      />
    </View>
  );
}
