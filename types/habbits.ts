import type { Models } from "react-native-appwrite";

export type AttributeDatabases = {
    ID: string;
    COLLECTION_ID: string;
    COMPLETIONS_ID: string;
};

export type Frequencys = "daily" | "weekly" | "monthly";
export type FreqType = Frequencys | "all";

export interface HabbitPayload {
    user_id: string;
    title: string;
    description: string;
    frequency: Frequencys;
};

export interface HabbitDocument extends Models.Document, HabbitPayload {
    streak_count: number;
    last_completed: string;
};

export interface HabbitDocumentCompletion extends Models.Document, Omit<HabbitPayload, "title" | "description" | "frequency"> {
    habbit_id: string;
};

export type HabbitsCardProps = {
    habbits: HabbitDocument;
    completed: boolean;
};

export type HabbitState = {
    list: HabbitDocument[];
    selected?: HabbitDocument | null;
};

export type HabbitAction =
    | { type: "CREATE"; payload: HabbitDocument[] }
    | { type: "DELETE"; payload: Models.Document["$id"] }
    | { type: "UPDATE"; payload: HabbitDocument };

export type HabbitActionCompletions = 
    | { type: "CREATE"; payload: HabbitDocumentCompletion[] }
    | { type: "APPEND"; payload: Models.Document["$id"] }
    | { type: "POP"; payload: Models.Document["$id"] };

export type FrequencyAnalysis = {
    habbit_id: string;
    title: string;
    streak: number;
    last_completed: string;
    frequency: Frequencys;
}[];

export type GroupedHabbits = Record<FreqType, FrequencyAnalysis>;