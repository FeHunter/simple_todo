import AsyncStorage from "@react-native-async-storage/async-storage";

export function TodoFiltersRepository () {

    const STORAGEKEY = "@task_filters";

    const Load = async () => {

        const data = await AsyncStorage.getItem(STORAGEKEY)

        if (!data) return

        const filters = JSON.parse(data)

        return filters
    }

    const DeleteAll = async () => {
        AsyncStorage.removeItem(STORAGEKEY)
    }

    return {
        Load,
    }
}