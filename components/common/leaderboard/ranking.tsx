import { memo } from 'react';
import { View, Text } from "react-native";
import { LabelStreaks } from "@/components/common/label/streaks";
import { EmptyData } from "@/components/common/label/emptyData";
import { type HabbitDocument } from '@/types/habbits';

export const Ranking = memo(({ data }: { data: HabbitDocument[] }) => {
    return (
        <View className="flex gap-6 bg-white rounded-2xl p-6 border border-sky-400">
            <LabelStreaks
                title="Leaderboard Rank"
                nameIcon="leaderboard"
            />

            <View className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                {/* Header */}
                <View className="flex-row items-center justify-between bg-blue-500 px-5 py-3 border-b border-gray-200">
                    {["Rank", "Habits", "Streak"].map((item, index) => (
                        <Text
                            key={index}
                            className={`${index === 0 ? "w-1/6" : index === 1 ? "w-3/6" : "w-2/6"} text-white font-semibold text-xs uppercase tracking-wider text-center`}
                        >
                            {item}
                        </Text>
                    ))}
                </View>

                {/* Rows */}
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <View
                            key={index}
                            className={`flex-row items-center justify-between px-5 py-3 ${index + 1 === data.length ? "" : "border-b border-gray-100"
                                } ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                        >
                            <Text className="w-1/6 text-gray-700 text-sm font-medium text-center">
                                {index + 1}
                            </Text>
                            <Text
                                className="w-3/6 text-gray-800 text-sm text-center"
                                numberOfLines={1}
                            >
                                {item.title}
                            </Text>
                            <Text className="w-2/6 text-gray-700 text-sm font-medium text-center">
                                {item.frequency.charAt(0).toUpperCase() + item.frequency.slice(1)}
                            </Text>
                        </View>
                    ))
                ) : (
                    <EmptyData
                        title="Build your first habit and see your rank grow!"
                        nameIcon="sentiment-dissatisfied"
                    />
                )}
            </View>
        </View>
    )
});

Ranking.displayName = "Ranking";