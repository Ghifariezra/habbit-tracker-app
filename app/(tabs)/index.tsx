import React from "react";
import { useAuthContext } from "@/hooks/auth/useAuthContext";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { HabbitsCard } from "@/components/common/cards/habbits";
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import { SwipeCard } from "@/components/common/cards/swipe";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { labelFrequency } from "@/data/dropdown/frequency";
import { FrequencyDropdown } from "@/components/common/dropdown/frequency";

export default function Index() {
  const { handleSignOut, swapeableRef, handleDeleteHabbit, handleCompleteHabbit, isCompleted, filterHabbits, typeFrequency, setTypeFrequency } = useAuthContext();

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between w-full px-5 pt-10 pb-4 bg-white shadow-md">
        <Text className="text-3xl font-bold text-gray-900">
          Today&apos;s Habbits
        </Text>
        <Button
          mode="text"
          onPress={handleSignOut}
          icon="logout"
          textColor="#3b82f6"
        >
          Logout
        </Button>
      </View>

      {/* Filter */}
      <View className="flex flex-row items-center justify-between gap-4 px-5 pt-8">
        <View className="flex-1">
          <Text className="text-lg font-semibold">
            Frequency:
          </Text>
        </View>
        <View className="flex-1 border border-gray-200 rounded-md">
          <FrequencyDropdown
            data={labelFrequency}
            value={typeFrequency}
            setValue={setTypeFrequency}
          />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
      >
        {filterHabbits.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <View className="flex flex-col items-center gap-2">
              <MaterialCommunityIcons name="emoticon-sad-outline" size={86} color="#666666" />
              <Text className="text-center text-xl font-semibold text-gray-400">
                No habbits found
              </Text>
            </View>
          </View>
        ) : ( 
          filterHabbits.map((habbit) => (
            <Swipeable
              ref={(ref) => {
                if (swapeableRef.current) {
                  swapeableRef.current[habbit.$id] = ref;
                }
              }}
              key={habbit.$id}
              containerStyle={{
                borderRadius: 16,
              }}
              overshootLeft={false}
              overshootRight={false}
              renderLeftActions={
                () => (
                  <SwipeCard
                    className="bg-red-400 items-start"
                  >
                    <MaterialCommunityIcons name="trash-can-outline" size={32} color="#fff" />
                  </SwipeCard>
                )
              }
              renderRightActions={
                () => {
                  return (
                    <>
                      {isCompleted(habbit, habbit.$id) ? null : (
                        <SwipeCard
                          className="bg-green-400 items-end"
                        >
                          <MaterialCommunityIcons name="check" size={32} color="#fff" />
                        </SwipeCard>
                      )}
                    </>
                  )
                }
              }
              onSwipeableOpen={(direction, swipeable) => {
                if (direction === "left") handleDeleteHabbit(habbit.$id);
                else if (direction === "right") {
                  handleCompleteHabbit(habbit.$id);

                  swipeable.close();
                };
              }}
              // friction={2}
              leftThreshold={50}
              rightThreshold={50}
            >
              <View
                style={{
                  borderRadius: 16,
                  backgroundColor: "#FFF",
                  // opacity: isCompleted(habbit.$id) ? 0.4 : 1,
                  marginBottom: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <HabbitsCard habbits={habbit} completed={isCompleted(habbit, habbit.$id)} />
              </View>
            </Swipeable>
          ))
        )}
      </ScrollView>
    </View>
  );
}
