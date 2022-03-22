const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const allProducts = async () => {
    return  await prisma.$queryRaw`
    SELECT korean_name AS ko_name, english_name AS en_name FROM products;
    `;
}

module.exports = {allProducts}