import { transferMoney } from "./transfer.js";
import { setup } from "./setup.js";

async function main() {
    try {
        await setup();

        await transferMoney(101, 102, 1000, 'Payment for rent');
    } catch (error) {
        console.error('Error while setup or transaction: ', error);
    } 
}

main();