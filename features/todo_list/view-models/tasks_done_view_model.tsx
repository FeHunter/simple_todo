import { useEffect, useState } from "react";
import { Task } from "../model/item_model";
import { TodoRepository } from "../repository/todo_repository";

export function TasksDoneViewModel () {

    const repository = TodoRepository()

    const [list, setList] = useState<Task[]>([])

    useEffect(()=>{
        loadCompletedTasks()
    },[])

    const loadCompletedTasks = async () => {
        const res_data = await repository.getTaks()
        setList(res_data)
    }

    return {
        list,
    }
}