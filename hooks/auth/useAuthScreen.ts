import { useRouter, useSegments } from "expo-router";
import { useState, useCallback, useEffect, useMemo, useRef, useReducer } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppwriteException, Models } from "react-native-appwrite";
import { UserAuthService } from "@/services/auth/userAuth";
import { UserHabbitsService } from "@/services/db/userHabbits";
import { authSchema, type AuthFormValues } from "@/lib/validations/authSchema";
import { appWriteExpect } from "@/lib/appwrite/appWriteExpect";
import { client } from "@/lib/appwrite/appWrite";
import { prettyLog } from "@/utils/logConsole";
import { habbitReducer, habbitCompletedReducer } from "@/utils/habbits/reducerHabbits";
import { dateFormatter, isSameDay } from "@/utils/habbits/isSameDay";
import type { HabbitDocument, FreqType, GroupedHabbits } from "@/types/habbits";
import { filterByFrequency } from "@/utils/habbits/filterDoc";
import type { barDataItem } from "react-native-gifted-charts";

export function useAuthScreen() {
    const today = useMemo(() => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }, []);

    const router = useRouter();
    const segments = useSegments();

    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [typeFrequency, setTypeFrequency] = useState<FreqType>("all");
    const [habbits, dispatchHabbits] = useReducer(habbitReducer, {
        list: [],
        selected: null,
    });
    const [habbitCompleted, dispatchHabbitsCompleted] = useReducer(habbitCompletedReducer, []);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
    const swapeableRef = useRef<{ [key: string]: Swipeable | null }>(null);

    // Services
    const userHabbits = useMemo(() => new UserHabbitsService(client), []);
    const userAuth = useMemo(() => new UserAuthService(client), []);

    const { handleSubmit, control, reset, setError } = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const handleSwitchMode = useCallback(() => setIsSignUp((prev) => !prev), []);

    const handleAuth = useCallback(() => {
        const submit = handleSubmit(async (values) => {
            try {
                if (isSignUp) {
                    await userAuth.signUp(values.email, values.password);

                    setIsSignUp(false);
                    reset();
                    return;
                }

                const session = await userAuth.signIn(values.email, values.password);
                setUser(session);

                reset();
            } catch (error) {
                if (error instanceof AppwriteException) {
                    appWriteExpect<AuthFormValues>({
                        error,
                        setError,
                    });
                }
            }
        });

        submit();
    }, [handleSubmit, isSignUp, reset, setError, userAuth]);

    const handleSignOut = useCallback(async () => {
        try {
            await userAuth.signOut();
            setUser(null);
        } catch (error) {
            prettyLog("Error logging out", error, "error");
        }
    }, [userAuth]);

    const handleRestoreSession = useCallback(async () => {
        try {
            const session = await userAuth.restoreSession();
            setUser(session);
        } catch {
            setUser(null);
        } finally {
            setIsLoadingUser(false);
        }
    }, [userAuth]);

    useEffect(() => {
        handleRestoreSession();
    }, [handleRestoreSession]);

    const handleDeleteHabbit = useCallback(async (id: string) => {
        try {
            await userHabbits.deleteHabbit("HABBIT", id);

            dispatchHabbits({
                type: "DELETE",
                payload: id
            });

            await userHabbits.deleteHabbit("COMPLETION", id);
            dispatchHabbitsCompleted({
                type: "POP",
                payload: id
            });
        } catch (error) {
            prettyLog("Error deleting habbit", error, "error");
        }
    }, [userHabbits]);

    const handleCompleteHabbit = useCallback(async (id: string) => {
        if (!user) return;

        try {
            await userHabbits.addHabbitCompletion(id, user.$id);

            const habbit = habbits.list.find((habbit) => habbit.$id === id);
            if (!habbit) return;

            const newStreakCount = habbit.streak_count + 1;

            await userHabbits.updateStreakCount(id, newStreakCount, today.toISOString());

            dispatchHabbits({
                type: "UPDATE",
                payload: {
                    ...habbit,
                    streak_count: newStreakCount,
                    last_completed: new Date().toISOString(),
                }
            })

            dispatchHabbitsCompleted({
                type: "APPEND",
                payload: id
            })
        } catch (error) {
            prettyLog("Error deleting habbit", error, "error");
        }
    }, [userHabbits, user, habbits, today]);

    // Check
    const isCompleted = useCallback((habbit: HabbitDocument, habbit_id: string) => {
        return isSameDay(
            habbit.$updatedAt,
            today.toISOString(),
            habbit.frequency
        ) && habbitCompleted.includes(habbit_id);
    }, [today, habbitCompleted]);

    // Analytics
    const filterHabbits = useMemo(() => {
        if (!habbits?.list) return [];

        const filtered = filterByFrequency(habbits.list, typeFrequency);

        return filtered.slice().sort((a, b) => {
            return b.streak_count - a.streak_count;
        });
    }, [habbits, typeFrequency]);

    const topHabbits = useMemo(() => {
        if (!habbits?.list) return [];

        return habbits.list
            .filter(h => h.streak_count > 0)
            .sort((a, b) => b.streak_count - a.streak_count)
            .slice(0, 3);
    }, [habbits])

    const groupingHabbits = useMemo(() => {
        if (!habbitCompleted || !filterHabbits) return {} as GroupedHabbits;

        return filterHabbits.reduce((acc, curr) => {
            if (!acc[curr.frequency]) {
                acc[curr.frequency] = [];
            }

            if (habbitCompleted.includes(curr.$id)) {
                acc[curr.frequency].push({
                    habbit_id: curr.$id,
                    title: curr.title,
                    streak: curr.streak_count,
                    last_completed: curr.$updatedAt,
                    frequency: curr.frequency
                });
            }

            return acc;
        }, {} as GroupedHabbits);
    }, [habbitCompleted, filterHabbits]);

    const brokeStreaks = useMemo(() => {
        if (!groupingHabbits) return [];

        return Object.entries(groupingHabbits).flatMap(([key, value]) => {
            const brokeHabbits = value.filter((h) => {
                return !isSameDay(
                    h.last_completed,
                    today.toISOString(),
                    h.frequency
                )
            });
            
            const lastCompleted = brokeHabbits.flatMap((h) => {
                return dateFormatter(new Date(h.last_completed));
            });

            return {
                label: key.charAt(0).toUpperCase() + key.slice(1),
                value: brokeHabbits.length,
                lastCompleted
            }
        });
    }, [groupingHabbits, today]);
    console.log(brokeStreaks)

    const categoryStreakAnalysis: barDataItem[] = useMemo(() => {
        if (!groupingHabbits) return [];

        return Object.entries(groupingHabbits).flatMap(([key, value]) => {
            const totalStreak = value.reduce((acc, v) => acc + v.streak, 0);

            return {
                label: key.charAt(0).toUpperCase() + key.slice(1),
                value: totalStreak,
                frontColor: "#dcd6f7",
                gradientColor: "#a5b4fc",
                barBorderTopLeftRadius: 8,
                barBorderTopRightRadius: 8,
                barWidth: 40
            };
        });
    }, [groupingHabbits]);

    const categoryAvgStreak = useMemo(() => {
        if (!groupingHabbits) return [];

        const data = Object.entries(groupingHabbits).flatMap(([key, value]) => {
            const avg = value.reduce((acc, v) => acc + v.streak / value.length, 0);

            return {
                label: key,
                value: parseFloat(avg.toFixed(1)),
            }
        });

        return [
            ...data.filter(item => item.label !== "monthly"),
            ...data.filter(item => item.label === "monthly"),
        ];
    }, [groupingHabbits]);

    // Control Routes
    useEffect(() => {
        if (isLoadingUser || !user || !segments) return;

        const isTabsRoute = segments.length === 1 && segments[0] === "(tabs)";
        const isAuthRoute = segments.length === 1 && segments[0] === "auth";

        if (isTabsRoute) {
            console.log("Tabs Route");
            const fetchAllHabbits = async () => {
                try {
                    const habbits = await userHabbits.getHabbits(user.$id);
                    dispatchHabbits({
                        type: "CREATE",
                        payload: habbits
                    })

                    const habbitCompletions = await userHabbits.getHabbitCompletions(user.$id);

                    dispatchHabbitsCompleted({
                        type: "CREATE",
                        payload: habbitCompletions
                    })
                } catch (error) {
                    prettyLog("Error getting habbits", error, "error");
                }
            }

            fetchAllHabbits();

            const habbitSubscription = userHabbits.habbitSubscription(user.$id);
            const habbitComSubscription = userHabbits.habbitCompletionSubscription(user.$id, today.toISOString());

            return () => {
                habbitSubscription?.();
                habbitComSubscription?.();
            }
        }

        if (isAuthRoute) {
            router.replace("/");
        }
    }, [user, isLoadingUser, router, segments, userHabbits, today]);

    return {
        isSignUp,
        handleSwitchMode,
        handleAuth,
        control,
        user,
        isLoadingUser,
        handleSignOut,
        habbits,
        swapeableRef,
        handleDeleteHabbit,
        handleCompleteHabbit,
        isCompleted,
        filterHabbits,
        typeFrequency,
        setTypeFrequency,
        topHabbits,
        groupingHabbits,
        categoryStreakAnalysis,
        categoryAvgStreak,
        brokeStreaks
    };
};
