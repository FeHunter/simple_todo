import { useEffect, useState } from "react"
import { Task } from "../model/item_model"
import { TodoRepository } from "../repository/todo_repository"


export function useTodoViewModel () {

    const repository = TodoRepository()
    
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState<Task[]>([])
    const [listCompletedTasks, setlistCompletedTasks] = useState<Task[]>([])
    const [editTask, setEditTask] = useState<Task>()


    useEffect(()=>{
        loadTaks();
        getTasksCompleted();
    },[])
    useEffect(()=>{
        if (loading){
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    },[loading])
    useEffect(()=>{
        getTasksCompleted()
    },[loading, list])


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

    const setTaskToEdit = (task: Task) => {
        setEditTask(task)
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

    const getTasksCompleted = () => {
        const completed_tasks = list.filter((item) => item.done == true)
        setlistCompletedTasks(completed_tasks)
    }

    return {
        loading,
        list,
        listCompletedTasks,
        editTask,
        addToList,
        setTaskAsDone,
        removeTask,
        setTaskToEdit,
        setEditTaskNull,
        SaveEditedTask,
    }
}