import { memo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import type { barDataItem } from "react-native-gifted-charts";

export const BarChartTooltip = memo(({ data }: { data: barDataItem }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.valueText}>{data.value}x</Text>
            <View style={styles.arrow} />
        </View>
    );
}); 

BarChartTooltip.displayName = "BarChartTooltip";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4A70A9",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        bottom: 4
    },
    valueText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 13,
        letterSpacing: 0.3,
    },
    arrow: {
        position: "absolute",
        bottom: -4,
        width: 0,
        height: 0,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 6,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "#4A70A9",
    },
});
