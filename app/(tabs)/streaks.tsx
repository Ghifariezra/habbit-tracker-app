import { View, Text } from "react-native";
import { useAuthContext } from "@/hooks/auth/useAuthContext";
import { BarChartCategory } from "@/components/common/charts/barChart";
import { ScrollView } from "react-native-gesture-handler";
import { Ranking } from "@/components/common/leaderboard/ranking";
import { Broke } from "@/components/common/leaderboard/broke";

export default function StreaksScreen() {
    const { topHabbits, categoryStreakAnalysis, categoryAvgStreak, brokeStreaks } = useAuthContext();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{
                backgroundColor: "#fff",
                flexGrow: 1,
                padding: 20
            }} >
            <View className="flex-1 bg-white gap-6">
                <Text className="text-3xl font-bold text-gray-800">
                    Habbits Streaks
                </Text>

                {/* Leaderboard Rank */}
                <Ranking data={topHabbits} />

                {/* Broken Habbits */}
                <Broke data={brokeStreaks} />

                {/* Total Streak Per Category */}
                <BarChartCategory
                    dataCategory={categoryStreakAnalysis}
                    legend={categoryAvgStreak}
                />
 
            </View>
        </ScrollView>
    );
}
