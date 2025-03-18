import { connection } from "./connection.js";

async function insertData() {
    const insertAuthorsData = `
        INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES
        ('Alice Johnson', 'Harvard University', '1980-05-12', 45, 'Female'),
        ('Bob Smith', 'Stanford University', '1975-11-20', 50, 'Male'),
        ('Clara Zhang', 'MIT', '1985-03-25', 38, 'Female'),
        ('David Lee', 'Oxford University', '1990-07-30', 40, 'Male'),
        ('Eva Davis', 'University of Cambridge', '1982-01-15', 47, 'Female'),
        ('Frank White', 'Harvard University', '1990-02-28', 32, 'Male'),
        ('Grace Black', 'MIT', '1988-11-11', 33, 'Female'),
        ('Henry Green', 'Oxford University', '1985-03-14', 28, 'Male'),
        ('Isabella Brown', 'Stanford University', '1992-08-22', 22, 'Female'),
        ('Jack Moore', 'University of Cambridge', '1991-10-04', 39, 'Male'),
        ('Karen Scott', 'Harvard University', '1987-05-01', 34, 'Female'),
        ('Liam Taylor', 'MIT', '1983-12-09', 41, 'Male'),
        ('Monica White', 'Oxford University', '1981-07-19', 37, 'Female'),
        ('Nathan King', 'Stanford University', '1984-09-13', 43, 'Male'),
        ('Olivia Harris', 'University of Cambridge', '1993-06-10', 30, 'Female');
    `;

    const insertPapersData = `
        INSERT INTO research_papers (paper_title, conference, publish_date) VALUES
        ('AI in Healthcare: A Review', 'IEEE Conference on AI', '2021-10-12'),
        ('Blockchain Technology in Financial Systems', 'International Blockchain Symposium', '2020-05-15'),
        ('Quantum Computing: The Next Frontier', 'Quantum Computing Conference', '2022-07-22'),
        ('Big Data and Privacy Concerns', 'Big Data Expo 2021', '2021-08-10'),
        ('AI Ethics and Bias', 'AI Ethics Conference', '2019-11-25'),
        ('Machine Learning for Finance', 'Finance and AI Conference', '2021-06-08'),
        ('Innovations in Quantum Cryptography', 'Quantum Conference 2021', '2021-02-18'),
        ('Ethics in AI Algorithms', 'Global AI Symposium', '2022-03-01'),
        ('Blockchain in Healthcare', 'International Blockchain Symposium', '2020-11-09'),
        ('AI-Powered Robotics in Surgery', 'Medical Robotics Conference', '2021-09-30'),
        ('Big Data for Climate Change', 'Environmental Data Summit', '2022-01-15'),
        ('AI and Big Data in Health Industry', 'IEEE HealthTech Conference', '2020-04-05'),
        ('Blockchain and Supply Chain Optimization', 'Blockchain in Supply Chain', '2021-12-12'),
        ('Neural Networks and Their Applications', 'Neural Networks Conference', '2020-09-03'),
        ('Data Privacy in Smart Cities', 'Smart Cities Tech Conference', '2022-06-27'),
        ('AI in Education: New Frontiers', 'AI for Education Conference', '2021-03-15'),
        ('Cybersecurity in Blockchain', 'CyberSec 2021', '2021-08-14'),
        ('AI and the Future of Work', 'Workplace Tech Conference', '2022-05-22'),
        ('The Impact of Big Data on Marketing', 'Digital Marketing Conference', '2020-07-17'),
        ('The Rise of Autonomous Vehicles', 'Autonomous Vehicles Summit', '2021-11-05'),
        ('AI in Finance: Risk Assessment', 'Finance Tech Symposium', '2020-10-20'),
        ('Blockchain in Financial Auditing', 'Blockchain Financial Systems', '2021-01-10'),
        ('Data Science in Modern Healthcare', 'Healthcare Analytics Expo', '2022-09-12'),
        ('AI for Social Good', 'AI Social Impact Forum', '2021-07-18'),
        ('The Future of AI in Customer Service', 'Customer Experience Summit', '2020-12-01'),
        ('Blockchain in Real Estate', 'Real Estate Tech Forum', '2021-04-23'),
        ('Smart Manufacturing with AI', 'Manufacturing Tech Expo', '2022-02-05'),
        ('AI-Powered Cybersecurity', 'Global Cybersecurity Conference', '2021-05-29'),
        ('Autonomous Robotics in Agriculture', 'Agricultural Robotics Conference', '2020-06-10'),
        ('Deep Learning in Natural Language Processing', 'NLP Conference 2021', '2021-03-28');
    `;

    const insertAuthorPaperData = `
        INSERT INTO author_papers (author_id, paper_id) VALUES
        (1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
        (1, 6), (2, 7), (3, 8), (4, 9), (5, 10),
        (6, 11), (7, 12), (8, 13), (9, 14), (10, 15),
        (6, 16), (7, 17), (8, 18), (9, 19), (10, 20),
        (11, 21), (12, 22), (13, 23), (14, 24), (15, 25),
        (11, 26), (12, 27), (13, 28), (14, 29), (15, 30),
        (1, 2), (3, 4), (5, 6), (7, 8), (9, 10);
    `;

    try {
        await connection.query(`USE academics;`);

        await connection.query(insertAuthorsData);
        await connection.query(insertPapersData);
        await connection.query(insertAuthorPaperData);
    } catch (error) {
        console.error('Error inserting data: ', error);
    } finally {
        await connection.end();
    }
}

insertData();