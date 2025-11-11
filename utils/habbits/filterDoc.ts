import { FreqType, HabbitDocument } from "@/types/habbits";
import { Models } from "react-native-appwrite";

export function filterHabbitDocument(doc: Models.Document[]): HabbitDocument[] {
    const habbits = doc as unknown as HabbitDocument[];

    return habbits.map((doc) => ({
        ...doc,
        title: doc.title,
        description: doc.description,
        frequency: doc.frequency,
        streak_count: doc.streak_count,
        last_completed: doc.last_completed
    }));
}

export function filterByFrequency(docs: HabbitDocument[], frequency: FreqType) {
    switch (frequency) {
        case "daily":
            return docs.filter(h => h.frequency === "daily");
        case "weekly":
            return docs.filter(h => h.frequency === "weekly");
        case "monthly":
            return docs.filter(h => h.frequency === "monthly");
        default:
            return docs;
    }
}