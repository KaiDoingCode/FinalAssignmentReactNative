/* eslint-disable prettier/prettier */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Details: { city: string };
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type WeatherDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'Details'
>;

type WeatherDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

export type {
  HomeScreenNavigationProp,
  WeatherDetailScreenRouteProp,
  WeatherDetailScreenNavigationProp,
};
