import ContainerScreen from '../ContainerScreen/ContainerScreen';
import LocationScreen from '../LocationScreen/LocationScreen';
import SearchScreen from '../SearchScreen/SearchScreen';
import { Ionicons } from "@expo/vector-icons"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === 'Container') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Locations') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Container" component={ContainerScreen} />
        <Tab.Screen name="Locations" component={LocationScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    )
}