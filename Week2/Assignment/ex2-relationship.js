import { connection } from "./connection.js";

async function createRelationship() {
    const createDatabase = `CREATE DATABASE IF NOT EXISTS academics;`;
    const useDatabase =  `USE academics;`;

    const createResearchPapersTable = `
        CREATE TABLE IF NOT EXISTS research_papers (
            paper_id INT AUTO_INCREMENT PRIMARY KEY,
            paper_title VARCHAR(255) NOT NULL,
            conference VARCHAR(255),
            publish_date DATE
        );    
    `;

    const createAuthorPapersTable = `
        CREATE TABLE IF NOT EXISTS author_paper (
            author_id INT,
            paper_id INT,
            PRIMARY KEY (author_id, paper_id),
            FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
            FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id) ON DELETE CASCADE    
        );
    `;

    try {
        await connection.query(createDatabase);
        await connection.query(useDatabase);
        await connection.query(createResearchPapersTable);
        await connection.query(createAuthorPapersTable);
    } catch (error) {
        console.error('Error creating tables: ', error);
    } finally {
        await connection.end();
    }
}

createRelationship();