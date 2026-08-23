import { useEffect, useState } from "react";

// data
import filterOpitons from '../data/filters_options.json';
// repository
import { TaskFiltersRepository } from '../repository/task_filters_repository';

export function useTaskFiltersViewModel () {

    const repository = TaskFiltersRepository()

    const allFiltersOptions = filterOpitons.map((item) => item.id)
    const [activedFilters, setActivedFilters] = useState<string[]>([])


    useEffect(()=>{
        LoadFilters()
    },[])


    const LoadFilters = async () => {
        const data = await repository.Load()
        if (data){
            setActivedFilters(data)
        }
    }

    const AddFilterToggle = (itemId: string) => {
        // remove
        if (activedFilters.includes(itemId)){
            const upt = activedFilters.filter((filterId) => filterId !== itemId)
            setActivedFilters(upt)
            SaveFilters(upt)
            return
        }
        // add
        const upt = [...activedFilters, itemId]
        setActivedFilters(upt)
        SaveFilters(upt)
    }

    const SaveFilters = (filters: Array<string>) => {
        repository.Save(filters)
    }

    return {
        activedFilters,
        AddFilterToggle
    }
}