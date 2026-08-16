import { useEffect, useState } from "react"
import { Task } from "../model/item_model"
import { TodoRepository } from "../repository/todo_repository"


export function useTodoViewModel () {

    const repository = TodoRepository()
    
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState<Task[]>([])
    const [editTask, setEditTask] = useState<Task>()


    useEffect(()=>{
        loadTaks();
    },[])
    useEffect(()=>{
        if (loading){
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    },[loading])


    const loadTaks = async () => {
        const r = await repository.getTaks()
        setList(r)
    }

    const addToList = (item: Task) => {
        
        setLoading(true) // start loading

        if (item.name == '' && item.name.length < 3) {
            alert('Task name is too short or invalid, try again.')
            return
        }
        setList((prev) => [...prev, item])

        // save data
        repository.addTask(item)

        alert(`${item.name} was added to the list.`)
    }

    const setTaskAsDone = (index: number) => {
        
        setLoading(true) // start loading

        let upt = list;
        upt[index].done = !upt[index].done
        setList(upt)

        repository.saveTasks(upt)
    }

    const removeTask = async (taskName: string) => {
        
        setLoading(true) // start loading

        const deleted = await repository.deleteTask(taskName)
        if (deleted === true){
            alert(`${taskName} was removed from the list.`)
            loadTaks();
            return
        }
        alert(`Something went wrong, try again.`)
    }

    const setTaskToEdit = (task: Task) => {
        setEditTask(task)
        console.log('Task to edit: ', task)
    }
    const setEditTaskNull = () => {
        setEditTask(undefined)
    }

    return {
        loading,
        list,
        editTask,
        addToList,
        setTaskAsDone,
        removeTask,
        setTaskToEdit,
        setEditTaskNull
    }
}