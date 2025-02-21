import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const First_page = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Navigate to the second page after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Second');
    }, 3000); // 3 seconds delay

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Smaller image */}
        <ImageBackground 
          source={require('../assets/images/shoping.jpg')} // Path to your image
          style={styles.background}
        />

        {/* Beautiful "ONLINE SHOPPING" text */}
        <Text style={styles.title}>ONLINE SHOPPING</Text>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Second')}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center', // Center items vertically
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 40,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  background: {
    width: 200, // Smaller image width
    height: 200, // Smaller image height
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28, // Large text size
    fontWeight: 'bold',
    color: '#007BFF', // Blue color for style
    marginVertical: 20, // Space between image and text
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20, // Space between text and button
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default First_page;
