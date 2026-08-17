import colors from "@/constants/colors";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";

type ITextInput = {
    placeholder: string,
    readValue: (value: string) => void,
    setText: string,
    onSubmit: (value: string) => void
}

export function TextInputComponent ( input: ITextInput ) {

    const [text, setText] = useState(input.setText || '')

    useEffect(()=>{
        readValueText()
    },[text])
    useEffect(()=>{
        if (input.setText == '') setText(input.setText)
    },[input.setText])

    const readValueText = () => {
        input.readValue(text)
    }

    return (
        <TextInput
            style={{
                maxHeight: 40,
                padding: 10,
                borderRadius: 10, borderWidth: 0,
                flexGrow: 1,
                backgroundColor: colors.background, outlineColor: colors.background,
                color: colors.textWhite,
            }}
            placeholder={input.placeholder}
            onChangeText={(value) => setText(value)}
            value={text}
            returnKeyType="done"
            onSubmitEditing={()=>{
                input.onSubmit(text)
                setText('')
            }}
        />
    )
}