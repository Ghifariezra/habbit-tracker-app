import { memo } from "react";
import { Text, View } from "react-native";

interface CategoryLegendProps {
    data: {
        label: string;
        value: number;
    }[];
}

export const CategoryLegend = memo(({ data }: { data: CategoryLegendProps['data'] }) => {
    return (
        <View className="flex-row items-center justify-center gap-6">
            {data.map((item, Index) => (
                <View
                    key={Index}
                    className={`flex-row items-center gap-2`}
                >
                    <View
                        className={`w-3 h-3 rounded-full ${item.label === 'daily'
                            ? 'bg-yellow-500'
                            : item.label === 'weekly'
                                ? 'bg-blue-500'
                                : 'bg-green-500'
                            }`}
                    />
                    <Text className="text-gray-700 text-sm">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}:
                    </Text>
                    <Text className="text-gray-700 text-sm">
                        {item.value}
                    </Text>
                </View>

            ))}
        </View>
    );
});

CategoryLegend.displayName = "CategoryLegend";