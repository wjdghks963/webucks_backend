const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sendProducts = async (req,res) =>{

try{
  const products =  await prisma.$queryRaw`
  SELECT name FROM products;
  `
return res.json(products);

}catch(err){
  console.log(err)
}

}


  
  module.exports = { sendProducts } // routing.js 에서 사용하기 위해 모듈로 내보낸다.