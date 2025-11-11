import { ComponentProps, memo } from "react";
import { Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

export const LabelStreaks = memo(({ title, nameIcon }: { title: string, nameIcon: MaterialIconName }) => {
    return (
        <View className="flex flex-row items-center gap-2">
            <MaterialIcons name={nameIcon} size={24} color="#3b82f6" />
            <Text className="text-gray-500">
                {title}
            </Text>
        </View>
    );
});

LabelStreaks.displayName = "LabelStreaks";