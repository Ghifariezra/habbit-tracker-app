import { memo } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HabbitsCardProps } from "@/types/habbits";

export const HabbitsCard = memo(({ habbits, completed }: HabbitsCardProps) => {

    return (
        <View className="flex gap-4 p-5">
            {completed ? (
                <View className="flex flex-row items-center justify-between">
                    {/* Title & Description */}
                    <View className="mb-3">
                        <Text className="text-xl font-extrabold text-gray-900">
                            {habbits.title}
                        </Text>
                        <Text
                            numberOfLines={2}
                            className="text-base text-gray-600 mt-1 leading-snug"
                        >
                            {habbits.description}
                        </Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                        <MaterialCommunityIcons name="checkbox-marked-circle" size={24} color="green" />
                        <Text>Completed</Text>
                    </View>
                </View>
            ) : (
                <>
                    {/* Title & Description */}
                    <View className="mb-3">
                        <Text className="text-xl font-extrabold text-gray-900">
                            {habbits.title}
                        </Text>
                        <Text
                            numberOfLines={2}
                            className="text-base text-gray-600 mt-1 leading-snug"
                        >
                            {habbits.description}
                        </Text>
                    </View>

                    {/* Bottom Row: Streak & Frequency */}
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center bg-amber-100 rounded-full px-3 py-1">
                            <MaterialCommunityIcons name="fire" size={18} color="#f97316" />
                            <Text className="text-amber-800 font-semibold ml-1 text-sm">
                                {habbits.streak_count} day streak
                            </Text>
                        </View>

                        <View className="bg-sky-500 rounded-full px-4 py-1">
                            <Text className="text-white font-semibold capitalize text-sm">
                                {habbits.frequency}
                            </Text>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
});

HabbitsCard.displayName = "HabbitsCard";
