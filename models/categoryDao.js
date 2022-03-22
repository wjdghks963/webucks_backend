const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const allCategories = async ()=>{
return await prisma.$queryRaw`
SELECT name FROM categories;
`
}

module.exports = {allCategories};