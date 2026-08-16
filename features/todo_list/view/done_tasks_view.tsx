import colors from "@/constants/colors";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompletedTaskCard } from "../components/completed_task_card";
import { Task } from "../model/item_model";
import { TasksDoneViewModel } from "../view-models/tasks_done_view_model";

export function DoneTasksView () {

    const view_model = TasksDoneViewModel()
    const doneTasks = view_model.list;

    // Fixing state error
    const [completedTasks, setCompletedTasks] = useState<Task[]>([])
    useEffect(()=>{
        get()
    },[doneTasks])
    const get = () => {
        setCompletedTasks(doneTasks)
    }
    
    return (
        <SafeAreaView
            style={{
                backgroundColor: colors.main,
                width: '100%', height: '100%',
                alignItems: 'center',
                paddingBottom: 10,
            }}
        >
            <View
                style={{
                    flex: 1,
                    borderTopLeftRadius: 10, borderTopRightRadius: 10,
                    paddingTop: 20,
                    paddingLeft: 10, paddingRight: 10,
                    backgroundColor: colors.background,
                    width: '95%'
                }}
            >
                <FlatList
                    data={completedTasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <CompletedTaskCard
                            id={item.name}
                            name={item.name}
                            done={item.done}
                            toggleDone={()=>{ }}
                            deleteTask={()=>{ }}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    )
}