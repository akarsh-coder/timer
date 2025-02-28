import HomeScreen from '../screens/HomeScreen';
import History from '../screens/History';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface TimerIconProps {
  color: string;
  size: number;
}
const TimerIcon = ({color, size}: TimerIconProps) => (
  <MaterialIcons name="timer" size={size} color={color} />
);
const HistoryIcon = ({color, size}: TimerIconProps) => (
    <MaterialIcons name="history" size={size} color={color} />
  );
  
export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#ffffff',
        headerStyle: {backgroundColor: '#000000'},
        tabBarStyle: {backgroundColor: '#000000', paddingBottom: 5},
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
      }}>
      <Tab.Screen
        name="Timers"
        component={HomeScreen}
        options={{
          tabBarIcon: TimerIcon,
          headerTitle: 'My Timers',
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: HistoryIcon,
          headerTitle: 'History',
        }}
      />
    </Tab.Navigator>
  );
}
