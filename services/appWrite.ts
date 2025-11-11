import { type Client, Account, Databases } from "react-native-appwrite";

export abstract class AppWriteService {
    protected readonly client: Client;
    protected readonly account: Account;
    protected readonly databases: Databases;

    constructor(protected readonly c: Client) {
        if (!c) throw new Error("Client is required");

        this.client = c;
        this.account = new Account(c);
        this.databases = new Databases(c);
    }

    abstract getServiceName(): string;

    protected getAccount(): Account {
        return this.account;
    }

    protected getDatabases(): Databases {
        return this.databases;
    }
}
