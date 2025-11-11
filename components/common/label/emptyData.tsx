import { MaterialIcons } from "@expo/vector-icons";
import { memo } from "react";
import { Text, View } from "react-native";
import type { MaterialIconName } from "@/components/common/label/streaks";

export const EmptyData = memo(({ title, nameIcon }: { title: string; nameIcon: MaterialIconName }) => {
    return (
        <View className="py-6">
            <View className="flex-col items-center justify-center gap-2">
                <MaterialIcons name={nameIcon} size={24 * 1.5} color="#3b82f6" />
                <Text className="text-gray-500">
                    {title}
                </Text>
            </View>
        </View>
    );
});

EmptyData.displayName = "EmptyData";