import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useAuthContext } from "@/hooks/auth/useAuthContext";

export function useRouteGuard() {
    const router = useRouter();
    const { user, isLoadingUser } = useAuthContext();
    const segments = useSegments();

    useEffect(() => {
        console.log("ROUTE GUARD", { user, isLoadingUser, segments });
 
        if (isLoadingUser || !segments) return;

        const isAuthGroup = segments[0] === "auth";

        if (!user && !isAuthGroup) {
            router.replace("/auth");
        } else if (user && isAuthGroup) {
            router.replace("/");
        }
    }, [user, router, segments, isLoadingUser]);

    return { isLoadingUser };
}