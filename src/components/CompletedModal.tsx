import React, { useContext, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import TimerContext from '../context/TimerContext';

const CompletedModal = () => {
  const { completedTimer, setCompletedTimer } = useContext(TimerContext);


  useEffect(() => {
    return () => {
      setCompletedTimer(null);
    };
  }, [setCompletedTimer]);

  return (
    <Modal
      visible={!!completedTimer} 
      transparent
      animationType="fade"
      onRequestClose={() => setCompletedTimer(null)} 
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Timer {completedTimer?.name} Completed!</Text>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => setCompletedTimer(null)}
            accessible={true}
            accessibilityLabel="Done"
            accessibilityRole="button"
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 320,
    padding: 24,
    backgroundColor: '#111',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
});

export default CompletedModal;