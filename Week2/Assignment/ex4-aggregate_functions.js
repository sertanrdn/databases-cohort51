import { connection } from "./connection.js";

async function aggregateQueries() {
    const paperAuthorNumber = `
        SELECT rp.paper_title, COUNT(ap.author_id) AS author_count
        FROM research_papers rp
        LEFT JOIN author_paper ap ON rp.paper_id = ap.paper_id
        GROUP BY rp.paper_title;
    `;

    const sumOfPapersByFemales = `
        SELECT COUNT(ap.paper_id) AS total_papers_by_females
        FROM authors a 
        LEFT JOIN author_paper ap ON a.author_id = ap.author_id
        WHERE a.gender = 'Female';
    `;

    const averageHIndex = `
        SELECT university, AVG(h_index) AS avg_h_index
        FROM authors
        GROUP BY university;
    `;

    const sumPapersPerUni = `
        SELECT a.university, COUNT(ap.paper_id) AS total_papers
        FROM authors a 
        LEFT JOIN author_paper ap ON a.author_id = ap.author_id
        GROUP BY a.university;
    `;

    const minMaxHIndexPerUni = `
        SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
        FROM authors
        GROUP BY university;
    `;

    try {
        await connection.query(`USE academics;`);

        const [papersAuthors] = await connection.query(paperAuthorNumber);
        console.log('All research papers and the number of authors that wrote that paper: ', papersAuthors);

        const [femalePapers] = await connection.query(sumOfPapersByFemales);
        console.log('Sum of the research papers published by all female authors: ', femalePapers);

        const [avgHIndex] = await connection.query(averageHIndex);
        console.log('Average of the h-index of all authors per university: ', avgHIndex);

        const [sumPapers] = await connection.query(sumPapersPerUni);
        console.log('Sum of the research papers of the authors per university: ', sumPapers);

        const [minMaxHIndex] = await connection.query(minMaxHIndexPerUni);
        console.log('Min. and max. h-index of all authors per university: ', minMaxHIndex);

    } catch (error) {
        console.error('Error running queries: ', error);
    } finally {
        await connection.end();
    }
}

aggregateQueries();