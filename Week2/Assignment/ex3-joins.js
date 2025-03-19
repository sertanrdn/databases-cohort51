import { connection } from "./connection.js";

async function joinTables() {
    const authorsAndMentors = `
        SELECT a.author_name AS Author, m.author_name AS Mentor
        FROM authors a
        LEFT JOIN authors m ON a.mentor = m.author_id;
    `;

    const authorsAndPapers = `
        SELECT a.*, rp.paper_title
        FROM authors a
        LEFT JOIN author_paper ap ON a.author_id = ap.author_id
        LEFT JOIN research_papers rp ON ap.paper_id = rp.paper_id;
    `;

    try {
        await connection.query(`USE academics;`);

        const [mentors] = await connection.query(authorsAndMentors);
        console.log('Authors and their mentors: ', mentors);

        const [papers] = await connection.query(authorsAndPapers);
        console.log('Authors and their published paper title: ', papers);
    } catch (error) {
        console.error('Error joining tables: ', error);
    } finally {
        await connection.end();
    }
}

joinTables();