import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TimerContext from '../context/TimerContext';

const HistoryScreen = () => {
  const { state } = useContext(TimerContext);

  return (
    <View style={styles.container}>
      {state.history.length === 0 ? (
        <Text style={styles.emptyText}>No completed timers yet!</Text>
      ) : (
        <FlatList
          data={state.history}
          keyExtractor={(item,index) => item.id + index}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.timerName}>{item.name}</Text>
              <Text style={styles.timerDetails}>
                ⏱ Set Time: {item.duration} sec
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  historyItem: {
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  timerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  timerDetails: {
    fontSize: 14,
    color: '#bbb',
  },
});

export default HistoryScreen;
