import { useState } from "react"
import { FlatList, Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import colors from "@/constants/colors"
import { TaskCardComponent } from "../components/task_card"
import { TextInputComponent } from "../components/text_input"
// model
import { Task } from "../model/item_model"
// view
import { EditTaskView } from "./edit_task_view"
// viewModel
import { TaskFilterButtonView } from "@/features/task_filters/view/task_filter_btn_view"
import { useTodoViewModel } from "../view-models/todo_view_model"


export function TodoView () {

    const view_model = useTodoViewModel()
    const task_list = view_model.filteredList || view_model.list
    const task_on_edit = view_model.editTask

    const [text, setText] = useState('')
    
    // Model-View handle
    const handleAddTask = () => {
        view_model.addToList(text)
        setText('')
    }
    const handleToggleDone = (index: number) => {
        view_model.setTaskAsDone(index)
    }
    const handleDeleteTask = async (taskID: string) => {
        await view_model.removeTask(taskID)
    }
    const handleEditTask = async ( item: Task ) => {
       view_model.setTaskToEdit(item)
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
                    zIndex: 1,
                    width: '90%',
                    rowGap: 30,
                    paddingTop: 10,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1, gap: 20,
                    width: '100%',
                }} >

                    <TextInputComponent
                        placeholder="Task name..."
                        readValue={(value)=>{ setText(value) }}
                        setText={text}
                        onSubmit={(value) => {
                            setText(value)
                            handleAddTask()
                        }}
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

                    {/* Filters */}
                    <TaskFilterButtonView />

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
                            item={item}
                            toggleDone={()=>{ handleToggleDone(index) }}
                            deleteTask={()=>{ handleDeleteTask(item.id) }}
                            editTask={()=>{ handleEditTask(item) }}
                        />
                    )}
                />
            </View>

            {/* EDIT TASK CONTENT */}
            { task_on_edit &&
                <EditTaskView
                    item={task_on_edit}
                    saveEdition={(editedItem) => {
                        view_model.SaveEditedTask(editedItem)
                    }}
                    onClose={() => {
                        view_model.setEditTaskNull();
                    }}
                />
            }

        </SafeAreaView>
    )
}