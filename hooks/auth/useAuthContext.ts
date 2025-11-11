import { createContext, useContext } from "react";
import { useAuthScreen } from "@/hooks/auth/useAuthScreen";

type AuthContextType = ReturnType<typeof useAuthScreen>;

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }

    return authContext;
}