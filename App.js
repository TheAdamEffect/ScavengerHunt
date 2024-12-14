import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import MapScreen from './src/MapScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Scavenger Hunt' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Point Location' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
