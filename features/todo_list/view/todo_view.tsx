import { useEffect, useState } from "react"
import { FlatList, Pressable, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTodoViewModel } from "../view-models/todo_view_model"

export function TodoView () {

    const view_model = useTodoViewModel()
    const task_list = view_model.list

    const colors = {
        main: '#313533',
        segundary: '#575e5b',
        textWhite: 'white',
        textDark: '#344979',
        background: '#242725',
        done: 'green',
        notDone: '#575e5b'
    }
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState('')

    useEffect(()=>{
        if (loading){
            setTimeout(() => {
                setLoading(false)
            }, 100);
        }
    },[loading])

    const handleAddTask = () => {
        const addToList = view_model.addToList({ name: text, done: false })
        if (!addToList) alert('Nome para a tarefa curto ou invalido.')
        setText('')
        setLoading(true)
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
                    padding: 10,
                    width: '100%'
                }}
            >

                <Text style={{ fontSize: 20, textAlign: 'center', margin: 2, color: colors.textWhite }} >
                    To-Do
                </Text>

                <View style={{
                    flexDirection: 'row',
                    flexGrow: 1, gap: 10,
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
                            backgroundColor: colors.segundary, padding: 20, borderRadius: 50,
                            width: 20, height: 20,
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
                        <Pressable
                            style={{
                                flexDirection: 'row', alignItems: 'center',
                                gap: 10,
                                padding: 10, margin: 5,
                                borderRadius: 8,
                                minHeight: 50,
                                backgroundColor: colors.main,
                            }}
                            onPress={()=>{
                                view_model.setTaskAsDone(index)
                                setLoading(true)
                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: colors.textWhite,
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <View style={{
                                    width: 20, height: 20, borderRadius: 50,
                                    backgroundColor: item.done ? colors.done : colors.notDone,
                                }}
                                ></View>
                            </View>
                        </Pressable>
                    )}
                />
            </View>

        </SafeAreaView>
    )
}