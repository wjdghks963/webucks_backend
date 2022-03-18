const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sendCategories = async (req,res) =>{

try{
  const categories =  await prisma.$queryRaw`
  SELECT name FROM categories;
  `
return res.json(categories);

}catch(err){
  console.log(err)
}

}

module.exports = { sendCategories} 