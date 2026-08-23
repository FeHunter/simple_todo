import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

export function TaskFilterButtonView ( ) {

    const handleGoToFilterView = () => {
        router.push("/(tabs)/filters")
    }

    return (
        <View style={{
        }}>

            <Pressable
                style={{
                    justifyContent: 'center', alignItems: 'center',
                    padding: 1,
                }}
                onPress={handleGoToFilterView}
            >
                <Ionicons
                    name="funnel-sharp"
                    size={35}
                    color={colors.segundary}
                />
            </Pressable>

        </View>
    )
}