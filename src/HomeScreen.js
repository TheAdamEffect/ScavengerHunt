import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Share } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [visitedPoints, setVisitedPoints] = useState([]);

  useEffect(() => {
    const loadVisitedPoints = async () => {
      const savedPoints = await AsyncStorage.getItem('visitedPoints');
      if (savedPoints) {
        setVisitedPoints(JSON.parse(savedPoints));
      }
    };
    loadVisitedPoints();
  }, []);

  const clearVisitedPoints = async () => {
    await AsyncStorage.removeItem('visitedPoints');
    setVisitedPoints([]);
    Alert.alert("Progress Cleared", "All visited points have been cleared.");
  };

  const shareProgress = async () => {
    const message = visitedPoints.length
      ? `I've visited these points: ${visitedPoints.join(', ')}`
      : "I haven't visited any points yet.";
    Share.share({ message });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Scavenger Hunt!</Text>
      <Button title="View Map" onPress={() => navigation.navigate('Map')} />
      <Text style={styles.subtitle}>Visited Points:</Text>
      <FlatList
        data={visitedPoints}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
      />
      <Button title="Clear Progress" onPress={clearVisitedPoints} />
      <Button title="Share Progress" onPress={shareProgress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  listItem: { fontSize: 14, marginVertical: 5 },
});

export default HomeScreen;
