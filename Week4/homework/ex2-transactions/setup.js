import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function setup() {
    try {
        await client.connect();
        const db = client.db('databaseWeek4');
        const accounts = db.collection('accounts');

        // Clear old account if exists
        await accounts.deleteMany({});

        await accounts.insertMany([
            { account_number: 101, balance: 5000, account_changes: [] },
            { account_number: 102, balance: 3000, account_changes: [] }
        ]);
    } catch (error) {
        console.error('Error setting up accounts: ', error);
    }
}

setup();