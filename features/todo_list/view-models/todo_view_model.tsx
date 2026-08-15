import { useEffect, useState } from "react"
import { TodoRepository } from "../repository/todo_repository"

type Item = {
    name: string
    done: boolean
}

export function useTodoViewModel () {

    const repository = TodoRepository()
    const [list, setList] = useState<Item[]>([])


    useEffect(()=>{
        loadTaks();
    },[])

    const loadTaks = async () => {
        const r = await repository.getTaks()
        setList(r)
    }


    const addToList = (item: Item) => {
        if (item.name == '' && item.name.length < 3) {
            return false
        }
        setList((prev) => [...prev, item])

        // save data
        repository.addTask(item)

        return true
    }

    const setTaskAsDone = (index: number) => {
        let upt = list;
        upt[index].done = true
        setList(upt)
    }

    const removeTask = async (taskName: string) => {
        const deleted = await repository.deleteTask(taskName)
    }

    return {
        list,
        addToList,
        setTaskAsDone,
        removeTask
    }
}