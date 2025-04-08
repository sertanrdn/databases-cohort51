import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function transferMoney(fromAccount, toAccount, amount, remark) {
    try {
        await client.connect();
        const db = client.db('databaseWeek4');
        const accounts = db.collection('accounts');
        const session = client.startSession();
        session.startTransaction();

        const sender = await accounts.findOne({ account_number: fromAccount });
        const receiver = await accounts.findOne({ account_number: toAccount });

        if (!sender || !receiver) throw new Error('Account not found!');

        if (sender.balance < amount) throw new Error('Insufficient amount!');

        await accounts.updateOne(
            { account_number: fromAccount },
            { 
                $inc: { balance: -amount }, 
                $push: {
                    account_changes: {
                        change_number: sender.account_changes.length + 1,
                        amount: -amount,
                        changed_date: new Date(),
                        remark: remark,
                    },
                },
            },
            { session }
        );

        await accounts.updateOne(
            { account_number: toAccount },
            {
                $inc: { balance: amount },
                $push: {
                    account_changes: {
                        change_number: receiver.account_changes.length + 1,
                        amount: amount,
                        changed_date: new Date(),
                        remark: remark,
                    },
                },
            },
            { session }
        );

        await session.commitTransaction();

        console.log(`Transaction successful. Transferred ${amount} from ${fromAccount} to ${toAccount}`);
    } catch (error) {
        console.error('Error while transaction: ', error);
    } 
}