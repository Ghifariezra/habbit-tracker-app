import "@/app/global.css"
import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingTop: 8,
          borderTopColor: "#f1f1f1",
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: "#6262ee",
        tabBarInactiveTintColor: "#666666",
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Today's Habbits",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="calendar-today-outline" color={color} size={size} />
        }}
      />

      {/* Streak */}
      <Tabs.Screen
        name="streaks"
        options={{
          title: "Streaks",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="chart-line-variant" color={color} size={size} />
        }}
      />

      {/* Add Habbit */}
      <Tabs.Screen
        name="addHabbit"
        options={{
          title: "Add Habbit",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="plus-box-outline" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
