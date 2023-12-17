/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WeatherDetailScreen from './screens/WeatherDetailScreen';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undefined;
    Details: { city: string };
};

// Define the types for navigation and route
type WeatherDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;
type WeatherDetailScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={({ route, navigation }: { route: WeatherDetailScreenRouteProp; navigation: WeatherDetailScreenNavigationProp }) =>
            <WeatherDetailScreen route={route} navigation={navigation} />
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
