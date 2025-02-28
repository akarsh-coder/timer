import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {NavigationProps, Timer} from '../types';
import TimerContext from '../context/TimerContext';
import uuid from 'react-native-uuid';
export default function AddTimer({navigation}: {navigation: NavigationProps}) {
  const {dispatch} = useContext(TimerContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const handleAddTimer = () => {
    const parsedDuration = parseInt(duration, 10);

    if (!name || isNaN(parsedDuration) || parsedDuration <= 0 || !category) {
      Alert.alert(
        'Invalid Input',
        'Please enter a valid name, category, and duration.',
      );
      return;
    }
    const newTimer: Timer = {
      id: uuid.v4(),
      name,
      category,
      duration: parsedDuration,
      remaining: parsedDuration,
      status: 'paused',
    };
    dispatch({type: 'ADD_TIMER', payload: newTimer});
    navigation.goBack();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>Add New Timer</Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Duration (seconds)"
            placeholderTextColor="#aaa"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Category"
            placeholderTextColor="#aaa"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddTimer}>
              <Text style={styles.addButtonText}>Add Timer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  cancelButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  addButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
