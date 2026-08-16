import colors from "@/constants/colors"
import { useState } from "react"
import { FlatList, Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { TaskCardComponent } from "../components/task_card"
import { TextInputComponent } from "../components/text_input"
import { Task } from "../model/item_model"
import { useTodoViewModel } from "../view-models/todo_view_model"
import { EditTaskView } from "./edit_task_view"

export function TodoView () {

    const view_model = useTodoViewModel()
    const task_list = view_model.list
    const task_on_edit = view_model.editTask

    const [text, setText] = useState('')

    // Model-View handle
    const handleAddTask = () => {
        view_model.addToList(new Task(text, text, false))
        setText('')
    }
    const handleToggleDone = (index: number) => {
        view_model.setTaskAsDone(index)
    }
    const handleDeleteTask = async (taskName: string) => {
        await view_model.removeTask(taskName)
    }

    return (
        <SafeAreaView
            style={{
                position: 'relative',
                rowGap: 30,
                height: '100%', width: '100%',
                backgroundColor: colors.main,
                alignItems: 'center',
                paddingBottom: 10,
            }}
        >
            {/* Header */}
            <View
                style={{
                    alignItems: 'center', justifyContent: 'space-between',
                    width: '90%',
                    rowGap: 30,
                    paddingTop: 30,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    flexGrow: 1, gap: 10,
                    width: '100%'
                }} >

                    <TextInputComponent
                        placeholder="Task name..."
                        readValue={(value)=>{ setText(value) }}
                        setText={text}
                    />
                    
                    <Pressable
                        onPress={handleAddTask}
                        style={{
                            backgroundColor: colors.segundary, borderRadius: 50,
                            paddingLeft: 13, paddingRight: 13,
                            justifyContent: 'center', alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: colors.textWhite, fontSize: 20, paddingBottom: 5 }} >+</Text>
                    </Pressable>

                </View>

            </View>

            {/* LIST CONTENT */}
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
                    data={task_list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TaskCardComponent
                            id={item.name}
                            name={item.name}
                            done={item.done}
                            toggleDone={()=>{ handleToggleDone(index) }}
                            deleteTask={()=>{ handleDeleteTask(item.name) }}
                            editTask={()=>{ view_model.setTaskToEdit(item) }}
                        />
                    )}
                />
            </View>

            {/* EDIT TASK CONTENT */}
            { task_on_edit &&
                <EditTaskView
                    item={task_on_edit}
                    onClose={() => {
                        view_model.setEditTaskNull();
                    }}
                />
            }

        </SafeAreaView>
    )
}