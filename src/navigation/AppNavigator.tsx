import HomeScreen from '../screens/HomeScreen';
import History from '../screens/History';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import AddTimer from '../screens/AddTimer';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
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

function AppNavigator() {
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
          headerTitle: 'Timers',
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: HistoryIcon,
          headerTitle: 'Timer History',
        }}
      />
    </Tab.Navigator>
  );
}
export default function AppStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={AppNavigator} />
        <Stack.Screen name="AddTimer" component={AddTimer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}