import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { AppStackParamList } from '../../App';
import { HomeTabParamList } from '../Home/Home';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, 'Search'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function SearchScreen({}: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}
