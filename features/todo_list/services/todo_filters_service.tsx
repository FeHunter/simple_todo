
// repository
import { Task } from "../model/item_model"
import { TodoFiltersRepository } from "../repository/todo_filters_repository"

export function TodoFiltersService () {

    const repository = TodoFiltersRepository()

    const LoadFilters = async () => {
        const data = await repository.Load()
        if (data){
            return data
        }
        return null
    }

    const ApplyFilters = async (list: Array<Task> ) => {
        const filters = await LoadFilters();
        let filtered_list: Task[] = []
        if (filters.includes('completed')) {
            filtered_list = CompletedFilter(list)
        }
        else if (filters.includes('pending')){
            filtered_list = PendingFilter(list)
        } 
        return filtered_list
    }

    const GetCompletedTasksFilter = (list: Array<Task>) => {
        const completed_tasks = CompletedFilter(list)
        return completed_tasks
    }


    // Filters
    const CompletedFilter = (list: Array<Task>) => {
        const filtered = list.filter((item: Task) => item.done == true)
        return filtered
    }
    const PendingFilter = (list: Array<Task>) => {
        const filtered = list.filter((item: Task) => item.done != true)
        return filtered
    }

    return {
        ApplyFilters,
        GetCompletedTasksFilter
    }

}