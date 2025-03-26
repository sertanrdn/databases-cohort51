import mysql from 'mysql2/promise';

async function getPopulation(name, code) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'world'
    });

    try {
        const [rows] = await connection.query(
            `SELECT Population FROM country WHERE Name = ? AND Code = ?`,
            [name, code]
        );

        if (rows.length === 0) {
            console.log('No country found...');
            return null;
        }
        console.log('Population: ', rows[0].Population);
        return rows[0].Population;

    } catch (error) {
        console.error('Database error: ', error);
    } finally {
        await connection.end();
    }
}

getPopulation('Netherlands', 'NLD');

getPopulation("' OR '1'='1", "' OR '1'='1");
