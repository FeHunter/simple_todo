import colors from "@/constants/colors"
import { Ionicons } from "@expo/vector-icons"
import { Pressable, Text } from "react-native"

type IButtonFilter = {
    iconType: 'checkmark-done' | 'calendar-clear',
    label?: string,
    onPress: ()=>void
}

export function ButtonFilter ( button : IButtonFilter ) {
    return (
        <Pressable
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                margin: 3, paddingLeft: 20,
                minHeight: 50,
                backgroundColor: colors.segundary,
                borderRadius: 10,
            }}
            onPress={button.onPress}
        >
            <Ionicons
                name={button.iconType}
                size={24}
                color={colors.textWhite}
            />
            { button.label &&
                <Text style={{
                    color: colors.textWhite
                }}>{button.label}</Text>
            }
        </Pressable>
    )
}