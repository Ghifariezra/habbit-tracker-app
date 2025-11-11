import { UserHabbitsService } from "@/services/db/userHabbits";
import { client } from "@/lib/appwrite/appWrite";
import { useCallback, useEffect, useMemo } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuthContext } from "@/hooks/auth/useAuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { habbitSchema, type HabbitFormValues } from "@/lib/validations/habbitSchema";
import { AppwriteException } from "react-native-appwrite";
import { appWriteExpect } from "@/lib/appwrite/appWriteExpect";

export function useHabbitScreen() {
    const { user } = useAuthContext();
    const segments = useSegments();
    const router = useRouter();

    const { handleSubmit, control, reset, formState, setError } = useForm<HabbitFormValues>({
        resolver: zodResolver(habbitSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            frequency: "daily",
        },
    });

    const habbitsService = useMemo(() => new UserHabbitsService(client), []);
    
    const handleAddHabbit = useCallback(() => {
        if (!user) return;

        const submit = handleSubmit(async (values) => {
            try {
                const {
                    title,
                    description,
                    frequency,
                } = values;

                await habbitsService.addHabbit({ user_id: user.$id, title, description, frequency });

                reset();

                router.back();
            } catch (error) {
                if (error instanceof AppwriteException) {
                    console.log(error);

                    appWriteExpect<HabbitFormValues>({
                        error,
                        setError,
                    });
                }
            }
        });
        submit();
    }, [handleSubmit, reset, router, user, setError, habbitsService]);

    useEffect(() => {
        if (!segments) return;

        if (segments[0] !== "addHabbit") reset();
    }, [segments, reset]);

    return { control, handleAddHabbit, formState };
}
