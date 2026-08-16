import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../model/item_model';

export function TodoRepository () {

    const STORAGE_KEY = '@tasks'

    const getTasks = async () => {
        const data = await AsyncStorage.getItem(STORAGE_KEY)

        if (!data) {
            return []
        }

        const tasks = JSON.parse(data).map(
            (task: Task) => new Task(
                task.id,
                task.name,
                task.done
            )
        )
        return tasks
    }

    const saveTasks = async (tasks: Array<Task>) => {
        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(tasks)
        )
    }

    const addTask = async (task: Task) => {
        const tasks = await getTasks()
        tasks.push(task)
        await saveTasks(tasks)
    }

    return {
        getTasks,
        addTask,
        saveTasks,
    }
}