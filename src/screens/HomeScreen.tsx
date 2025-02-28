import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationProps} from '../types';
import TimerContext from '../context/TimerContext';
import CompletedModal from '../components/CompletedModal';

export default function HomeScreen({
  navigation,
}: {
  navigation: NavigationProps;
}) {
  const {state, dispatch} = useContext(TimerContext);
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const startTimer = (id: string) => {
    const timer = state.timers.find(t => t.id === id);
    if (timer && timer.status !== 'running') {
      dispatch({type: 'UPDATE_TIMER', payload: {...timer, status: 'running'}});
    }
  };

  const pauseTimer = (id: string) => {
    const timer = state.timers.find(t => t.id === id);
    if (timer && timer.status === 'running') {
      dispatch({type: 'UPDATE_TIMER', payload: {...timer, status: 'paused'}});
    }
  };

  const resetTimer = (id: string) => {
    const timer = state.timers.find(t => t.id === id);
    if (timer) {
      dispatch({
        type: 'UPDATE_TIMER',
        payload: {...timer, remaining: timer.duration, status: 'paused'},
      });
    }
  };

  const startAllTimers = (category: string) => {
    const timersToStart = state.timers.filter(
      t => t.category === category && t.status !== 'running',
    );
    timersToStart.forEach(timer => {
      dispatch({type: 'UPDATE_TIMER', payload: {...timer, status: 'running'}});
    });
  };

  const pauseAllTimers = (category: string) => {
    const timersToPause = state.timers.filter(
      t => t.category === category && t.status === 'running',
    );
    timersToPause.forEach(timer => {
      dispatch({type: 'UPDATE_TIMER', payload: {...timer, status: 'paused'}});
    });
  };

  const resetAllTimers = (category: string) => {
    const timersToReset = state.timers.filter(t => t.category === category);
    timersToReset.forEach(timer => {
      dispatch({
        type: 'UPDATE_TIMER',
        payload: {...timer, remaining: timer.duration, status: 'paused'},
      });
    });
  };

  const groupedTimers = state.timers.reduce((acc, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {} as {[category: string]: typeof state.timers});

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({...prev, [category]: !prev[category]}));
  };

  return (
    <View style={styles.container}>
      <CompletedModal />
      {Object.keys(groupedTimers).length > 0 ? (
        <FlatList
          data={Object.keys(groupedTimers)}
          keyExtractor={item => item}
          renderItem={({item: category}) => (
            <View style={styles.categorySection}>
              <TouchableOpacity
                style={styles.categoryHeader}
                onPress={() => toggleCategory(category)}>
                <Text style={styles.categoryText}>{category}</Text>
                <AntDesign
                  name={expandedCategories[category] ? 'up' : 'down'}
                  size={20}
                  color="#ffffff"
                />
              </TouchableOpacity>

              {expandedCategories[category] && (
                <>
                  <View style={styles.categoryButtonsContainer}>
                    <TouchableOpacity
                      style={styles.categoryButton}
                      onPress={() => startAllTimers(category)}>
                      <MaterialIcons name="play-arrow" size={20} color="#000" />
                      <Text style={styles.buttonText}>Start All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.categoryButton}
                      onPress={() => pauseAllTimers(category)}>
                      <MaterialIcons name="pause" size={20} color="#000" />
                      <Text style={styles.buttonText}>Pause All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.categoryButton}
                      onPress={() => resetAllTimers(category)}>
                      <MaterialIcons
                        name="restart-alt"
                        size={20}
                        color="#000"
                      />
                      <Text style={styles.buttonText}>Reset All</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={groupedTimers[category]}
                    keyExtractor={timer => timer.id}
                    renderItem={({item}) => (
                      <View
                        style={[
                          styles.timerCard,
                          item.status === 'completed' && styles.completedCard,
                        ]}>
                        <Text style={styles.timerText}>{item.name}</Text>
                        <Text style={styles.timerTimeText}>
                          {item.remaining}s
                        </Text>

                        <View style={styles.progressBar}>
                          <View
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{
                              width: `${
                                (item.remaining / item.duration) * 100
                              }%`,
                              backgroundColor:
                                item.status === 'completed' ? 'gray' : 'white', // Change color when completed
                              height: 5,
                            }}
                          />
                        </View>

                        <View style={styles.buttonContainer}>
                          {item.status === 'completed' ? (
                            <Text style={styles.completedText}>
                              ✅ Completed
                            </Text>
                          ) : (
                            <>
                              {item.status !== 'running' && (
                                <TouchableOpacity
                                  style={styles.start}
                                  onPress={() => startTimer(item.id)}>
                                  <MaterialIcons
                                    name="play-arrow"
                                    size={30}
                                    color="#000000"
                                  />
                                </TouchableOpacity>
                              )}
                              {item.status === 'running' && (
                                <TouchableOpacity
                                  style={styles.start}
                                  onPress={() => pauseTimer(item.id)}>
                                  <MaterialIcons
                                    name="pause"
                                    size={30}
                                    color="#000000"
                                  />
                                </TouchableOpacity>
                              )}
                              <TouchableOpacity
                                style={styles.start}
                                onPress={() => resetTimer(item.id)}>
                                <MaterialIcons
                                  name="restart-alt"
                                  size={30}
                                  color="#000000"
                                />
                              </TouchableOpacity>
                            </>
                          )}
                        </View>
                      </View>
                    )}
                  />
                </>
              )}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noRunningTimers}>No running timers</Text>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTimer')}>
        <MaterialIcons name="add" size={30} color="#000000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#000'},
  categorySection: {marginBottom: 15},
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    padding: 10,
  },
  categoryText: {color: '#fff', fontSize: 16},
  timerCard: {
    backgroundColor: '#222222ba',
    padding: 15,
    marginVertical: 5,
  },
  timerText: {color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 5},
  timerTimeText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '200',
    marginBottom: 5,
  },
  progressBar: {
    width: '100%',
    height: 5,
    backgroundColor: '#555',
    borderRadius: 5,
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  start: {
    backgroundColor: '#ffffff',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRunningTimers: {
    color: '#aaa',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{translateX: -15}],
    backgroundColor: '#ffffff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#333',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  completedCard: {
    backgroundColor: '#444', // Darker gray to indicate completion
  },
  completedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'lightgreen',
    textAlign: 'center',
  },
});
