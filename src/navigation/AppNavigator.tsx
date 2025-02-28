import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import History from '../screens/History';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Timers" component={HomeScreen} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    );
  }
