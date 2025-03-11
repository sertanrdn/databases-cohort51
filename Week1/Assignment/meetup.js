import mysql from 'mysql2/promise';

async function setupDatabase() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        multipleStatements: true
    });

    try {
        const createDb = `
            DROP DATABASE IF EXISTS meetup;
            CREATE DATABASE meetup;
            USE meetup;
        `;
    
        const createInviteeTable = `
            CREATE TABLE IF NOT EXISTS Invitee (
                invitee_no INT AUTO_INCREMENT PRIMARY KEY,
                invitee_name VARCHAR(255) NOT NULL,
                invited_by VARCHAR(255)
            );
        `;

        const createRoomTable = `
            CREATE TABLE IF NOT EXISTS Room (
                room_no INT PRIMARY KEY,
                room_name VARCHAR(255),
                floor_number INT
            );
        `;

        const createMeetingTable = `
            CREATE TABLE IF NOT EXISTS Meeting (
                meeting_no INT AUTO_INCREMENT PRIMARY KEY,
                meeting_title VARCHAR(255) NOT NULL,
                starting_time DATETIME NOT NULL,
                ending_time DATETIME NOT NULL,
                room_no INT,
                FOREIGN KEY (room_no) REFERENCES Room(room_no)    
            );
        `;

        const inviteeData = `
            INSERT INTO Invitee (invitee_name, invited_by) VALUES 
                ('Alice', 'Mary'), 
                ('David', 'Frank'), 
                ('John', 'Alicia'), 
                ('Martin', 'Michele'), 
                ('Catherine', 'Bob');
        `;

        const roomData = `
            INSERT INTO Room (room_no, room_name, floor_number) VALUES
                (101, 'Fire Room', 1),
                (507, 'Lightning Room', 5),
                (402, 'Ocean Room', 4),
                (703, 'Sky Room', 7),
                (209, 'Storm Room', 2);
        `;

        const meetingData = `
            INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
                ('Project Planning', '2025-03-12 10:00:00', '2025-03-12 11:00:00', 402),
                ('Budget Talk', '2025-03-12 09:00:00', '2025-03-12 10:15:00', 507),
                ('Catchup', '2025-03-12 12:00:00', '2025-03-12 12:30:00', 209),
                ('New Employees', '2025-03-12 14:00:00', '2025-03-12 15:00:00', 101),
                ('Marketing Strategy', '2025-03-12 13:00:00', '2025-03-12 14:30:00', 703);
        `;

        // Create Database
        await connection.query(createDb);

        // Create Tables
        await connection.query(createInviteeTable);
        await connection.query(createRoomTable);
        await connection.query(createMeetingTable);

        // Insert Data
        await connection.query(inviteeData);
        await connection.query(roomData);
        await connection.query(meetingData);
    } catch (error) {
        console.error('Error: ', error.message);
    } finally {
        await connection.end();
    }
}

setupDatabase();