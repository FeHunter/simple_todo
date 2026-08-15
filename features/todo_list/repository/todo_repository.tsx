import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../model/item_model';

export function TodoRepository () {

    const STORAGE_KEY = '@tasks'

    const getTaks = async () => {
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

    const deleteTask = async (taskName: string) => {
        const data = await AsyncStorage.getItem(STORAGE_KEY)

        if (!data) {
            return
        }

        const tasks = JSON.parse(data)

        const updatedTasks = tasks.filter(
            (task: { name: string }) => task.name !== taskName
        )

        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updatedTasks)
        )

        return true // ok
    }

    const addTask = async (task: Task) => {
        const tasks = await getTaks()
        tasks.push(task)

        await saveTasks(tasks)
    }

    return {
        getTaks,
        addTask,
        deleteTask
    }
}