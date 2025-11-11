import { AppWriteService } from "@/services/appWrite";
import { ID } from "react-native-appwrite";

export class UserAuthService extends AppWriteService {
    getServiceName(): string {
        return "UserAuth";
    }

    async signUp(email: string, password: string) {
        await this.getAccount()
            .create(
                ID.unique(),
                email,
                password
            );
    }

    async signIn(email: string, password: string) {
        await this.getAccount()
            .createEmailPasswordSession(
                email,
                password
            );

        const session = await this.restoreSession();
        return session;
    };

    async signOut() {
        await this.getAccount()
            .deleteSession("current");
    }

    async restoreSession() {
        const session = await this.getAccount()
            .get();
        return session;
    }
}
