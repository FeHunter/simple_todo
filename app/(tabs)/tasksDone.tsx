import { DoneTasksView } from '@/features/todo_list/view/done_tasks_view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function tasksDone() {
  return (
    <SafeAreaProvider>
        <DoneTasksView />
    </SafeAreaProvider>
  );
}