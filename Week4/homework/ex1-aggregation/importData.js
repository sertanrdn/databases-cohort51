import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import csv from 'csvtojson';
import { connectDB } from './database.js';

async function importData() {
    const db = await connectDB();
    const collection = db.collection('populationData');

    const filePath = path.join(__dirname, 'population_pyramid_1950-2022.csv');

    const jsonArray = await csv().fromFile(filePath);

    const formattedData = jsonArray.map((item) => ({
        Country: item.Country,
        Year: parseInt(item.Year),
        Age: item.Age,
        M: parseInt(item.M),
        F: parseInt(item.F),
    }));

    await collection.insertMany(formattedData);
    process.exit();
}

importData();