import colors from "@/constants/colors"
import { Ionicons } from "@expo/vector-icons"
import type { ComponentProps } from "react"
import { Pressable, Text, View } from "react-native"

type IButtonFilter = {
    iconType: ComponentProps<typeof Ionicons>["name"],
    id: string,
    label?: string,
    actived: boolean,
    onPress: ()=>void
}

export function ButtonFilter ( button : IButtonFilter ) {

    return (
        <Pressable
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 3, paddingLeft: 20, paddingRight: 20,
                minHeight: 50,
                backgroundColor: colors.segundary,
                borderRadius: 10,
            }}
            onPress={button.onPress}
        >
            <View style={{
                flexDirection: 'row', gap: 10,
                alignItems: 'center',
            }}>
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
            </View>
            <View>
                { button.actived
                    && <Ionicons
                        name="eye"
                        size={24}
                        color={colors.textWhite}
                    />
                    || <Ionicons
                        name="eye-off"
                        size={24}
                        color={colors.background}
                    />
                }
                
            </View>
        </Pressable>
    )
}