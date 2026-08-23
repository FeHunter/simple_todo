import { TaskFiltersView } from '@/features/task_filters/view/task_filters_view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function tasksDone() {
  return (
    <SafeAreaProvider>
        <TaskFiltersView />
    </SafeAreaProvider>
  );
}