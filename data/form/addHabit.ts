type FieldInput = {
    name: "title" | "description" | "frequency";
    label: string;
    secure: boolean;
}

type SegmentedButtons = {
    value: "daily" | "weekly" | "monthly";
    label: string;
}

export const labelAddHabit: FieldInput[] = [
    { name: "title", label: "Title", secure: false },
    { name: "description", label: "Description", secure: false },
    { name: "frequency", label: "Frequency", secure: false },
]

export const labelSegmentedButtons: SegmentedButtons[] = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
]