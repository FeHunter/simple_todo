import { TodoView } from '@/features/todo_list/view/todo_view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <TodoView/>
    </SafeAreaProvider>
  );
}