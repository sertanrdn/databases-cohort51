import mysql from 'mysql2/promise';

async function transferMoney() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'bank_db',
        multipleStatements: true 
    });

    const transferAmount = `
        START TRANSACTION;

        UPDATE account 
        SET balance = balance - 1000
        WHERE account_number = 101;

        UPDATE account
        SET balance = balance + 1000
        WHERE account_number = 102;

        INSERT INTO account_changes (account_number, amount, remark) VALUES
            (101, -1000, 'Transfer money to account 102'),
            (102, 1000, 'Transfer from account 101');

        COMMIT;
    `;

    try {
        await connection.query(transferAmount);
        console.log('Transaction completed successfully!');
    } catch (error) {
        console.error('Error during transaction: ', error);
        await connection.query('ROLLBACK;');
    } finally {
        await connection.end();
    }
}

transferMoney();