import mongoose from 'mongoose';

class Database {
    private static instance: Database;
    private connectionString: string;
    private isConnected: boolean = false;

    private constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    public static getInstance(connectionString: string): Database {
        if (!Database.instance) {
            Database.instance = new Database(connectionString);
        }
        return Database.instance;
    }

    public async connect(): Promise<void> {
        if (this.isConnected) {
            console.log('Already connected to the database');
            return;
        }

        try {
            await mongoose.connect(this.connectionString);
            this.isConnected = true;
            console.log('Successfully connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        if (!this.isConnected) {
            console.log('Not connected to the database');
            return;
        }

        try {
            await mongoose.disconnect();
            this.isConnected = false;
            console.log('Successfully disconnected from the database');
        } catch (error) {
            console.error('Error disconnecting from the database:', error);
            throw error;
        }
    }
}

export default Database;
