import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContainerScreen from './src/views/ContainerScreen/ContainerScreen';
import LocationScreen from './src/views/LocationScreen/LocationScreen';
import { View } from 'react-native';
import SearchScreen from './src/views/SearchScreen/SearchScreen';
import { Ionicons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}