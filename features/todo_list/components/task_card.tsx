import colors from "@/constants/colors";
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from "react-native";
import { Task } from "../model/item_model";

export function TaskCardComponent ( item : Task ) {

    const _btnStyle = {
        size: 30
    }

    const handleToggleIsDone = () => {
        item.toggleDone()
    }
    const handleEditTask = () => {
        item.editTask(item)
    }
    const handleDeleteTask = () => {
        item.deleteTask()
    }

    return (
        <View
            style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                gap: 10,
                padding: 10, margin: 2,
                borderRadius: 8,
                backgroundColor: colors.main,
                maxHeight: 100,
            }}
        >
            
            {/* Task name + Edit button */}
            <Pressable
                style={{
                    width: '85%', height: '100%',
                    maxHeight: 80,
                }}
                onPress={handleEditTask}
            >
                <Text
                    style={{
                        fontSize: 14,
                        color: colors.textWhite,
                        wordWrap: 'wrap',
                        width: '85%', height: '100%',
                        textAlignVertical: 'center',
                    }}
                >
                    {item.name}
                </Text>
            </Pressable>

            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between', gap: 5,
                    height: '100%',
                }}
            >
                {/* Toggle Done */}
                <Pressable onPress={handleToggleIsDone} >
                    <View style={{
                        width: _btnStyle.size, height: _btnStyle.size, borderRadius: 50,
                    }}
                    >
                        <Ionicons
                            name="checkmark-circle-sharp"
                            size={_btnStyle.size}
                            color={item.done ? colors.done : colors.notDone}
                        />
                    </View>
                </Pressable>
                {/* Delete Task */}
                <Pressable onPress={handleDeleteTask} >
                    <View style={{
                        width: _btnStyle.size, height: _btnStyle.size,
                        justifyContent: 'center'
                    }}
                    >
                        <Text style={{
                            textAlign: 'center',
                        }}
                        >
                            <Ionicons
                                name="trash-outline"
                                size={_btnStyle.size}
                                color={colors.textWhite}
                            />
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}