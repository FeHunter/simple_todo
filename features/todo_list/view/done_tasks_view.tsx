import colors from "@/constants/colors";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CompletedTaskCard } from "../components/completed_task_card";
import { useTodoViewModel } from "../view-models/todo_view_model";

export function DoneTasksView () {

    const view_model = useTodoViewModel()
    const doneTasks = view_model.listCompletedTasks;

    // Reload on tab focus
    useFocusEffect (
        useCallback(()=>{
            view_model.getTasksCompleted()
        }, [])
    )


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
                { (!view_model.loading && doneTasks) &&
                    <FlatList
                        data={doneTasks}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <CompletedTaskCard
                                id={item.id}
                                name={item.name}
                                done={item.done}
                            />
                        )}
                    />
                }
            </View>
        </SafeAreaView>
    )
}