import { type PropsWithChildren } from "react";
// import { Models } from "react-native-appwrite";
import { useAuthScreen } from "@/hooks/auth/useAuthScreen";
import { AuthContext } from "@/hooks/auth/useAuthContext";

export function AuthProvider({ children }: PropsWithChildren) {
    const AuthScreen = useAuthScreen();

    return (
        <AuthContext.Provider value={AuthScreen}>
            {children}
        </AuthContext.Provider>
    )
}