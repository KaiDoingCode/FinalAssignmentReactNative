/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Platform,
    StyleSheet,
    ToastAndroid,
    ActionSheetIOS,
    Alert,
} from 'react-native';
import { HomeScreenNavigationProp } from './navigation/types';
import * as Location from 'expo-location';

type Props = {
    navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [city, setCity] = useState('');
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [currentCity, setCurrentCity] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);

            const addressArray = await Location.reverseGeocodeAsync(currentLocation.coords);
            if (addressArray.length > 0) {
                setCurrentCity(addressArray[0].city);
            }
        })();
    }, []);

    let locationText = 'Fetching location...';
    if (errorMsg) {
        locationText = errorMsg;
    } else if (location) {
        locationText = `Latitude: ${location.coords.latitude.toFixed(2)}, Longitude: ${location.coords.longitude.toFixed(2)}`;
    }

    const onBoxPress = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show('Hello Android User!', ToastAndroid.SHORT);
        } else if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Hello iOS User!'],
                    cancelButtonIndex: 0,
                },
                buttonIndex => {
                    if (buttonIndex === 1) {
                        Alert.alert('Greetings', 'Hello iOS User!');
                    }
                }
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text>Enter a City Name:</Text>
            <TextInput
                style={Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid}
                onChangeText={setCity}
                value={city}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Get Weather"
                    onPress={() => navigation.navigate('Details', { city })}
                    color={Platform.OS === 'ios' ? '#007AFF' : '#6200EE'}
                />
            </View>
            {currentCity && <Text>Current City: {currentCity}</Text>}
            <Text>{locationText}</Text>
            <Button
                title="Platform Specific Action"
                onPress={onBoxPress}
                color={Platform.OS === 'ios' ? '#007AFF' : '#6200EE'}
            />
        </View>
    );
};

// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputIOS: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '80%',
        padding: 10,
        borderRadius: 10,
    },
    textInputAndroid: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '80%',
        padding: 10,
        backgroundColor: '#FFF',
    },
    buttonContainer: {
        marginBottom: 20,
        width: '80%',
        borderRadius: Platform.OS === 'ios' ? 10 : 0,
    },
});

export default HomeScreen;
