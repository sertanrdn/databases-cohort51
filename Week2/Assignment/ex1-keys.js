import { connection } from "./connection.js";

async function setupDatabase() {
    const createDatabase = `CREATE DATABASE IF NOT EXISTS academics;`;
    const useDatabase = `USE academics;`;

    const createTable = `
        CREATE TABLE IF NOT EXISTS authors (
            author_id INT AUTO_INCREMENT PRIMARY KEY,
            author_name VARCHAR(255) NOT NULL,
            university VARCHAR(255),
            date_of_birth DATE,
            h_index INT,
            gender ENUM('Male', 'Female', 'Other')
        );
    `;

    const addColumn = `
        ALTER TABLE authors
        ADD COLUMN mentor INT,
        ADD CONSTRAINT fk_mentor
            FOREIGN KEY (mentor) REFERENCES authors(author_id) ON DELETE SET NULL;
    `;

    try {
        await connection.query(createDatabase);
        await connection.query(useDatabase);
        await connection.query(createTable);
        await connection.query(addColumn);
    } catch (error) {
        console.error('Error setting up database: ', error);
    } finally {
        await connection.end();
    }
}

setupDatabase();