import mysql from 'mysql2/promise';

async function connectDatabase() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'world'
    });
    return connection;
}

async function countriesPopulation(connection) {
    const query = `SELECT Name FROM country WHERE Population > 8000000;`;
    const [rows] = await connection.query(query);
    console.log('Countries with population greater than 8 Million: ', rows);
}

async function countriesHaveLandInName(connection) {
    const query = `SELECT Name FROM country WHERE Name LIKE '%land%';`;
    const [rows] = await connection.query(query);
    console.log('Countries that have land in their names: ', rows);
}

async function citiesPopulation(connection) {
    const query = `SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;`;
    const [rows] = await connection.query(query);
    console.log('Cities with population in between 500000 and 1 Million: ', rows);
}

async function europeanCountries(connection) {
    const query = `SELECT Name FROM country WHERE Continent = 'Europe';`;
    const [rows] = await connection.query(query);
    console.log('All the countries in Europe: ', rows);
}

async function countriesBySurfaceArea(connection) {
    const query = `SELECT Name FROM country ORDER BY SurfaceArea DESC;`;
    const [rows] = await connection.query(query);
    console.log('Countries by Surface Area Descending: ', rows);
}

async function citiesInNetherlands(connection) {
    const query =  `SELECT Name FROM city WHERE CountryCode = 'NLD';`;
    const [rows] = await connection.query(query);
    console.log('All cities in the Netherlands: ', rows);
}

async function populationRotterdam(connection) {
    const query = `SELECT Population FROM city WHERE Name = 'Rotterdam';`;
    const [rows] = await connection.query(query);
    console.log('Population of Rotterdam: ', rows);
}

async function top10CountriesBySurfaceArea(connection) {
    const query = `SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;`;
    const [rows] = await connection.query(query);
    console.log('Top 10 countries by Surface Area: ', rows);
}

async function top10CitiesByPopulation(connection) {
    const query = `SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10;`;
    const [rows] = await connection.query(query);
    console.log('Top 10 most populated cities: ', rows);
}

async function worldPopulation(connection) {
    const query = `SELECT SUM(Population) AS WorldPopulation FROM country;`;
    const [rows] = await connection.query(query);
    console.log('Population of the world: ', rows[0].WorldPopulation);
}

async function runQueries() {
    const connection = await connectDatabase();
    
    try {
        await countriesPopulation(connection);
        await countriesHaveLandInName(connection);
        await citiesPopulation(connection);
        await europeanCountries(connection);
        await countriesBySurfaceArea(connection);
        await citiesInNetherlands(connection);
        await populationRotterdam(connection);
        await top10CountriesBySurfaceArea(connection);
        await top10CitiesByPopulation(connection);
        await worldPopulation(connection);
    } catch (error) {
        console.error('Error running queries: ', error.message);
    } finally {
        connection.end();
    }
}

runQueries();