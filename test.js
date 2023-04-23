const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();


const temp = [10.1, 10.2, 10.4, 10.3, 10.9, 11.5, 12, 13, 13.2, 13.4, 15, 16, 16, 15.8, 15.4, 15, 14, 13, 12, 11, 10.5, 10.2];


async function main() {
    let transactions = [];

    let start = new Date('2023-04-23T04:41:30.684Z');

    for (const value of temp) {
        const tr = prisma.telemetry.create({
            data: {
                attributeId: "clgtqecld00fvfi3wgwpl5eok",
                value: String(value),
                createdAt: start
            }
        });
        transactions.push(tr);
        start = new Date(start.getTime() + 1000 * 60 * 30);
    }

    await prisma.$transaction(transactions);
}


main();