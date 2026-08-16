import colors from "@/constants/colors";
import { Pressable, Text, View } from "react-native";
import { Task } from "../model/item_model";

export function TaskCardComponent ( item : Task ) {
    return (
        <View
            style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                gap: 10,
                padding: 10, margin: 5,
                borderRadius: 8,
                minHeight: 80,
                backgroundColor: colors.main,
            }}
        >
            
            {/* Task name + Edit button */}
            <Pressable
                style={{
                    width: '85%', height: '100%',
                }}
                onPress={()=>{
                    item.editTask()
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        color: colors.textWhite,
                        wordWrap: 'wrap',
                        width: '85%', height: '100%',
                        alignContent: 'center',
                    }}
                >
                    {item.name}
                </Text>
            </Pressable>

            <View
                style={{
                    flexDirection: 'column',
                    gap: 10
                }}
            >
                {/* Toggle Done */}
                <Pressable onPress={item.toggleDone} >
                    <View style={{
                        width: 20, height: 20, borderRadius: 50,
                        backgroundColor: item.done ? colors.done : colors.notDone,
                    }}
                    ></View>
                </Pressable>
                {/* Delete Task */}
                <Pressable onPress={item.deleteTask} >
                    <View style={{
                        width: 20, height: 20, borderRadius: 2,
                        backgroundColor: colors.notDone
                    }}
                    >
                        <Text
                            style={{ textAlign: 'center' }}
                        >X</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}