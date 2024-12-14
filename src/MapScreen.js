import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapScreen = () => {
  const [markers] = useState([
    { id: 1, latitude: 37.78825, longitude: -122.4324, title: "Point 1", description: "Find the treasure here!" },
    { id: 2, latitude: 37.78925, longitude: -122.4334, title: "Point 2", description: "Your next challenge awaits!" },
    { id: 3, latitude: 37.78725, longitude: -122.4314, title: "Point 3", description: "You're almost there!" },
  ]);

  const handleMarkerPress = async (title) => {
    let savedPoints = await AsyncStorage.getItem('visitedPoints');
    savedPoints = savedPoints ? JSON.parse(savedPoints) : [];
    if (!savedPoints.includes(title)) {
      savedPoints.push(title);
      await AsyncStorage.setItem('visitedPoints', JSON.stringify(savedPoints));
      Alert.alert("Point Visited", `${title} added to your progress!`);
    } else {
      Alert.alert("Already Visited", `${title} is already in your progress.`);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
            onPress={() => handleMarkerPress(marker.title)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
});

export default MapScreen;
