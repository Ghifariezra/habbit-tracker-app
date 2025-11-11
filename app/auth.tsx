import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { FieldInput } from "@/components/ui/fieldInput";
import { labelAuth } from "@/data/form/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "@/hooks/auth/useAuthContext";

export default function AuthScreen() {
    const { isSignUp, handleSwitchMode, handleAuth, control } = useAuthContext();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 bg-white"
            >
                <View className="flex-1 justify-center p-4">
                    <Text className="text-center text-3xl font-bold mb-6">
                        {isSignUp ? "Create an account" : "Welcome back"}
                    </Text>

                    <View className="flex flex-col gap-4">
                        {labelAuth.map((input) => (
                            <FieldInput
                                key={input.name}
                                control={control}
                                name={input.name}
                                label={input.label}
                                secure={input.secure}
                            />
                        ))}

                        <Button mode="contained" onPress={handleAuth}>
                            {isSignUp ? "Sign up" : "Sign in"}
                        </Button>

                        <Button mode="text" onPress={handleSwitchMode}>
                            {isSignUp
                                ? "Already have an account? Sign in"
                                : "Don't have an account? Sign up"}
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
