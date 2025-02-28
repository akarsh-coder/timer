import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RootStackParamList = {
    MainTabs: undefined;
    AddTimer: undefined;
  };
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type Timer = {
    id: string;
    name: string;
    duration: number;
    remaining: number;
    category: string;
    status: 'running' | 'paused' | 'completed';
    historyId?: string;
  };
