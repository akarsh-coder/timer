import * as React from 'react';
import AppStackNavigator from './src/navigation/AppNavigator';
import { TimerProvider } from './src/context/TimerContext';

export default function App() {
  return (
    <TimerProvider>
      <AppStackNavigator />
    </TimerProvider>
  );
}
