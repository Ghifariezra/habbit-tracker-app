import { useState } from "react";
import { Text, View } from "react-native";
import { SegmentedButtons, TextInput } from "react-native-paper";
import { Controller, type Path, type Control } from "react-hook-form";
import { labelSegmentedButtons } from "@/data/form/addHabit";
import { type AuthFormValues } from "@/lib/validations/authSchema";
import { type HabbitFormValues } from "@/lib/validations/habbitSchema";

type FieldInputProps<T extends AuthFormValues | HabbitFormValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    secure?: boolean;
};

export function FieldInput<T extends AuthFormValues | HabbitFormValues>({
    control,
    name,
    label,
    secure,
}: FieldInputProps<T>) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View className="flex gap-2">
                    {label === "Frequency" ? (
                        <SegmentedButtons
                            value={value}
                            onValueChange={onChange}
                            buttons={
                                labelSegmentedButtons.map(({ value, label }) => ({
                                    value,
                                    label,
                                    showSelectedCheck: true
                                }))
                            }
                        />
                    ) : (
                        <TextInput
                            mode="outlined"
                            placeholder={
                                name === "email" ? "example@gmail.com" : name === "password" ? "********" : ""
                            }
                            label={label}
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry={secure && !isPasswordVisible}
                            autoCapitalize="none"
                            keyboardType={name === "email" ? "email-address" : "default"}
                            right={
                                secure ? (
                                    <TextInput.Icon
                                        icon={isPasswordVisible ? "eye-off" : "eye"}
                                        onPress={() =>
                                            setIsPasswordVisible((prev) => !prev)
                                        }
                                    />
                                ) : null
                            }
                        />
                    )}


                    {error && (
                        <Text className="text-red-500 text-sm">{error.message}</Text>
                    )}
                </View>
            )}
        />
    );
}
