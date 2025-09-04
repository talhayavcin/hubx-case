import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyGardenScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Garden Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Rubik-Bold',
  },  
});

export default MyGardenScreen;