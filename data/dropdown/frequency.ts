import type { FreqType } from "@/types/habbits";

export type FrequencyOption = {
    label: string;
    value: FreqType;
};

export const labelFrequency: FrequencyOption[] = [
    { value: "all", label: "All" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
];
