import React from 'react';
import { View, StyleSheet } from 'react-native';
import Main_Navigation from '../screen/navigations/Main_Navigation'; 

function Index(): JSX.Element {
  return (
    <View style={styles.container}>
      <Main_Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default Index;
