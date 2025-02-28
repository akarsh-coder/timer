import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Timer } from '../types';

type TimerState = {
  timers: Timer[];
  history: Timer[];
};

type TimerAction =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'UPDATE_TIMER'; payload: Timer }
  | { type: 'REMOVE_TIMER'; payload: string }
  | { type: 'TICK' }
  | { type: 'INIT_TIMERS'; payload: Timer[] }
  | { type: 'INIT_HISTORY'; payload: Timer[] }
  | { type: 'ADD_TO_HISTORY'; payload: Timer };

const initialState: TimerState = { timers: [], history: [] };

const TimerContext = createContext<{
  state: TimerState;
  dispatch: React.Dispatch<TimerAction>;
  completedTimer: Timer | null;
  setCompletedTimer: (timer: Timer | null) => void;
}>({
  state: initialState,
  dispatch: () => {},
  completedTimer: null,
  setCompletedTimer: () => {},
});

const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case 'INIT_TIMERS':
      return {
        ...state,
        timers: action.payload,
      };
    case 'INIT_HISTORY':
      return {
        ...state,
        history: action.payload,
      };
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [action.payload, ...state.timers],
      };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id ? action.payload : timer,
        ),
      };
    case 'REMOVE_TIMER':
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.payload),
      };
    case 'TICK':
      return {
        ...state,
        timers: state.timers.map(timer => {
          if (timer.status === 'running' && timer.remaining > 0) {
            return { ...timer, remaining: timer.remaining - 1 };
          }
          if (timer.status === 'running' && timer.remaining === 0) {
            return { ...timer, status: 'completed' };
          }
          return timer;
        }),
      };
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        history: [{ ...action.payload, historyId: Date.now().toString() }, ...state.history],
      };
    default:
      return state;
  }
};

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const [completedTimer, setCompletedTimer] = useState<Timer | null>(null);
  const lastCompletedTimerId = useRef<string | null>(null);

  useEffect(() => {
    const loadTimers = async () => {
      try {
        const savedTimers = await AsyncStorage.getItem('timers');
        const savedHistory = await AsyncStorage.getItem('history');
        if (savedTimers) {
          dispatch({ type: 'INIT_TIMERS', payload: JSON.parse(savedTimers) });
        }
        if (savedHistory) {
          const historyWithIds = JSON.parse(savedHistory).map((item: Timer) => ({
            ...item,
            historyId: item.historyId || Date.now().toString(),
          }));
          dispatch({ type: 'INIT_HISTORY', payload: historyWithIds });
        }
      } catch (error) {
        console.error('Failed to load timers:', error);
      }
    };
    loadTimers();
  }, []);

  useEffect(() => {
    const saveTimers = async () => {
      try {
        await AsyncStorage.setItem('timers', JSON.stringify(state.timers ?? []));
        await AsyncStorage.setItem('history', JSON.stringify(state.history ?? []));
      } catch (error) {
        console.error('Failed to save timers:', error);
      }
    };
    saveTimers();
  }, [state.timers, state.history]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const completed = state.timers.find(
      timer => timer.status === 'completed' && timer.remaining === 0,
    );

    if (completed && completed.id !== lastCompletedTimerId.current) {
      setCompletedTimer(completed);
      dispatch({ type: 'ADD_TO_HISTORY', payload: { ...completed, historyId: Date.now().toString() } });
      lastCompletedTimerId.current = completed.id;
    }

    if (!completed) {
      lastCompletedTimerId.current = null;
    }
  }, [state.timers]);

  const contextValue = useMemo(
    () => ({ state, dispatch, completedTimer, setCompletedTimer }),
    [state, completedTimer],
  );

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
