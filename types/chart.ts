import type { barDataItem } from "react-native-gifted-charts";

export interface BarChartCategoryProps {
    dataCategory: barDataItem[];
    legend: {
        label: string;
        value: number;
    }[]
}

export interface BrokeProps {
    label: string;
    value: number;
    lastCompleted: {
        lastDate: string;
        lastTime: string;
    }[]
};