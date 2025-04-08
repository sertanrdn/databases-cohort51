import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function connectDB() {
    try {
        await client.connect();
        return client.db('databaseWeek4');
    } catch (error) {
        console.error('Error connecting MongoDB: ', error);
        process.exit(1);
    }
}