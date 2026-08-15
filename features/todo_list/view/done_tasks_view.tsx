import colors from "@/constants/colors";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TaskCardComponent } from "../components/task_card";
import { TasksDoneViewModel } from "../view-models/tasks_done_view_model";

export function DoneTasksView () {

    const view_model = TasksDoneViewModel()
    const doneTasks = view_model.list;

    console.log('on view: ', doneTasks)
    
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
                    data={doneTasks.filter((item : {done: boolean}) => item.done == true)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TaskCardComponent
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