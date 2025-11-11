import { ID, Permission, Query, Role } from "react-native-appwrite";
import type { HabbitDocument, HabbitPayload, AttributeDatabases, HabbitDocumentCompletion } from "@/types/habbits";
import { filterHabbitDocument } from "@/utils/habbits/filterDoc";
import { AppWriteService } from "@/services/appWrite";

interface RealtimeResponse {
    events: string[];
    payload: any;
}

export class UserHabbitsService extends AppWriteService {
    private attributeDatabases: AttributeDatabases = {
        ID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        COLLECTION_ID: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!,
        COMPLETIONS_ID: process.env.EXPO_PUBLIC_APPWRITE_COMPLETIONS_COLLECTION_ID!,
    };
    private channel = {
        habbits: `databases.${this.attributeDatabases.ID}.collections.${this.attributeDatabases.COLLECTION_ID}.documents`,
        completions: `databases.${this.attributeDatabases.ID}.collections.${this.attributeDatabases.COMPLETIONS_ID}.documents`,
    }

    getServiceName(): string {
        return "UserHabbitsService";
    }

    async getHabbits(user_id: string): Promise<HabbitDocument[]> {
        const { documents } = await this.getDatabases().listDocuments(
            this.attributeDatabases.ID,
            this.attributeDatabases.COLLECTION_ID,
            [Query.equal("user_id", user_id)]
        );

        return filterHabbitDocument(documents);
    }

    async getHabbitCompletions(user_id: string, today?: string): Promise<HabbitDocumentCompletion[]> {
        if (today) {
            const { documents } = await this.getDatabases().listDocuments(
                this.attributeDatabases.ID,
                this.attributeDatabases.COMPLETIONS_ID,
                [
                    Query.equal("user_id", user_id),
                    Query.greaterThan("$createdAt", today)
                ]
            );
    
            return documents as unknown as HabbitDocumentCompletion[];
        }

        const { documents } = await this.getDatabases().listDocuments(
            this.attributeDatabases.ID,
            this.attributeDatabases.COMPLETIONS_ID,
            [Query.equal("user_id", user_id)]
        );

        return documents as unknown as HabbitDocumentCompletion[];
    }

    habbitSubscription(user_id: string) {
        return this.client.subscribe(
            this.channel.habbits,
            (response: RealtimeResponse) => {
                if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                    return this.getHabbits(user_id);
                } else if (response.events.includes("databases.*.collections.*.documents.*.update")) {
                    return this.getHabbits(user_id);
                } else if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                    return this.getHabbits(user_id);
                }
            }
        )
    }

    habbitCompletionSubscription(user_id: string, today: string) {
        return this.client.subscribe(
            this.channel.completions,
            (response: RealtimeResponse) => {
                if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                    return this.getHabbitCompletions(user_id, today);
                }
            }
        )
    }

    async addHabbit({ user_id, title, description, frequency }: HabbitPayload) {
        await this.getDatabases().createDocument(
            this.attributeDatabases.ID,
            this.attributeDatabases.COLLECTION_ID,
            ID.unique(),
            {
                user_id,
                title,
                description,
                frequency,
                streak_count: 0,
                last_completed: new Date().toISOString(),
                // created_at: new Date().toISOString(),
            },
            [
                Permission.write(Role.user(user_id)),
                Permission.read(Role.user(user_id)),
            ]
        );
    }

    async addHabbitCompletion(habbit_id: string, user_id: string) {
        await this.getDatabases().createDocument(
            this.attributeDatabases.ID,
            this.attributeDatabases.COMPLETIONS_ID,
            ID.unique(),
            {
                habbit_id,
                user_id,
                // created_at: new Date().toISOString(),
            }
        );
    }

    async updateStreakCount(document_id: string, count: number, last_completed: string) {
        await this.getDatabases().updateDocument(
            this.attributeDatabases.ID,
            this.attributeDatabases.COLLECTION_ID,
            document_id,
            {
                streak_count: count,
                last_completed: last_completed,
            }
        );
    }

    async deleteHabbit(type: "HABBIT" | "COMPLETION", habbit_id: string) {
        if (type === "HABBIT") {
            await this.getDatabases().deleteDocument(
                this.attributeDatabases.ID,
                this.attributeDatabases.COLLECTION_ID,
                habbit_id
            );
        }

        if (type === "COMPLETION") {
            const { documents } = await this.getDatabases().listDocuments(
                this.attributeDatabases.ID,
                this.attributeDatabases.COMPLETIONS_ID,
                [Query.equal("habbit_id", habbit_id)]
            );

            for (const doc of documents) {
                await this.getDatabases().deleteDocument(
                    this.attributeDatabases.ID,
                    this.attributeDatabases.COMPLETIONS_ID,
                    doc.$id
                );
            }
        }
    }
}
