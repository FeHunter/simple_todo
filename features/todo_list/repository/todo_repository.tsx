import AsyncStorage from '@react-native-async-storage/async-storage';

type Item = {
    name: string
    done: boolean
}

export function TodoRepository () {

    const STORAGE_KEY = '@tasks'

    const getTaks = async () => {
        const data = await AsyncStorage.getItem(STORAGE_KEY)

        if (!data) {
            return []
        }

        return JSON.parse(data)
    }

    const saveTasks = async (tasks: Array<Item>) => {
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
    }

    const addTask = async (task: object) => {
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