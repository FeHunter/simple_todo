import AsyncStorage from "@react-native-async-storage/async-storage";

export function TaskFiltersRepository () {

    const STORAGEKEY = "@task_filters";

    const Load = async () => {

        const data = await AsyncStorage.getItem(STORAGEKEY)

        if (!data) return

        const filters = JSON.parse(data)

        return filters
    }

    const Save = async (filters: Array<string>) => {
        await AsyncStorage.setItem(
            STORAGEKEY,
            JSON.stringify(filters)
        )
    }

    return {
        Load,
        Save
    }
}