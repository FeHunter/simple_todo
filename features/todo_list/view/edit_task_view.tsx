import colors from "@/constants/colors";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/button";
import { TextInputComponent } from "../components/text_input";
import { Task } from "../model/item_model";

type IEditTaskView = {
    item: Task,
    onClose: ()=>void,
    saveEdition: (item: Task)=>void,
}

export function EditTaskView ( edit: IEditTaskView ) {

    const [text, setText] = useState( edit?.item.name || '')

    const handleSaveEdition = () => {
        edit.saveEdition(new Task( edit.item.id, text, edit.item.done ))
        edit.onClose()
    }
    const handleCancelEdit = () => {
        edit.onClose()
    }

    return (
        <SafeAreaView
            style={{
                position: 'absolute',
                backgroundColor: colors.background,
                width: '100%', height: '100%',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    backgroundColor: colors.background,
                    justifyContent: 'center', alignContent: 'center',
                    width: '100%', height: '100%',
                    flexGrow: 1,
                }}
            >
                <View
                    style={{
                        width: '90%',
                        padding: 10, margin: 'auto',
                        justifyContent: 'space-evenly',
                        backgroundColor: colors.segundary,
                        gap: 30,
                        borderRadius: 10,
                    }}
                >
                    <Text style={{
                        color: colors.textWhite,
                        fontSize: 20, textAlign: "center",
                    }}> Edit task: {`\n ${edit?.item.name}`}</Text>

                    <TextInputComponent
                        placeholder={`new task name...`}
                        readValue={(value: string)=>{ setText(value) }}
                        setText={text}
                    />
                    
                    <Button
                        label="Update task"
                        onPress={()=> handleSaveEdition() }
                    />
                    <Button
                        label="Cancel"
                        onPress={()=> handleCancelEdit() }
                    />
                    
                </View>

            </View>
        </SafeAreaView>
    )
}