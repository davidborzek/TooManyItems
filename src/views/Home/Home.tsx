import ContainerScreen from '../ContainerScreen/ContainerScreen';
import LocationScreen from '../LocationScreen/LocationScreen';
import SearchScreen from '../SearchScreen/SearchScreen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export type HomeTabParamList = {
  Container: undefined;
  Locations: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

function icon(screen: keyof HomeTabParamList, focused: boolean) {
  if (screen === 'Container') {
    return focused
      ? 'ios-information-circle'
      : 'ios-information-circle-outline';
  } else if (screen === 'Locations') {
    return focused ? 'ios-list' : 'ios-list-outline';
  } else {
    return focused
      ? 'ios-information-circle'
      : 'ios-information-circle-outline';
  }
}

function QRCameraButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={'camera'} size={24} />
    </TouchableOpacity>
  );
}

export default function Home({ navigation }: Props) {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={icon(route.name, focused)}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerRight: () => {
          return (
            <QRCameraButton
              onPress={() => navigation.navigate('QRCodeScanner')}
            />
          );
        },
        headerRightContainerStyle: {
          marginRight: 16,
        },
      })}
    >
      <Tab.Screen
        name="Container"
        component={ContainerScreen}
        options={{ title: t('containers') || '' }}
      />
      <Tab.Screen
        name="Locations"
        component={LocationScreen}
        options={{ title: t('locations') || '' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: t('search') || '' }}
      />
    </Tab.Navigator>
  );
}
