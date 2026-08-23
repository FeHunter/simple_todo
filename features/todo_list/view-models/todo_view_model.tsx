import { useEffect, useState } from "react"
import { Task } from "../model/item_model"

// repository
import { TodoRepository } from "../repository/todo_repository"
// services
import { TodoFiltersService } from "../services/todo_filters_service"


export function useTodoViewModel () {

    const repository = TodoRepository()

    const services = TodoFiltersService()
    
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState<Task[]>([])
    const [filteredList, setFilteredList] = useState<Task[]>([])
    const [listCompletedTasks, setListCompletedTasks] = useState<Task[]>([])
    const [editTask, setEditTask] = useState<Task>()


    useEffect(()=>{
        loadTaks();
    },[])
    useEffect(()=>{
        if (loading){
            setTimeout(() => {
                setLoading(false)
            }, 200);
        }

        // Apply filter to task list
        applyFilters();

    },[loading])

    
    const applyFilters = async () => {
        const filtered_list = await services.ApplyFilters(list)
        if (filtered_list.length > 0) {
            setFilteredList(filtered_list)
            setLoading(true)
        }else {
            loadTaks()
        }
    }
    
    const loadTaks = async () => {
        try {
            const r = await repository.getTasks()
            setList(r)
        }finally {
            setLoading(true)
        }
    }

    const addToList = (taskName: string) => {
        try {
            if (taskName == '' && taskName.length < 3) {
                alert('Task name is too short or invalid, try again.')
                return
            }

            // create task item
            const now = new Date().getMilliseconds().toString();
            const item_id = `${taskName}_${now}`
            const item = new Task(item_id, taskName, false)

            setList((prev) => [...prev, item])

            // save data
            repository.addTask(item)

            alert(`${item.name} was added to the list.`)
        }catch (err: Error | any) {
            alert('Something went wrong, try again.')
        }finally {
            setLoading(true) // start loading
        }
    }

    const setTaskAsDone = async (index: number) => {
        try {
            let upt = list;
            upt[index].done = !upt[index].done
            await repository.saveTasks(upt)
            setList(upt)
        }finally {
            setLoading(true) // start loading
        }
    }

    const removeTask = async (taskID: string) => {
        try {
            const upt_list = list.filter((item : Task) => item.id != taskID)
            await repository.saveTasks(upt_list)
            setList(upt_list)

        }finally {
            setLoading(true) // start loading
        }
    }

    const setTaskToEdit = (task: Task | undefined) => {
        if (task) setEditTask(task)
    }

    const setEditTaskNull = () => {
        setEditTask(undefined)
    }

    const SaveEditedTask = async (task: Task) => {

        let upt_list = list
        const index = upt_list.findIndex((item: Task) => item.id == task.id)

        if (index !== -1){
            upt_list[index] = task
            try {
                await repository.saveTasks(upt_list)
                setList(upt_list)
            }finally {
                setLoading(true)
            }
        }else {
            alert('Task not found, delete it and try again.')
        }
    }

    const getTasksCompleted = async () => {
        const filtered = services.GetCompletedTasksFilter(list)
        setListCompletedTasks(filtered)
        console.log('get completed tasks')
    }

    return {
        loading,
        list,
        filteredList,
        listCompletedTasks,
        editTask,
        addToList,
        setTaskAsDone,
        removeTask,
        setTaskToEdit,
        setEditTaskNull,
        SaveEditedTask,
        getTasksCompleted,
    }
}