import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './database.js';

async function populationByYear (country) {
    const db = await connectDB();
    const collection = db.collection('populationData');

    const result = await collection.aggregate([
        { $match: { Country: country } },
        { $group: { 
            _id: "$Year", 
            countPopulation: { $sum: { $add: ["$M", "$F"] } } 
        }},
        { $sort: { _id: 1 } }
    ]).toArray();

    return result;
}

async function populationByYearAndAge(year, age) {
    const db = await connectDB();
    const collection = db.collection("populationData");

    const result = await collection.aggregate([
        { $match: { Year: year, Age: age } },
        { $group: {
            _id: "$Country",
            Year: { $first: "$Year" },
            Age: { $first: "$Age" },
            M: { $sum: "$M" },
            F: { $sum: "$F" }
        }},
        { $addFields: { TotalPopulation: { $add: ["$M", "$F"] } } },
        { $match: { _id: { $in: ["AFRICA", "ASIA", "EUROPE", "LATIN AMERICA AND THE CARIBBEAN", "NORTHERN AMERICA", "OCEANIA"] } } }
    ]).toArray();

    return result;
}

populationByYear('Netherlands').then(result => {
    console.log(result);
}).catch(err => console.error(err));

populationByYearAndAge(2020, "100+").then(result => {
    console.log(result);
}).catch(err => console.error(err));
