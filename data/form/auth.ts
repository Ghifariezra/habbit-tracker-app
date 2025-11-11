type FieldInput = {
    name: "email" | "password";
    label: string;
    secure: boolean;
}

export const labelAuth: FieldInput[] = [
    { name: "email", label: "Email", secure: false },
    { name: "password", label: "Password", secure: true },
]