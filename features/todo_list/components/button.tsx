import colors from "@/constants/colors";
import { Pressable, Text } from "react-native";

type IButton = {
    label: string,
    onPress: () => void,
}

export function Button(button: IButton) {
    return (
        <Pressable
            style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 2,
                margin: 2,
                backgroundColor: colors.main,
                width: 'auto',
                minHeight: 40,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onPress={button.onPress}
        >
            <Text
                style={{
                    color: colors.textWhite
                }}
            >
                {button.label}
            </Text>
        </Pressable>
    )
}