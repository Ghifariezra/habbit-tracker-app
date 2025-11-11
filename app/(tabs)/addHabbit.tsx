import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FieldInput } from "@/components/ui/fieldInput";
import { useHabbitScreen } from "@/hooks/habbits/useHabbitScreen";
import { labelAddHabit } from "@/data/form/addHabit";

export default function AddHabitScreen() {
    const { control, handleAddHabbit, formState } = useHabbitScreen();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 justify-center bg-white p-4">
                <View className="flex items-center mb-8">
                    <Text className="text-3xl font-bold">
                        Add Habit
                    </Text>
                </View>

                <View
                    className="flex flex-col gap-4"
                >
                    {labelAddHabit.map(({
                        name,
                        label,
                        secure
                    }) => (
                        <FieldInput
                            key={name}
                            control={control}
                            name={name}
                            label={label}
                            secure={secure}
                        />
                    ))}

                    <Button
                        mode="contained"
                        onPress={handleAddHabbit}
                        disabled={!formState.isValid}
                    >
                        Add Habit
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}