import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function History(){
  return (
    <View style={styles.container}>
      <Text style={styles.text}>History</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});