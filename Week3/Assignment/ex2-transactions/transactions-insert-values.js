import mysql from 'mysql2/promise';

async function insertData() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'bank_db',
        multipleStatements: true 
    });

    const insertTablesData = `
        START TRANSACTION;

        INSERT INTO account (account_number, balance) VALUES
            (101, 5000.00),
            (102, 2500.00);
    
        INSERT INTO account_changes (account_number, amount, remark) VALUES
            (101, 500.00, 'Monthly rent'),
            (102, 1000.00, 'Bills');

        COMMIT;
    `;

    try {
        await connection.query(insertTablesData);
    } catch (error) {
        console.error('Error inserting table data: ', error);
    } finally {
        await connection.end();
    }
}

insertData();