import ContainerList from '../ContainerList/ContainerList';
import LocationList from '../LocationList/LocationList';
import Search from '../Search/Search';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';
import Settings from '../Settings/Settings';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

export type HomeTabParamList = {
  Container: undefined;
  Locations: undefined;
  Search: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

function icon(screen: keyof HomeTabParamList, focused: boolean) {
  switch (screen) {
    case 'Container':
      return 'cube';
    case 'Locations':
      return 'location';
    case 'Search':
      return 'search';
    case 'Settings':
      return 'settings';
  }
}

function QRCameraButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={'qr-code'} size={24} />
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
        tabBarHideOnKeyboard: true,
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
          paddingRight: 16,
        },
      })}
    >
      <Tab.Screen
        name="Container"
        component={ContainerList}
        options={{ title: t('containers') || '' }}
      />
      <Tab.Screen
        name="Locations"
        component={LocationList}
        options={{ title: t('locations') || '' }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ title: t('search') || '' }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ title: t('settings') || '' }}
      />
    </Tab.Navigator>
  );
}
