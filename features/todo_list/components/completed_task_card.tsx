import colors from "@/constants/colors";
import { Text, View } from "react-native";
import { Task } from "../model/item_model";

export function CompletedTaskCard ( item: Task ) {
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
            <Text
                style={{
                    fontSize: 14,
                    color: colors.textWhite,
                    wordWrap: 'wrap',
                }}
            >
                {item.name}
            </Text>
        </View>
    )
}