import { memo } from "react";
import { BarChart } from "react-native-gifted-charts";
import { BarChartTooltip } from "../tooltips/barChart";
import { View } from "react-native";
import { CategoryLegend } from "@/components/common/legend/categoryLegend";
import { LabelStreaks } from "@/components/common/label/streaks";
import { EmptyData } from "@/components/common/label/emptyData";
import type { BarChartCategoryProps } from "@/types/chart";

export const BarChartCategory = memo(({ dataCategory, legend }: BarChartCategoryProps) => {
    return (
        < View className="flex gap-6 bg-white rounded-2xl p-6 border border-sky-400" >
            <LabelStreaks
                title="Total Streak Per Category"
                nameIcon="insights"
            />
            <View className="flex overflow-hidden rounded-xl">
                {dataCategory.length > 0 ? (
                    <BarChart
                        data={dataCategory}
                        noOfSections={5}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        cappedBars
                        capRadius={8}
                        dashWidth={4}
                        rulesColor={"#a5b4fc"}
                        capColor={'rgba(78, 0, 142)'}
                        capThickness={4}
                        renderTooltip={(item: BarChartCategoryProps['dataCategory'][0]) => {
                            return (
                                <BarChartTooltip data={item} />
                            )
                        }}
                        disableScroll
                        showGradient
                        adjustToWidth
                        isAnimated
                    />
                ) : (
                    <EmptyData 
                        title="Start building your habits to see your streak stats 📊"
                        nameIcon="insert-chart-outlined"
                    />
                )}
            </View>

            {legend.length > 0 && (
                <CategoryLegend
                    data={legend}
                />
            )}
        </View>
    )
})

BarChartCategory.displayName = "BarChartCategory";