import mysql from 'mysql2/promise';

async function setupDatabase() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        multipleStatements: true
    });

    const createDatabase = `CREATE DATABASE IF NOT EXISTS bank_db;`;
    const useDatabase = `USE bank_db;`;

    const createTables = `
        CREATE TABLE IF NOT EXISTS account (
            account_number INT PRIMARY KEY,
            balance DECIMAL(10, 2) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS account_changes (
            change_number INT AUTO_INCREMENT PRIMARY KEY,
            account_number INT,
            amount DECIMAL(10, 2),
            changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            remark VARCHAR(255),
            FOREIGN KEY (account_number) REFERENCES account(account_number)
        );
    `;

    try {
        await connection.query(createDatabase);
        await connection.query(useDatabase);
        await connection.query(createTables);
    } catch (error) {
        console.error('Error setting up database: ', error);
    } finally {
        await connection.end()
    }
}

setupDatabase();