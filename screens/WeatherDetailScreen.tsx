/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undefined;
    Details: { city: string };
};

export type WeatherDetailScreenProps = StackScreenProps<RootStackParamList, 'Details'>;

interface WeatherInfo {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: Array<{
        main: string;
    }>;
}

const WeatherDetailScreen = ({ route, navigation }: WeatherDetailScreenProps) => {
    const { city } = route.params;
    const [weather, setWeather] = useState<WeatherInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f8a5467bfbf5c0747dcf5b885d67852f&units=metric`);
                setWeather(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    if (loading) { return <ActivityIndicator size="large" />; }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {weather ? (
                <>
                    <Text>City: {weather.name}</Text>
                    <Text>Temperature: {weather.main.temp}°C</Text>
                    <Text>Weather: {weather.weather[0].main}</Text>
                    <Text>Humidity: {weather.main.humidity}%</Text>
                    <Button title="Back to Home" onPress={() => navigation.goBack()} />
                </>
            ) : (
                <Text>No weather data available.</Text>
            )}
        </View>
    );
};

export default WeatherDetailScreen;
