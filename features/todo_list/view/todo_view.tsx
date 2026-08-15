import colors from "@/constants/colors"
import { useState } from "react"
import { FlatList, Pressable, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { TaskCardComponent } from "../components/task_card"
import { Task } from "../model/item_model"
import { useTodoViewModel } from "../view-models/todo_view_model"

export function TodoView () {

    const view_model = useTodoViewModel()
    const task_list = view_model.list

    const [text, setText] = useState('')

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
                padding: 1,
                gap: 10,
                height: '100%', width: '100%',
                backgroundColor: colors.main,
                alignItems: 'center'
            }}
        >
            {/* Header */}
            <View
                style={{
                    alignItems: 'center', justifyContent: 'space-between',
                    padding: 5,
                    width: '100%'
                }}
            >

                <Text style={{ fontSize: 20, textAlign: 'center', color: colors.textWhite }} >
                    To-Do
                </Text>

                <View style={{
                    flexDirection: 'row',
                    flexGrow: 1, gap: 5,
                    width: '100%'
                }} >

                    <TextInput
                        style={{
                            padding: 10, margin: 'auto',
                            borderRadius: 10, borderWidth: 0,
                            width: '95%',
                            backgroundColor: colors.background, outlineColor: colors.background, outlineWidth: 0, outlineOffset: 0,
                            color: colors.textWhite
                        }}
                        placeholder="Task..."
                        onChangeText={(value) => setText(value)}
                        value={text}
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
                        />
                    )}
                />
            </View>

        </SafeAreaView>
    )
}