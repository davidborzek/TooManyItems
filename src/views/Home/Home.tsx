import ContainerScreen from '../ContainerScreen/ContainerScreen';
import LocationScreen from '../LocationScreen/LocationScreen';
import SearchScreen from '../SearchScreen/SearchScreen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

export default function Home() {
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
      })}
    >
      <Tab.Screen name="Container" component={ContainerScreen} />
      <Tab.Screen name="Locations" component={LocationScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}
