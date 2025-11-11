import { memo } from "react";
import { Text, View } from "react-native";
import { LabelStreaks } from "@/components/common/label/streaks";
import type { BrokeProps } from "@/types/chart";
import { EmptyData } from "@/components/common/label/emptyData";

export const Broke = memo(({ data }: { data: BrokeProps[] }) => {
    const hasValidData = data.some(item => item.lastCompleted.length > 0);

    return (
        <View className="flex gap-6 bg-white rounded-2xl p-6 border border-sky-400">
            <LabelStreaks title="Broken Streaks Summary" nameIcon="trending-down" />

            <View className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                {/* Table Header */}
                <View className="flex-row justify-between bg-blue-500 px-4 py-3 rounded-t-2xl shadow-sm">
                    {["Type", "Date", "Time", "Amount"].map((text, i) => (
                        <Text
                            key={i}
                            className="flex-1 text-white text-xs font-semibold uppercase tracking-wider text-center"
                        >
                            {text}
                        </Text>
                    ))}
                </View>

                {/* Table Body */}
                {hasValidData ? (
                    data.map((item, groupIndex) => {
                        if (item.lastCompleted.length === 0) return null; // skip item kosong

                        return (
                            <View
                                key={groupIndex}
                                className="flex-row border-b border-gray-200 bg-white"
                            >
                                {/* LEFT SECTION → kolom Type, Date, Time */}
                                <View className="flex-1">
                                    {item.lastCompleted.map((entry, index) => (
                                        <View
                                            key={index}
                                            className={`flex-row justify-between px-4 py-3 ${index % 2 === 0
                                                ? "bg-gray-50"
                                                : "bg-white"
                                                } border-b border-gray-100`}
                                        >
                                            <Text className="flex-1 text-gray-800 text-sm text-center">
                                                {item.label}
                                            </Text>
                                            <Text className="flex-1 text-gray-800 text-sm text-center">
                                                {entry.lastDate}
                                            </Text>
                                            <Text className="flex-1 text-gray-800 text-sm text-center">
                                                {entry.lastTime}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                                {/* RIGHT SECTION → Amount */}
                                <View className="w-[25%] items-center justify-center bg-gray-50 border-l border-gray-200">
                                    <Text className="text-gray-800 text-base font-semibold">
                                        {item.value}
                                    </Text>
                                </View>
                            </View>
                        );
                    })
                ) : (
                    <EmptyData
                        title="Great job! You haven’t broken any streaks yet 🎉"
                        nameIcon="sentiment-very-satisfied"
                    />
                )}
            </View>
        </View>
    );
});

Broke.displayName = "Broke";