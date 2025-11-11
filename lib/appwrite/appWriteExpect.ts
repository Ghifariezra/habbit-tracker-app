import type { AppwriteException } from "react-native-appwrite";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export function appWriteExpect<T extends FieldValues>({
    error,
    setError,
}: {
    error: AppwriteException;
    setError: UseFormSetError<T>;
}) {
    switch (error.code) {
        case 409:
            setError("email" as Path<T>, { message: "User already exists" });
            break;
        case 401:
            setError("email" as Path<T>, { message: "Invalid credentials" });
            break;
        default:
            setError("email" as Path<T>, { message: "Invalid email or password" });
            break;
    }
}